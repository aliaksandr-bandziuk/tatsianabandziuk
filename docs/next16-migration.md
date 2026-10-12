# Миграция Next.js 14 → 16: пошаговая инструкция для агента

Основано на реальной миграции сайта tatsianabandziuk.com (сентябрь 2026). Исходный стек был тот же, что у bandziuk.com: Next.js 14 App Router, React 18, Sanity 3 + next-sanity 9 со Studio внутри сайта (`/admin`), next-intl 3 в middleware, SCSS-модули, next/font, Vercel. Все проблемы ниже реально встретились. Перед каждым шагом сверяйся с кодом своего проекта: названия файлов могут отличаться.

## 0. Что даёт миграция и чего не даёт

- React 19, Next 16 (Turbopack по умолчанию для dev и build), Sanity 6, актуальные версии с исправлениями безопасности.
- **Сама миграция НЕ убирает полифиллы** из аудита PageSpeed «Legacy JavaScript» (`Array.prototype.at`, `flat`, `flatMap`, `Object.fromEntries`, `Object.hasOwn`, `trimStart`, `trimEnd`). Next 16 по-прежнему вшивает `next/dist/build/polyfills/polyfill-module.js`. Убрать их можно отдельно, см. шаг 9.
- Заметного прироста баллов PageSpeed сама миграция не даёт. Основной выигрыш дали отдельные оптимизации (раздел «Оптимизации PageSpeed» в конце).

## 1. Подготовка

1. Рабочее дерево чистое, всё закоммичено. Создай ветку: `git switch -c next16`.
2. Запиши текущее состояние для сравнения: Lighthouse мобильный на продакшене (2–3 прогона), список URL из sitemap.
3. Узнай, где используются next-intl, next-sanity и sanity:
   ```bash
   grep -rn "next-intl\|next-sanity\|from \"sanity\|@sanity/\|@portabletext" src --include=*.ts --include=*.tsx
   ```
4. Найди неиспользуемые зависимости: для каждого пакета из `dependencies` посчитай импорты в `src` и `scripts`. У нас не использовались `@portabletext/react`, `react-intersection-observer`, `formik`, `yup`. Их удалили, и это сняло часть конфликтов peer-зависимостей.
5. Проверь версию Node: **Sanity 6 требует Node ≥ 22.12.** Локально нужна 22 или 24.

## 2. Версии пакетов

`npm install next@16 ...` поверх старого дерева падает с ERESOLVE: Sanity 3 и его плагины требуют React 18. Надёжный путь такой: прописать версии прямо в `package.json`, удалить `node_modules` и `package-lock.json` и поставить всё с нуля.

Версии, с которыми всё собралось и работает (сентябрь 2026):

```jsonc
"engines": { "node": "24.x" },          // Vercel берёт отсюда версию Node; Sanity 6 требует >= 22.12
"scripts": {
  "lint": "eslint .",                    // `next lint` удалён в Next 16
  "typecheck": "tsc --noEmit"
},
"dependencies": {
  "@sanity/client": "^8.6.2",
  "@sanity/document-internationalization": "^6.2.36",
  "@sanity/image-url": "^2.1.1",
  "@sanity/vision": "^6.15.0",
  "groq": "^6.15.0",
  "next": "16.3.5",
  "next-intl": "^4.14.5",
  "next-sanity": "^13.3.4",
  "react": "^19.2.3",
  "react-dom": "^19.2.3",
  "sanity": "^6.15.0",
  "styled-components": "^6.5.3"          // peer-зависимость Sanity Studio, не удалять
  // framer-motion 11.18, lenis, sass, nodemailer, js-cookie, dotenv — без изменений
},
"devDependencies": {
  "@types/node": "^22",
  "@types/react": "^19.2.0",
  "@types/react-dom": "^19.2.0",
  "eslint": "^9",
  "eslint-config-next": "16.3.5",
  "typescript": "^5.8.3"                 // НЕ ставить TypeScript 7: это новый компилятор, отдельный риск
}
```

Версии `@sanity/client` (8), `groq` (6) и `@sanity/image-url` (2) берутся из зависимостей `sanity@6`, чтобы в проекте был один клиент Sanity, а не два. Проверка: `npm view sanity@6 dependencies`, `npm view next-sanity@13 peerDependencies`.

```powershell
Remove-Item -Recurse -Force node_modules; Remove-Item package-lock.json
npm install
npm ls next react react-dom sanity next-sanity next-intl @sanity/client
```

Предупреждения `allow-scripts` о postinstall у esbuild, @swc/core и unrs-resolver не мешают, сборка проходит.

## 3. Кодмоды Next

Запускай неинтерактивно, с фиксированной версией:

```bash
npx --yes @next/codemod@16.3.5 next-async-request-api src --force
npx --yes @next/codemod@16.3.5 middleware-to-proxy src --force
```

