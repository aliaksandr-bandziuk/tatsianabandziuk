import type { Post } from "../../../types";
import { postPlan } from "../../registry";

const soon = "Раздел готовится.";

// Stand-in: metadata, FAQ and the H2 skeleton are final, the body is being written (task 02).
export const post: Post = {
  ...postPlan("sell-through-rate", "ru"),
  title: "Sell-through в ритейле: формула, норма и меры DAX в Power BI",
  h1: { before: "Sell-through в ритейле: формула, норма и", accent: "меры DAX в Power BI" },
  excerpt: "Что такое sell-through, как его посчитать в Excel и Power BI и какой процент продаж считается хорошим в fashion-ритейле.",
  lead: "Sell-through — это доля товара, проданного покупателям, от количества, которое было доступно для продажи за период: продано ÷ (остаток на начало + поставки) × 100 %. Показатель помогает байерам и аналитикам понять, какие модели продаются по плану, а какие пора уценять или перемещать.",
  date: "2026-07-24",
  readingMinutes: 8,
  body: [
    { type: "h2", id: "chto-takoe-sell-through", text: "Что такое sell-through в ритейле" },
    { type: "p", text: soon },
    { type: "h2", id: "formula-sell-through", text: "Формула sell-through и два способа расчёта" },
    { type: "p", text: soon },
    {
      type: "calculator",
      kind: "sellThrough",
      title: "Калькулятор sell-through",
      labels: {
        opening: "Остаток на начало периода, шт.",
        received: "Поставки за период, шт.",
        sold: "Продано за период, шт.",
        returned: "Возвраты за период, шт.",
        rate: "Sell-through от всего доступного товара",
        rateReceived: "Sell-through от поставок",
      },
      note: "Продажи считаются за вычетом возвратов. Расчёт выполняется в браузере, данные никуда не отправляются.",
    },
    { type: "h2", id: "norma-sell-through", text: "Какой sell-through считается хорошим в fashion-ритейле" },
    { type: "p", text: soon },
    { type: "h2", id: "sell-through-v-excel", text: "Как посчитать sell-through в Excel" },
    { type: "p", text: soon },
    { type: "h2", id: "mery-dax-sell-through", text: "Меры DAX для sell-through в Power BI" },
    { type: "p", text: soon },
    { type: "h2", id: "nedelnaya-krivaya", text: "Недельная кривая sell-through в отчёте" },
    { type: "p", text: soon },
  ],
  faqTitle: "Частые вопросы о sell-through",
  faq: [
    {
      question: "Что такое sell-through простыми словами?",
      answer: "Sell-through показывает, какую часть товара, доступного для продажи, купили покупатели за период. Если в магазине было 100 футболок и продано 60, sell-through равен 60 %. Чем выше показатель к середине сезона, тем меньше товара придётся уценять в конце.",
    },
    {
      question: "Как рассчитать sell-through?",
      answer: "Базовая формула: продажи в штуках за период ÷ (остаток на начало периода + поставки за период) × 100 %. Продажи лучше брать за вычетом возвратов, иначе показатель завышен. Некоторые команды делят только на поставки, поэтому в отчёте важно указать, какая база используется.",
    },
    {
      question: "Чем sell-in отличается от sell-through?",
      answer: "Sell-in — это объём, который бренд продал или отгрузил в розницу, оптовым партнёрам или в собственные магазины. Sell-through — это доля этого товара, которую затем купили конечные покупатели. Высокий sell-in при низком sell-through означает, что товар осел на полках и складах партнёров.",
    },
    {
      question: "Как посчитать sell-through в Excel?",
      answer: "Подготовьте таблицу с колонками: артикул, остаток на начало, поставки, продажи и возвраты. В колонке результата используйте формулу вида =ЕСЛИОШИБКА((D2-E2)/(B2+C2);0) и примените процентный формат. Для итога по категории суммируйте штуки и делите суммы, а не усредняйте проценты по строкам.",
    },
  ],
  placeholder: true,
  seo: {
    title: "Sell-through: что это и как посчитать в Excel и Power BI",
    description: "Что такое sell-through, как его рассчитать в Excel и Power BI, какой уровень считается хорошим в fashion-ритейле и где чаще всего ошибаются.",
  },
};
