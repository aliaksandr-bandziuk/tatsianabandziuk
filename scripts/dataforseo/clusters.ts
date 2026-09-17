/**
 * Relevance filter, clusters and target pages per language.
 * The first matching rule wins, so specific rules come before general ones.
 * `new:` targets are articles proposed in research/blog-plan.md.
 */
import type { Lang } from "./markets";

export type Rule = { cluster: string; target: string; match: RegExp };

const S = "/services/";
const B = "/blog/";

// Other companies' brands, jobs, marketplaces and unrelated meanings.
export const EXCLUDE: Record<Lang, RegExp> = {
  en: /help to buy|\bisa\b|ticket|near me|ebay|amazon|shopify|poshmark|terapeak|\bjobs?\b|salary|vacanc|solidworks|oracle|\bsap\b|infor\b|lectra|centric|\bjda\b|relex|pi apparel|mendix|credit card|french open|us open|australian|poppers|business plan|\bput\b|argos|mac app|open farm|\bsigns?\b|gelato|ice cream|milk|flowers|food|cake|welsh|gartner|epdm|tech data|agile|manufacturing|patient|electronic sell|driveline|off.?price|target|walmart|club|salesforce|zoho|datadog|linkedin|\bpdm\b|\bppt\b|\bpdf\b|txt retail|pharmacy|grocery|wiki|book|director of|manager$|assistant|download|github|youtube|hr dashboard|financial dashboard|customer dashboard|status dashboard|embedded|sharing|background|themes?$|gallery|inspiration|most beautiful|online$|desktop|openai|open ai|merchant services|(sas|citi|wells fargo|osl|premium) retail services|retail merchandising services|husband|\bcv\b/,
  pl: /poznań|lech|akeneo|pimcore|inriver|symfony|wordpress|\bdam\b|mswia|transferow|banku|hotelu|biznesplan|należności|github|youtube|hr\b|financial|customer|status|embedded|sharing|background|themes?|gallery|inspiration|most beautiful|online|desktop|open ai|openai|us open|mac app|san marco|sell your way|dystrybucji|śmietanki|\bpdf\b|wikipedia|logistyka|bmi|inflacji|homa|paliw|złota|polityka blog/,
  ru: /анализ[а-я]* на |цен[аы] на анализ|олимп|инвитро|инвиво|invivo|invitro|kdl|кдл|лаборат|хгч|пцр|витамин|гормон|техник|холодильник|пылесос|сулпак|sulpak|технодом|розетка|comfy|xiaomi|5element|м видео|вайлдберриз|валберис|wildberries|(^| )вб( |$)|\bwb\b|ozon|озон|каспи|kaspi|маркетплейс|mpstats|мпстатс|1с|1c|лоцман|союз plm|аппиус|российские|аптек|спортивн|оптов|проводки|себестоимост|логистик|предприяти|crm|книги|roland|airpods|cort action|selle|sell your way|ладожск|энгельса|блендер|микроволнов|бойлер|варочн|духов|вытяжк|мультиварк|стилус|кофемашин|водонагрев|газов|планшет|ноутбук|инженерн|анализ цена|пшениц|окэд|финансов|основн\S* (фонд|средств)|инвестиц|договор|недвижим|самрук|продавца.?консультант|сео |книга|курсов|учет|платежеспособ|рентабельност|оборотн|актив|b2b|закрытием|качества товаров|колоколов|происхождени|самозанят|аукцион|правила закупок|воронка продаж|управление продуктом/,
};

/**
 * Broad or ambiguous terms: kept in the CSV for context, never a page's main keyword (always P3).
 * Most mean something else (DAX index, OTB, clothing size charts) or are dominated by software vendors.
 */