- **Первый кодмод** делает `params` (и `searchParams`) промисами во всех страницах, layout и `generateMetadata`: `props: { params: Promise<{ lang: string }> }` и `const params = await props.params`. У нас он поправил 16 файлов без ошибок. Проверь файлы, которые кодмод пропустил (`[...rest]`, `not-found`, `error`), и места, куда `params` передаются в хелперы.
- **Второй кодмод** переименовывает `src/middleware.ts` в `src/proxy.ts`, а функцию `middleware` в `proxy`. `config.matcher` остаётся тем же.

## 4. Ошибки TypeScript после кодмодов (у нас было три)

1. **`revalidateTag` требует второй аргумент** (профиль кэша). В вебхуке публикации Sanity:
   ```ts
   // "max" отдал бы старую версию ещё раз (stale-while-revalidate);
   // { expire: 0 } сбрасывает кэш сразу — как было в Next 14.
   revalidateTag("sanity", { expire: 0 });
   ```
2. **`NextRequest.ip` удалён** (ещё в Next 15). Если он используется в защите форм или rate-limit:
   ```ts
   req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown";
   ```
3. **`getRequestConfig` из next-intl 4 изменил сигнатуру** (`{ requestLocale }`, в ответе обязателен `locale`). У нас этот default export в `i18n.config.ts` был мёртвым кодом: плагин next-intl в `next.config` не подключён, next-intl используется только в middleware. Мы его удалили. Если плагин у тебя подключён (`createNextIntlPlugin`), переделай по документации next-intl 4.

`createMiddleware` из next-intl 4 принимает тот же объект (`locales`, `defaultLocale`, `localePrefix: "as-needed"`, `localeDetection`, `alternateLinks`, `pathnames`). Код middleware/proxy у нас не менялся. Обязательно проверь локализованные сегменты и редиректы (шаг 11).

## 5. `next.config.mjs`

- **`outputFileTracingIncludes`** перенеси из `experimental` на верхний уровень.
- **Turbopack** теперь сборщик по умолчанию. Кастомный `images.loaderFile`, `sass` и `rewrites` работают без изменений.
- Если в конфиге есть webpack-специфичные настройки (`webpack: (config) => ...`), их нужно переписать под `turbopack` (например, `turbopack.resolveAlias`) или собирать с флагом `--webpack`.

## 6. Sanity и next-sanity

- **Не импортируй ничего из корня `next-sanity` в коде сайта.** Корневой модуль тянет `next-sanity/visual-editing/client-component` и `@sanity/next-loader`, и Next кладёт весь `@sanity/client` (со stega, EventSource и т.д.) в клиентский бандл каждой страницы. У нас это было около 50 КБ неиспользуемого JS. Бери напрямую:
  ```ts
  import { createClient, type QueryParams } from "@sanity/client";
  import groq from "groq";
  ```
  `@sanity/client` 8 нативно поддерживает `fetch(query, params, { next: { revalidate, tags }, cache })`, так что кэширование и теги для `revalidateTag` работают так же.
- **`@sanity/image-url` 2:** экспорт по умолчанию устарел, при сборке сыплются предупреждения. Используй `import { createImageUrlBuilder } from "@sanity/image-url"` и `createImageUrlBuilder({ projectId, dataset })`.
- **Studio (`app/admin/[[...index]]/page.tsx`)** с `NextStudio` из `next-sanity/studio` заработала без изменений. `sanity.config.ts`, `structureTool`, `visionTool`, `documentInternationalization`, `defineType`/`defineField` в схемах тоже работают без изменений (проверено `tsc` и в браузере).
- **CORS:** Studio, открытая на новом адресе (`localhost:3005`, превью Vercel), показывает «This Studio isn't connected to your project». Это не ошибка миграции: нужно добавить адрес в CORS origins проекта на manage.sanity.io. На продакшен-домене всё работает.

## 7. React 19

- **`inert` теперь логический атрибут.** Старый обход для React 18 `{ inert: "" }` в React 19 превращается в `false`, и атрибут не ставится. Нужно `inert` / `inert={true}`. Найди все места: `grep -rn "inert" src`.
- **Типы:** в `@types/react` 19 изменились некоторые типы (например, `useRef` требует начальное значение, `JSX` берётся из `React.JSX`). У нас `tsc` прошёл без правок, но проверь свой проект.
- **Next дописывает `tsconfig.json`** (`jsx: "react-jsx"`, `include` для `.next/types`). Это нормально, закоммить.

## 8. ESLint 9 (`next lint` удалён)

Удали `.eslintrc.json` и создай `eslint.config.mjs`:

