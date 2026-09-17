import type { CalculatorKind } from "./types";

export type Field = { id: string; initial: number; suffix?: string };
export type Result = { id: string; format: "percent" | "number" | "ratio" | "days" | "weeks"; compute: (v: Record<string, number>) => number | null };

const div = (a: number, b: number) => (b ? a / b : null);

/** Inputs and formulas per kind. Labels come from the content block, keyed by id. */
export const CALCULATOR_FIELDS: Record<CalculatorKind, { inputs: Field[]; results: Result[] }> = {
  marginMarkup: {
    inputs: [
      { id: "cost", initial: 20 },
      { id: "price", initial: 50 },
      { id: "targetMargin", initial: 60, suffix: "%" },
    ],
    results: [
      { id: "margin", format: "percent", compute: (v) => div(v.price - v.cost, v.price) },
      { id: "markup", format: "percent", compute: (v) => div(v.price - v.cost, v.cost) },
      { id: "profit", format: "number", compute: (v) => v.price - v.cost },
      { id: "targetPrice", format: "number", compute: (v) => (v.targetMargin < 100 ? div(v.cost, 1 - v.targetMargin / 100) : null) },
    ],
  },
  sellThrough: {
    inputs: [
      { id: "opening", initial: 200 },
      { id: "received", initial: 800 },
      { id: "sold", initial: 640 },
      { id: "returned", initial: 40 },
    ],
    results: [
      { id: "rate", format: "percent", compute: (v) => div(v.sold - v.returned, v.opening + v.received) },
      { id: "rateReceived", format: "percent", compute: (v) => div(v.sold - v.returned, v.received) },
    ],
  },
  gmroi: {
    inputs: [
      { id: "grossMargin", initial: 120000 },
      { id: "avgInventory", initial: 80000 },
    ],
    results: [{ id: "gmroi", format: "ratio", compute: (v) => div(v.grossMargin, v.avgInventory) }],
  },
  stockTurn: {
    inputs: [
      { id: "cogs", initial: 600000 },
      { id: "avgInventory", initial: 150000 },
      { id: "periodDays", initial: 365 },
      { id: "stock", initial: 1200 },
      { id: "weeklySales", initial: 150 },
    ],
    results: [
      { id: "turns", format: "ratio", compute: (v) => div(v.cogs, v.avgInventory) },
      { id: "days", format: "days", compute: (v) => { const t = div(v.cogs, v.avgInventory); return t ? v.periodDays / t : null; } },
      { id: "weeksCover", format: "weeks", compute: (v) => div(v.stock, v.weeklySales) },
    ],
  },
  openToBuy: {
    inputs: [
      { id: "sales", initial: 100000 },
      { id: "markdowns", initial: 8000 },
      { id: "endStock", initial: 60000 },
      { id: "openingStock", initial: 70000 },
      { id: "onOrder", initial: 20000 },
    ],
    results: [{ id: "otb", format: "number", compute: (v) => v.sales + v.markdowns + v.endStock - v.openingStock - v.onOrder }],
  },
};