export const BROAD: Record<Lang, RegExp> = {
  en: /^(data governance.*|what is data governance|master data( management)?|data dictionary( template)?|data quality|kpi definitions|product catalogue|otb|inventory turnover formula|category management|product data management (software|softwares|system|systems|tools|solutions|platform)|pim software|plm system|assortment planning (software|tools?)|merchandise planning (software|solutions|system)|retail assortment planning software|retail consultancy|retail consultant|excel course|power bi course|power bi for beginners|free excel templates|excel dashboard template|power bi dashboard template|attribute dictionary)$/,
  pl: /^(dax|pim|plm|analityk danych|analityk biznesowy|merchandiser|merchandising|doradztwo biznesowe|konsultant biznesowy|data governance|zarządzanie danymi|jakość danych|erp pim|web pim|widget power bi|plan zakupów|studium przypadku|kurs excel|szkolenie excel|kurs analizy danych|szablon excel|asortyment|asortyment co to|cena detaliczna)$/,
  ru: /^(dax|kpi|power bi|pim|plm|otb|байер|бизнес аналитик|аналитик данных|размерная сетка|уценка|управление данными|системный аналитик фриланс|сайт аналитики товаров|мерчендайзер|маржа|sell out|ассортимент|карточка товара|размерный ряд|курс excel|аналитика прайс)$/,
};