```js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

export default defineConfig([
  ...nextVitals,
  {
    rules: {
      // Новое правило eslint-plugin-react-hooks 6 (React Compiler). Срабатывает на
      // рабочий код вида useEffect(() => setOpen(false), [pathname]).
      // Оставлено предупреждением, пока эти места не переписаны.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  globalIgnores([".next/**", "node_modules/**", "next-env.d.ts" /* + свои папки: backups, research, … */]),
]);
```

- **`react-hooks/refs`** («Cannot access refs during render») срабатывает, если хук возвращает объект с рефами, а в JSX пишут `d.rootRef`. Решение: деструктурировать (`const { rootRef, buttonRef, ... } = useHook()`), тогда линтер распознаёт рефы по имени.
- **Сборка Next 16 больше не запускает линтер**, поэтому ошибки ESLint не ломают деплой. Запускай `npm run lint` сам.
- **Форматтер `-f unix`** удалён из ядра ESLint. Для компактного вывода используй `-f json`.

## 9. Полифиллы («Legacy JavaScript» в PageSpeed)

Next 16 официально поддерживает Chrome/Edge 111+, Firefox 111+ и Safari 16.4+. Во всех них эти функции есть, поэтому модуль полифиллов можно подменить пустым.

`src/lib/empty-polyfills.js`:
```js
// Replaces next/dist/build/polyfills/polyfill-module (see next.config.mjs).
export {};
```

`next.config.mjs`:
```js
turbopack: {
  resolveAlias: {
    // next/dist/client/app-globals.js подключает модуль ИМЕННО этим относительным путём —
    // алиас только на "next/dist/build/polyfills/polyfill-module" НЕ срабатывает.
    "../build/polyfills/polyfill-module": "./src/lib/empty-polyfills.js",
    "next/dist/build/polyfills/polyfill-module": "./src/lib/empty-polyfills.js",
  },
},
```

