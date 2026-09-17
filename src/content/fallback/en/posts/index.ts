import type { Post } from "../../../types";
import { post as sellThroughRate } from "./sell-through-rate";
import { post as openToBuy } from "./open-to-buy";
import { post as rowLevelSecurity } from "./row-level-security";
import { post as daxMeasures } from "./dax-measures";
import { post as markupVsMargin } from "./markup-vs-margin";
import { post as dashboardExamples } from "./dashboard-examples";
import { post as pricingStrategy } from "./pricing-strategy";
import { post as pimVsPlm } from "./pim-vs-plm";
import { post as retailKpis } from "./retail-kpis";
import { post as abcXyz } from "./abc-xyz";
import { post as rangePlanning } from "./range-planning";
import { post as priceArchitecture } from "./price-architecture";
import { post as productAttributes } from "./product-attributes";
import { post as sellInSellThrough } from "./sell-in-sell-through";
import { post as markdownStrategy } from "./markdown-strategy";
import { post as assortmentProcess } from "./assortment-process";
import { post as sizeCurve } from "./size-curve";
import { post as analystRoles } from "./analyst-roles";
import { post as merchandisePlannerCareer } from "./merchandise-planner-career";

/** Articles in this language, newest first by date (the blog sorts by date). */
export const posts: Post[] = [
  sellThroughRate,
  openToBuy,
  rowLevelSecurity,
  daxMeasures,
  markupVsMargin,
  dashboardExamples,
  pricingStrategy,
  pimVsPlm,
  retailKpis,
  abcXyz,
  rangePlanning,
  priceArchitecture,
  productAttributes,
  sellInSellThrough,
  markdownStrategy,
  assortmentProcess,
  sizeCurve,
  analystRoles,
  merchandisePlannerCareer,
];