export const RULES: Record<Lang, Rule[]> = {
  en: [
    { cluster: "brand-name", target: "/", match: /tatsiana|tatiana|bandziuk|bandzuk/ },
    { cluster: "case-studies", target: "/case-studies", match: /case stud/ },
    { cluster: "power-bi-blog", target: "/blog/category/power-bi", match: /power bi blog/ },
    { cluster: "blog", target: "/blog", match: /\bblog\b/ },
    { cluster: "contact", target: "/contact", match: /warsaw|\bhire\b/ },
    { cluster: "merchandise-planner-career", target: "new:" + B + "merchandise-planner-career", match: /merchandise planner career|become a merchandise planner|become a fashion buyer/ },
    { cluster: "analyst-roles", target: "new:" + B + "brand-analyst-vs-business-analyst", match: /become a (retail|brand) analyst|retail analyst career/ },
    { cluster: "careers", target: "/blog/category/careers", match: /(fashion|retail|merchandis|buyer|planner).*career|career.*(fashion|retail)/ },
    { cluster: "about-experience", target: "/about", match: /product data lead|global brand analyst|fashion brand analyst/ },
    { cluster: "power-bi-rls", target: B + "row-level-security-retail-reporting", match: /row.?level security|\brls\b/ },
    { cluster: "sell-in-vs-sell-through", target: B + "sell-in-vs-sell-through", match: /sell.?in\b|sell.?out\b/ },
    { cluster: "sell-through-rate", target: B + "sell-through-rate", match: /sell.?through/ },
    { cluster: "dax-measures", target: B + "dax-measures-retail-kpi-dashboard", match: /\bdax\b|power bi retail kpis/ },
    { cluster: "retail-kpis", target: "new:" + B + "retail-kpis-fashion-brands", match: /retail kpis?\b(?! dashboard)|retail metrics|weeks of (cover|supply)|stock cover|gmroi|stock turn|inventory turn/ },
    { cluster: "otb-template", target: "/free-templates", match: /(open.?to.?buy|\botb\b).*(template|excel|spreadsheet|worksheet|calculator)|(template|excel).*open.?to.?buy/ },
    { cluster: "open-to-buy", target: B + "open-to-buy-model-excel", match: /open.?to.?buy|\botb\b/ },
    { cluster: "size-curve", target: B + "size-curve-from-sales-data", match: /size (curve|ratio|split)/ },
    { cluster: "price-ladder", target: B + "retail-price-architecture", match: /price (ladder|architecture|tier)|good better best/ },
    { cluster: "markdown", target: "new:" + B + "markdown-strategy-fashion-retail", match: /markdown|clearance pric/ },
    { cluster: "markup-vs-margin", target: "new:" + B + "markup-vs-margin-fashion-retail", match: /markup|\bmargin\b/ },
    { cluster: "abc-xyz-analysis", target: "new:" + B + "abc-xyz-analysis-assortment", match: /\babc\b|\bxyz\b/ },
    { cluster: "pricing-analysis-service", target: S + "retail-pricing-analysis", match: /pric\w* (analy|consult)|price (analy|consult)/ },
    { cluster: "retail-pricing-strategy", target: "new:" + B + "retail-pricing-strategy-fashion", match: /retail.*pric|pric.*retail|psychological pricing|promotional pricing|price elasticity|pricing strateg/ },
    { cluster: "courses", target: "/courses", match: /(retail|merchandis|power bi|assortment|plm|open.?to.?buy|fashion|dax).*(course|training|certification|bootcamp)|(course|training) .*(retail|merchandis|power bi)|power bi for beginners|excel (course|training)/ },
    { cluster: "free-templates", target: "/free-templates", match: /^(?!.*data dictionary).*(template|checklist)/ },
    { cluster: "power-bi-consultant", target: S + "power-bi-dashboards", match: /power bi (consult|freelanc|develop|expert|specialist)/ },
    { cluster: "power-bi-dashboard-examples", target: "new:" + B + "power-bi-retail-dashboard-examples", match: /power bi.*(retail|sales|dashboard)|(retail|sales).*power bi|retail.*dashboard|kpi dashboard/ },
    { cluster: "power-bi-general", target: "/blog/category/power-bi", match: /power bi/ },
    { cluster: "analyst-roles", target: "new:" + B + "brand-analyst-vs-business-analyst", match: /brand analyst|retail analyst$|merchandise analyst|allocation analyst|fashion data analyst|retail data analyst|merchandise planner|business analyst vs|vs business analyst/ },
    { cluster: "merchandise-financial-planning", target: S + "excel-retail-planning-models", match: /merchandise financial|merchandise budget|buy plan|(merchandis|retail|range|assortment).*(template|excel|workbook)|excel.*(retail|merchandis|buying)/ },
    { cluster: "assortment-planning-guide", target: "new:" + B + "assortment-planning-process-fashion-retail", match: /(assortment|range|merchandise) plan\w*.*(what|process|steps|definition|meaning|example|best practice|\bvs\b|important|types|first step|difference)|(what|why|how|process|difference|types).*(assortment|range|merchandise) plan|what is category management/ },
    { cluster: "range-planning-guide", target: "new:" + B + "range-planning-fashion", match: /range plan|range architecture|collection plan/ },
    { cluster: "assortment-planning-service", target: S + "assortment-planning", match: /assortment|merchandis\w* plan|category management/ },
    { cluster: "pim-plm-guide", target: "new:" + B + "pim-vs-plm-fashion-brands", match: /\bpim\b|product information management|\bplm\b|product lifecycle/ },
    { cluster: "product-attribute-standards", target: B + "product-attribute-standards-plm", match: /attribute (standard|dictionar)|product attribute|data dictionary/ },
    { cluster: "product-data-service", target: S + "product-data-quality-plm", match: /product (data|master|catalog)|master data|data (cleansing|enrichment|governance)|attribute mapping|data quality/ },
    { cluster: "reporting-process", target: S + "retail-analytics-processes", match: /retail reporting|trad(e|ing) report|reporting calendar|kpi definition|analytics process/ },
    { cluster: "retail-analytics-services", target: "/services", match: /(retail|fashion|merchandis\w*).*(consulting|consultancy|services)/ },
    { cluster: "retail-analytics-consultant", target: "/", match: /(retail|fashion|merchandis\w*|pricing|analytics).*(consultant|freelance)|freelance.*(retail|fashion|analyst)|retail consultant|fashion consultant/ },
    { cluster: "retail-analytics", target: "/", match: /retail analytics|fashion analytics|retail data analytics|fashion retail analytics/ },
  ],
  pl: [
    { cluster: "brand-name", target: "/pl", match: /tatsiana|tatiana|bandziuk/ },
    { cluster: "case-studies", target: "/pl/case-studies", match: /case study|studium przypadku/ },
    { cluster: "blog-power-bi", target: "/pl/blog/category/power-bi", match: /blog power bi/ },
    { cluster: "blog", target: "/pl/blog", match: /\bblog/ },
    { cluster: "jak-zostac-analitykiem", target: "new:/pl" + B + "jak-zostac-analitykiem-w-handlu", match: /jak zostać|kto to/ },
    { cluster: "kariera", target: "/pl/blog/category/kariera", match: /kariera|jak zostać|kto to/ },
    { cluster: "kontakt", target: "/pl/contact", match: /warszaw/ },
    { cluster: "o-mnie", target: "/pl/about", match: /analityk marki|brand analyst/ },
    { cluster: "power-bi-rls", target: "/pl" + B + "row-level-security-retail-reporting", match: /\brls\b|poziomie wierszy/ },
    { cluster: "analiza-abc-xyz", target: "new:/pl" + B + "analiza-abc-xyz-asortymentu", match: /\babc\b|\bxyz\b/ },
    { cluster: "rotacja-zapasow", target: "new:/pl" + B + "wskaznik-rotacji-zapasow", match: /rotacj|zapas/ },
    { cluster: "sell-through", target: "/pl" + B + "sell-through-rate-power-bi", match: /sell.?through|sell.?in/ },
    { cluster: "marza-narzut", target: "new:/pl" + B + "marza-a-narzut-w-handlu", match: /marż|narzut/ },
    { cluster: "miary-dax", target: "/pl" + B + "dax-measures-retail-kpi-dashboard", match: /dax/ },
    { cluster: "kpi-sprzedazy", target: "new:/pl" + B + "kpi-w-handlu-detalicznym", match: /kpi|wskaźnik/ },
    { cluster: "otb-szablon", target: "/pl/free-templates", match: /szablon|open.?to.?buy|budżet zakup|plan zakup/ },
    { cluster: "krzywa-rozmiarow", target: "/pl" + B + "size-curve-from-sales-data", match: /rozmiar/ },
    { cluster: "architektura-cenowa", target: "/pl" + B + "price-ladder-analysis", match: /architektura cen|drabin/ },
    { cluster: "strategia-cenowa", target: "new:/pl" + B + "strategie-cenowe-w-handlu", match: /strategi\w* cen|polityka cenow|ustalania cen|ustalanie cen|ustalić cen|cen\w* psycholog|cena detaliczn|ceny w sklepie|obniż|wyprzedaż|promocje/ },
    { cluster: "analiza-cen", target: "/pl" + S + "retail-pricing-analysis", match: /analiz\w* cen|cen\w* konkurencji/ },
    { cluster: "kursy", target: "/pl/courses", match: /kurs|szkoleni/ },
    { cluster: "raport-sprzedazy", target: "new:/pl" + B + "raport-sprzedazy-power-bi", match: /^raport sprzedaży$|raporty power bi|power bi dashboard|dashboard power bi|sales dashboard/ },
    { cluster: "power-bi-handel", target: "/pl" + S + "power-bi-dashboards", match: /power bi.*(handl|sprzeda|sales|konsult|wdroż|firm)|(wdroż|konsult).*power bi|dashboard sprzeda|raport\w* sprzeda/ },
    { cluster: "prognozowanie", target: "new:/pl" + B + "prognozowanie-sprzedazy-w-handlu", match: /prognozowanie/ },
    { cluster: "uslugi", target: "/pl/services", match: /usługi|outsourcing|na zlecenie|dla firm|konsulting|doradztwo power bi|firma power bi/ },
    { cluster: "power-bi-dashboard", target: "/pl/blog/category/power-bi", match: /power bi|dashboard|miary dax/ },
    { cluster: "excel-planowanie", target: "/pl" + S + "excel-retail-planning-models", match: /excel|planowanie sprzeda|prognozowanie|planowanie zakup/ },
    { cluster: "asortyment", target: "/pl" + S + "assortment-planning", match: /asortyment|merchandis|category management|zarządzanie kategori|kolekcj|kupiec|buyer/ },
    { cluster: "pim-plm", target: "new:/pl" + B + "system-pim-i-plm-w-branzy-modowej", match: /\bpim\b|\bplm\b|cyklem życia produktu/ },
    { cluster: "dane-produktowe", target: "/pl" + S + "product-data-quality-plm", match: /dane produktow|danymi produktow|danych produktow|atrybut|karty produkt|opisy produkt|jakość danych|zarządzanie danymi|data governance/ },
    { cluster: "analityk", target: "/pl", match: /analityk|freelanc|konsultant|doradztwo|konsulting/ },
    { cluster: "analityka-handel", target: "/pl", match: /analityk\w* (w handlu|w branży|sprzeda|biznes)|analiza sprzeda|analiza danych|retail analytics|analiza asortyment/ },
  ],
  ru: [
    { cluster: "brand-name", target: "/ru", match: /бандюк|бандзюк|tatsiana|bandziuk/ },
    { cluster: "case-studies", target: "/ru/case-studies", match: /кейс/ },
    { cluster: "blog", target: "/ru/blog", match: /блог/ },
    { cluster: "bajer-i-analitik", target: "new:/ru" + B + "bajer-kategorijnyj-menedzher-tovarnyj-analitik", match: /кто такой (байер|категорийн)|как стать (байер|товарн)|профессия байер|категорийный менеджер/ },
    { cluster: "karera", target: "/ru/blog/category/karera", match: /как стать аналитиком|профессия аналитик|карьер/ },
    { cluster: "o-sebe", target: "/ru/about", match: /бренд.?аналитик|аналитик бренда/ },
    { cluster: "power-bi-rls", target: "/ru" + B + "row-level-security-retail-reporting", match: /\brls\b|уровне строк/ },
    { cluster: "otchetnost", target: "/ru" + S + "retail-analytics-processes", match: /отчетност|еженедельн\S* отчет/ },
    { cluster: "oborachivaemost", target: "new:/ru" + B + "oborachivaemost-tovarnyh-zapasov", match: /оборачиваем|товарн\S* запас/ },
    { cluster: "sell-through", target: "/ru" + B + "sell-through-rate-power-bi", match: /sell.?through(?! vs)|реализаци|процент продаж/ },
    { cluster: "sell-in-sell-out", target: "/ru" + B + "sell-through-vs-finance", match: /sell.?out|sell.?in\b/ },
    { cluster: "marzha-nacenka", target: "new:/ru" + B + "marzha-i-nacenka-v-roznice", match: /маржинальн|наценк|марж/ },
    { cluster: "mery-dax", target: "/ru" + B + "dax-measures-retail-kpi-dashboard", match: /dax/ },
    { cluster: "kpi-ritejl", target: "new:/ru" + B + "kpi-v-roznichnoj-torgovle", match: /kpi|показател|метрик/ },
    { cluster: "otb-shablon", target: "/ru/free-templates", match: /шаблон|open.?to.?buy|\botb\b|бюджет закуп/ },
    { cluster: "razmernaya-matrica", target: "/ru" + B + "size-curve-from-sales-data", match: /размерн/ },
    { cluster: "cenovaya-arhitektura", target: "/ru" + B + "price-ladder-analysis", match: /ценов\S* архитектур|ценов\S* сегмент|ценов\S* линейк|линейк\S* цен|ценов\S* категори/ },
    { cluster: "cenoobrazovanie", target: "new:/ru" + B + "cenoobrazovanie-v-roznice", match: /ценообразован|ценов\S* политик|ценов\S* стратег|психологич|уценк|распродаж|скидк/ },
    { cluster: "analiz-cen", target: "/ru" + S + "retail-pricing-analysis", match: /анализ цен|аналитика прайс/ },
    { cluster: "kursy", target: "/ru/courses", match: /курс|обучени|для начинающих|как сделать/ },
    { cluster: "power-bi-ritejl", target: "/ru" + S + "power-bi-dashboards", match: /power bi.*(ритейл|рознич|продаж|консалт|консульт)|(консалт|консульт|внедрени|разработк).*(power bi|дашборд)|отчет\S* по продажам|отчет\S* о продажах/ },
    { cluster: "dashbord-prodazh", target: "new:/ru" + B + "dashbord-prodazh-power-bi", match: /дашборд|примеры.*power bi/ },
    { cluster: "power-bi-obshchee", target: "/ru/blog/category/power-bi", match: /power bi/ },
    { cluster: "abc-xyz", target: "new:/ru" + B + "abc-xyz-analiz-assortimenta", match: /abc|xyz|авс/ },
    { cluster: "excel-planirovanie", target: "/ru" + S + "excel-retail-planning-models", match: /excel|эксел|планирование закуп|планирование продаж|план закуп|планирование поставок|закупочн/ },
    { cluster: "assortimentnaya-matrica", target: "new:/ru" + B + "assortimentnaya-matrica-magazina-odezhdy", match: /ассортиментн\S* матриц|матриц\S* ассортимент/ },
    { cluster: "assortiment", target: "/ru" + S + "assortment-planning", match: /ассортимент|мерчанд|мерчен|категорийн|байер|коллекци/ },
    { cluster: "pim-plm", target: "new:/ru" + B + "pim-i-plm-sistemy-dlya-fashion", match: /pim|plm|плм/ },
    { cluster: "uslugi", target: "/ru/services", match: /аутсорс|услуги аналитик|консалтинг/ },
    { cluster: "atributy-tovara", target: "/ru" + B + "product-attribute-standards-plm", match: /атрибут|характеристик\S* товар/ },
    { cluster: "tovarnye-dannye", target: "/ru" + S + "product-data-quality-plm", match: /товарн\S* данн|мастер.?данн|номенклатур|характеристик\S* товар|карточк\S* товар|атрибут|качеств\S* данн|управлени\S* данн/ },
    { cluster: "analitik-roli", target: "/ru/about", match: /товарный аналитик|аналитик ассортимента|аналитик продаж|аналитик по продажам|аналитик отдела продаж/ },
    { cluster: "konsultant", target: "/ru", match: /фриланс|консульт|консалт|аналитик/ },
    { cluster: "analitika-ritejl", target: "/ru", match: /аналитик\S* (в )?(ритейл|рознич|продаж|товар)|ритейл аналитик|fashion|анализ продаж|анализ товар/ },
  ],
};