Проверка после сборки. Строка не должна находиться ни в одном чанке:
```powershell
$all = (Get-ChildItem .next/static/chunks -Recurse -Filter *.js | % { Get-Content $_.FullName -Raw }) -join "`n"
$all.Contains('"trimStart"in String.prototype')   # должно быть False
```

Подводные камни:
- **Проверяй сам `polyfill-module.js`, а не `.d.ts`.** Мы сначала посмотрели `polyfill-module.d.ts` (72 байта), решили, что в Next 16 полифиллов нет, и ошиблись.
- **Чанк на ~110 КБ с core-js** подключается как `<script noModule>` и современными браузерами не выполняется. Это нормально.
- **После каждого обновления Next** проверяй, что путь `../build/polyfills/polyfill-module` в `node_modules/next/dist/client/app-globals.js` не изменился.

## 10. Локальная сборка и проверка

```bash
npx tsc --noEmit
npm run lint
npx next build
npx next start -p 3005
```

- **`next build` перезаписывает `.next`.** Если из той же папки работает `next dev`, останови его, иначе он сломается.
- **Под Windows** в локальной сборке у нас был пустой `next-font-manifest.json`: предзагрузки шрифтов в HTML не появлялись. На Vercel (Linux) всё нормально. Состав `<link rel="preload" as="font">` проверяй на продакшене.
- **Предупреждения при сборке:** в логе не должно быть deprecated-сообщений (см. `@sanity/image-url` в шаге 6).

## 11. Чек-лист функциональной проверки (на `next start` и потом на продакшене)

HTTP:
- главная всех языков — 200; локализованные сегменты (например, `/pl/uslugi`) — 200;
- английский сегмент под префиксом языка (`/pl/services`) — редирект 308 на локализованный;
- несуществующий URL — 404 внутри layout сайта;
- `/robots.txt`, `/sitemap.xml` (число URL, `lastmod`, hreflang), canonical каждой страницы из sitemap совпадает с её URL;
- вебхук Sanity без секрета — 401, с секретом — 200 и `revalidated: true`;
- `/admin` — 200.

Браузер (Playwright; браузер можно взять системный: `chromium.launch({ channel: "msedge" })`):
- нет `pageerror` на главной, статьях, калькуляторах, «Обо мне»;
- меню и подменю, мобильное меню (высота панели на весь экран, `inert` у свёрнутых подменю);
- попап с формой открывается и закрывается по Esc;
- картинки с CDN Sanity;
- Studio открывается и предлагает вход (на продакшене).

Lighthouse (мобильный, 2–3 прогона, сравни с шагом 1): производительность, доступность, Best Practices, SEO. Локальные цифры на `next start` сравнивать с продакшеном нельзя: там нет CDN, и мешает нагрузка на машину.

## 12. Выкатка

- **Превью Vercel** закрыто Deployment Protection: без входа в Vercel или секрета «Protection Bypass for Automation» агент его не проверит. Мы проверили локально и выкатили на продакшен.
- **Слияние:** `git switch main && git merge --ff-only next16 && git push`.
- **Откат:** в Vercel → Deployments → Instant Rollback к предыдущему деплою. Или `git revert <коммит миграции>`.
- **Node:** Vercel берёт версию из `engines.node` (у нас `24.x`), в настройках проекта ничего менять не пришлось.

## 13. После миграции обнови документацию проекта

В CLAUDE.md: стек (версии), команда линтера, «`params` — Promise», `revalidateTag(tag, { expire: 0 })`, `proxy.ts` вместо `middleware.ts`, алиас полифиллов и как его проверять, разрешены ли локальные сборки.

---

## Оптимизации PageSpeed (независимы от миграции, но сделаны вместе с ней)

Мобильный PageSpeed на продакшене: производительность 58 → 100, доступность 93 → 100, Best Practices и SEO 100, Agentic Browsing 3/3; LCP 5.8 с → 1.7 с, TBT 790 → 30 мс, Speed Index 2.2 с, CLS 0.002. По порядку эффекта:

1. **Анимация появления прятала первый экран.** Компонент Reveal после гидрации добавлял класс, из-за которого все `[data-reveal]`, включая hero с H1, получали `opacity: 0` и проявлялись заново. LCP засчитывался только после загрузки всего JS. Решение: элементы, которые уже на экране в момент гидрации, сразу помечаются видимыми (`getBoundingClientRect().top < innerHeight`), анимация только для того, что ниже.
2. **Клиент Sanity в бандле** через корень `next-sanity` (шаг 6).
3. **framer-motion и форма попапа на каждой странице.** Попап вынесен в `next/dynamic(() => import("./ConsultationDialog"), { ssr: false })`, модуль грузится при первом открытии и заранее по `onMouseEnter`/`onFocus`/`onTouchStart` кнопки.
4. **Предзагрузка шрифтов: итог — отключить совсем.** `next/font` по умолчанию предзагружает все `subsets` каждого семейства: у нас было 21 файл до первой отрисовки. Сначала оставили предзагрузку только латиницы, и балл стал прыгать между ~88 и ~99 на одном и том же коде. Причина: если предзагруженные шрифты приходили раньше первой отрисовки, симуляция Lighthouse (Lantern) ставила их на критический путь H1, и LCP получался 3.5–3.8 с вместо 1.1 с. Решение, которое дало стабильные 100: `preload: false` у ВСЕХ шрифтов вместе с `display: "swap"`. H1 рисуется запасным шрифтом, next/font подгоняет его метрики, поэтому CLS ≈ 0, и через мгновение меняется на веб-шрифт. Правила `@font-face` для latin-ext и кириллицы генерируются через `unicode-range` при любом значении `subsets`.
5. **Портрет в hero с `priority`** (высокоприоритетная предзагрузка), хотя на мобильном он ниже H1. Заменено на `loading="eager"`.
6. **Аналитика (GA, Clarity)** грузится при первом действии посетителя (scroll, pointerdown, touchstart, keydown, mousemove) или через 4 с после `load`. Около 0.5 с скриптов уходит из окна замера, TBT упал до 0.
7. **Второстепенные виджеты** (Lenis, строка статуса, загрузчик между страницами) монтируются через `next/dynamic` после `load` + `requestIdleCallback`.
8. **Баннер cookie рендерится на сервере**, чтобы попасть в первую отрисовку. Баннер, который выезжал после загрузки JS, был последним изменением первого экрана и портил Speed Index. Если выбор уже сделан, скрипт в `<head>` добавляет класс на `<html>` до отрисовки (`<html suppressHydrationWarning>`). Кнопки — отдельный маленький клиентский компонент. Константы, которые импортирует серверный компонент, нельзя держать в модуле с `"use client"`: вместо значения придёт клиентская ссылка.
9. **Цифры первого экрана** показываются сразу, без анимации счёта: она тоже поздно меняет экран.
10. **Доступность:** `aria-label` на обычном `span` запрещён (у нас был в CountUp), замена — визуально скрытый текст. Контраст второстепенного текста поднят до 4.5:1.
11. **`experimental.inlineCss`** (Next 16) встраивает CSS в `<style>` и убирает блокирующие запросы. Минус: CSS попадает в HTML дважды (в `<style>` и в данные RSC), HTML главной вырос с ~28 до ~48 КБ в сжатом виде. Эффект неоднозначный, меряй на своём сайте.

12. **`/llms.txt`** (Agentic Browsing в Lighthouse): роут `app/llms.txt/route.ts` собирает Markdown по llmstxt.org из того же контента, что и страницы. Путь с точкой не попадает в matcher proxy/middleware.

Оценивай по медиане 3–5 прогонов: мобильный PageSpeed сильно разбросан от прогона к прогону.

Что правками сайта не исправить: неиспользуемый код в `gtag.js` (~70 КБ) и короткий кэш `clarity.js`, они на стороне Google и Microsoft.
