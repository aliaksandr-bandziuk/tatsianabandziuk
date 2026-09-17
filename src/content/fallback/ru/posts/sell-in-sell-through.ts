import type { Post } from "../../../types";
import { postPlan } from "../../registry";

const soon = "Раздел готовится.";

// Stand-in: metadata, FAQ and the H2 skeleton are final, the body is being written (task 02).
export const post: Post = {
  ...postPlan("sell-in-sell-through", "ru"),
  title: "Sell-in, sell-through и sell-out: почему коммерческий отдел и финансы видят разные цифры",
  h1: { before: "Sell-in, sell-through и sell-out: почему коммерческий отдел и", accent: "финансы видят разные цифры" },
  excerpt: "Чем различаются sell-in, sell-through и sell-out и почему коммерческий отдел и финансы получают разный sell-through.",
  lead: "Sell-in — это продажи бренда в розницу или партнёрам, sell-out — продажи конечным покупателям, а sell-through — доля доступного товара, которая продана покупателям. Цифры коммерческого отдела и финансов расходятся, когда они по-разному считают базу, возвраты и период.",
  date: "2026-04-28",
  readingMinutes: 6,
  body: [
    { type: "h2", id: "opredeleniya", text: "Sell-in, sell-through и sell-out: определения" },
    { type: "p", text: soon },
    { type: "h2", id: "tri-rashozhdeniya", text: "Три расхождения в определении sell-through" },
    { type: "p", text: soon },
    { type: "h2", id: "soglasovat-s-finansami", text: "Как согласовать одно определение sell-through с финансами" },
    { type: "p", text: soon },
  ],
  faqTitle: "Частые вопросы о sell-in, sell-through и sell-out",
  faq: [
    {
      question: "Чем sell-in отличается от sell-out?",
      answer: "Sell-in — это объём, который производитель или бренд продал в торговую сеть, партнёрам или отгрузил в свои магазины. Sell-out — это продажи из магазинов конечным покупателям. Разница между ними показывает, сколько товара осело в каналах продаж.",
    },
    {
      question: "Что такое sell-out простыми словами?",
      answer: "Sell-out — это то, что реально купили покупатели на кассе или в интернет-магазине за период. Показатель измеряется в штуках или деньгах и отражает настоящий спрос. Именно по sell-out решают, дозаказывать товар или уценивать.",
    },
    {
      question: "Почему у финансов другой sell-through?",
      answer: "Финансы часто считают продажи в деньгах и по дате проводки, учитывают возвраты в другом периоде и берут в базу только поставки. Коммерческий отдел обычно считает в штуках, за вычетом возвратов и от всего доступного товара, включая остаток на начало. Чтобы цифры совпали, нужно письменно зафиксировать одну формулу, единицу измерения и правила для возвратов.",
    },
  ],
  placeholder: true,
  seo: {
    title: "Sell-in, sell-through и sell-out: в чём разница",
    description: "Чем различаются sell-in, sell-through и sell-out и почему коммерческий отдел и финансы показывают разные значения одного показателя.",
  },
};
