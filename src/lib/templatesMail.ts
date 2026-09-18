import path from "node:path";
import type Mail from "nodemailer/lib/mailer";

/**
 * The email with the two free templates (open-to-buy model and KPI dashboard
 * checklist), sent to whoever asks for them on /free-templates or joins the
 * course waitlist. The files are built by scripts/templates/build.py into
 * templates/<lang>/ and bundled with this route (outputFileTracingIncludes in
 * next.config.mjs).
 */

type Lang = "en" | "pl" | "ru";

const FILES: Record<Lang, [string, string]> = {
  en: ["open-to-buy-template.xlsx", "retail-kpi-dashboard-checklist.xlsx"],
  pl: ["szablon-open-to-buy.xlsx", "checklista-dashboardu-kpi.xlsx"],
  ru: ["shablon-byudzheta-zakupok-open-to-buy.xlsx", "chek-list-dashborda-kpi.xlsx"],
};

const TEXT: Record<Lang, { subject: string; body: (kind: "templates" | "waitlist") => string }> = {
  en: {
    subject: "Your free open-to-buy template and KPI dashboard checklist",
    body: (kind) =>
      [
        "Hello,",
        "",
        kind === "waitlist"
          ? "Thank you for joining the course waitlist. You will get one email when the first course opens. In the meantime, here are the two free templates."
          : "Thank you for your request. Both files are attached:",
        "",
        "1. Open-to-buy Excel template: monthly open-to-buy by category and market, at retail, at cost and in units, with a size and colour split, three built-in checks and a definitions tab. Start with the Guide sheet.",
        "2. Retail KPI dashboard checklist: twelve checks to run before a Power BI dashboard goes to the commercial team.",
        "",
        "Yellow cells are inputs; the example figures are there to show the format, so replace them with your own.",
        "",
        "If you have a question about the templates or a planning task, just reply to this email.",
        "",
        "Tatsiana Bandziuk",
        "Retail and fashion analytics · https://www.tatsianabandziuk.com",
      ].join("\n"),
  },
  pl: {
    subject: "Darmowy szablon open-to-buy i checklista dashboardu KPI",
    body: (kind) =>
      [
        "Dzień dobry,",
        "",
        kind === "waitlist"
          ? "Dziękuję za zapis na listę oczekujących. Gdy ruszy pierwszy kurs, dostaniesz jedną wiadomość. Tymczasem w załącznikach są dwa darmowe szablony."
          : "Dziękuję za zgłoszenie. W załącznikach są oba pliki:",
        "",
        "1. Szablon Excel open-to-buy: budżet zakupów według miesięcy, kategorii i rynków, w cenach detalicznych, w koszcie i w sztukach, z podziałem na rozmiary i kolory, trzema kontrolami i arkuszem definicji. Zacznij od arkusza Instrukcja.",
        "2. Checklista dashboardu KPI: dwanaście punktów do sprawdzenia, zanim dashboard Power BI trafi do zespołu handlowego.",
        "",
        "Żółte komórki to dane wejściowe; liczby w przykładzie pokazują format, zastąp je własnymi.",
        "",
        "Jeśli masz pytanie o szablony albo zadanie z planowania, po prostu odpowiedz na tę wiadomość.",
        "",
        "Tatsiana Bandziuk",
        "Analityka w handlu i modzie · https://www.tatsianabandziuk.com/pl",
      ].join("\n"),
  },
  ru: {
    subject: "Бесплатный шаблон бюджета закупок и чек-лист дашборда KPI",
    body: (kind) =>
      [
        "Здравствуйте!",
        "",
        kind === "waitlist"
          ? "Спасибо, что записались в лист ожидания. Когда откроется первый курс, придёт одно письмо. А пока — два бесплатных шаблона во вложении."
          : "Спасибо за запрос. Оба файла во вложении:",
        "",
        "1. Шаблон Excel для бюджета закупок open-to-buy: по месяцам, категориям и рынкам, в розничных ценах, по себестоимости и в штуках, с размерными и цветовыми долями, тремя проверками и листом определений. Начните с листа «Инструкция».",
        "2. Чек-лист дашборда KPI: двенадцать проверок перед тем, как дашборд Power BI увидит коммерческая команда.",
        "",
        "Жёлтые ячейки — ввод данных; цифры в примере показывают формат, замените их своими.",
        "",
        "Если появится вопрос по шаблонам или задача по планированию, просто ответьте на это письмо.",
        "",
        "Татьяна Бандюк",
        "Аналитика в ритейле и моде · https://www.tatsianabandziuk.com/ru",
      ].join("\n"),
  },
};

/** Language of the form: explicit field first, then the page path (/pl/…, /ru/…), English otherwise. */
export function pageLanguage(language?: string, currentPage?: string): Lang {
  if (language === "pl" || language === "ru" || language === "en") return language;
  const m = currentPage?.match(/^\/(pl|ru)(?=\/|$)/);
  return (m?.[1] as Lang | undefined) ?? "en";
}

export function templatesMail(kind: "templates" | "waitlist", lang: Lang, to: string, from: string, replyTo: string): Mail.Options {
  const dir = path.join(process.cwd(), "templates", lang);
  return {
    from,
    to,
    replyTo,
    subject: TEXT[lang].subject,
    text: TEXT[lang].body(kind),
    attachments: FILES[lang].map((filename) => ({ filename, path: path.join(dir, filename) })),
  };
}