export function classify(lang: Lang, keyword: string): Rule | null {
  if (EXCLUDE[lang].test(keyword)) return null;
  return RULES[lang].find((r) => r.match.test(keyword)) ?? null;
}

/** Variants that Labs did not return; checked in Google Ads. */
export const EXTRA_CANDIDATES: Record<Lang, string[]> = {
  en: `tatsiana bandziuk|tatiana bandziuk|retail analytics consultant|retail analytics consulting|retail consultant|retail consultancy|retail consulting services|fashion retail consultant|fashion business consultant|merchandising consultant|merchandise planning consultant|assortment planning consultant|retail analytics|fashion analytics|retail data analytics|retail analytics services|retail data analyst|fashion data analyst|merchandise analyst|merchandise planner|allocation analyst|brand analyst|brand analyst fashion|brand analyst vs business analyst|pricing consultant|pricing analysis|retail pricing|price architecture|price ladder|good better best pricing|markdown strategy|markdown pricing|markdown optimisation|markdown analysis|price elasticity retail|power bi consultant|power bi consultant uk|power bi consultancy|power bi freelancer|freelance power bi developer|power bi dashboard examples|power bi retail|sales dashboard power bi|power bi sales dashboard|retail kpis|retail kpi|retail metrics|weeks of cover|weeks of cover formula|stock cover|stock cover formula|stock turn|inventory turnover formula|sell through|sell through formula|sell in vs sell through|gmroi|gmroi formula|full price sell through|size curve|size curves|size ratio|size curve fashion|size curve analysis|range plan|range plan template|range planning template|range architecture|merchandise plan|merchandise planning template|merchandise financial planning excel|otb|otb retail|otb meaning|open to buy calculation|open to buy formula|open to buy example|excel for merchandisers|retail excel templates|buying and merchandising|product information management|pim system|pim software|what is pim|pim vs plm|product data|product data management fashion|product attributes|product attribute management|product data governance|product data standards|fashion product data|apparel plm|plm system|what is plm|product data specialist|dax sell through|dax running total|row level security power bi|power bi rls|dynamic row level security power bi|retail analytics course|power bi course for retail|merchandise planning course|retail reporting|weekly trading report|retail trading report|kpi definitions|data dictionary template|end of season sale analysis|category management|category management consultant|ecommerce product data|product catalogue management|product data cleansing|product data enrichment|attribute mapping|freelance retail analyst|freelance merchandise planner|fashion analytics consultant|retail kpi dashboard template|power bi dashboard checklist`.split("|"),
  pl: `tatsiana bandziuk|analiza asortymentu sklepu|zarządzanie asortymentem w handlu|category management|zarządzanie kategorią produktów|merchandiser|merchandising|analityk biznesowy|analityk danych|konsultant biznesowy|doradztwo biznesowe|power bi konsultant|konsultant power bi|power bi szkolenie|kurs power bi|wdrożenie power bi|power bi dla firm|raporty power bi|raportowanie power bi|dashboard sprzedażowy|dashboard sprzedaży|kpi sprzedaży|kpi w sprzedaży|wskaźniki sprzedaży|wskaźniki w handlu|kpi sklepu|analiza sprzedaży|analiza sprzedaży excel|raport sprzedaży excel|planowanie sprzedaży|prognozowanie sprzedaży|prognozowanie popytu|planowanie zapasów|zarządzanie zapasami|optymalizacja zapasów|rotacja zapasów|strategia cenowa|strategie cenowe|ustalanie cen|cena psychologiczna|ceny psychologiczne|obniżki cen|wyprzedaż sezonowa|promocje cenowe|marża handlowa|jak obliczyć marżę|narzut a marża|pim|pim co to|plm|plm system|system plm|zarządzanie cyklem życia produktu|dane produktowe w e-commerce|karty produktowe|atrybuty produktów|jakość danych|zarządzanie danymi|data governance|excel dla handlowców|power query|dax|dax power bi|power bi kurs online|analiza danych sprzedażowych|branża modowa|analityk w branży modowej|planowanie kolekcji|sell-through rate|wskaźnik sell-through|open to buy co to|budżet zakupów|plan zakupów|analityk freelancer|freelance analityk danych|analiza cen konkurencji|architektura cenowa produktów|matryca asortymentowa sklepu|asortyment sklepu`.split("|"),
  ru: `татьяна бандюк|ассортиментная матрица магазина одежды|ассортимент магазина одежды|планирование ассортимента одежды|планирование коллекции одежды|мерчендайзинг|мерчандайзинг|байер|байер одежды|закупки одежды|план закупок|otb|sell through rate|процент продаж|коэффициент реализации|оборачиваемость|оборачиваемость товара|оборачиваемость товара формула|оборачиваемость запасов|товарный запас|размерная сетка|размерная линейка|ценообразование|ценообразование в магазине одежды|ценовая политика|ценовая стратегия|стратегия ценообразования|ценовые сегменты|психологическое ценообразование|скидки и распродажи|наценка|наценка на одежду|маржинальность|как рассчитать маржу|power bi|power bi обучение|power bi курс|power bi для начинающих|dax|dax формулы|kpi|kpi продаж|kpi магазина|kpi розничного магазина|показатели розничной торговли|метрики ритейла|метрики продаж|анализ продаж|анализ продаж в excel|отчет по продажам|отчет по продажам в excel|excel для аналитика|шаблон плана продаж excel|планирование продаж|pim|plm|plm для одежды|товарные данные|мастер данные|справочник номенклатуры|характеристики товаров|атрибуты товара|качество данных|управление данными|ритейл аналитика|fashion ритейл|fashion аналитик|аналитик в fashion|fashion консультант|консультант по ритейлу|консалтинг в ритейле|консалтинг розничной торговли|консультант по ассортименту|бизнес аналитик|аналитик данных|аналитик данных фриланс|категорийный менеджер|категорийный менеджмент|abc анализ ассортимента|abc xyz анализ|аналитик ассортимента|ценовая архитектура|управление товарными данными|power bi для ритейла|kpi в ритейле|консультант по аналитике|процент реализации товара|размерная матрица|отчет по продажам power bi`.split("|"),
};
