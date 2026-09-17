/**
 * Compiles the Studio schema and prints every problem (the same check the Studio runs on load).
 *   npx tsx scripts/sanity/validate-schema.ts
 */
import { groupProblems, validateSchema } from "@sanity/schema/_internal";
import { schemaTypes } from "../../src/sanity/schemaTypes";

const problems = groupProblems(validateSchema(schemaTypes as never).getTypes() as never);
let errors = 0;
for (const group of problems) {
  for (const p of group.problems) {
    if (p.severity === "error") errors++;
    console.log(p.severity, group.path.map((x) => ("name" in x && x.name) || x.kind).join(" > "), "—", p.message);
  }
}
console.log(errors ? `${errors} schema error(s)` : "schema OK");
process.exit(errors ? 1 : 0);
