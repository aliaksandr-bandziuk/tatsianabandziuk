import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";

// Next 16 removed `next lint`; ESLint 9 flat config with Next's core-web-vitals rules.
export default defineConfig([
  ...nextVitals,
  {
    rules: {
      // New in eslint-plugin-react-hooks 6 (React Compiler rules). The flagged
      // effects deliberately sync state with the browser or the route (close
      // menus on navigation, read the consent cookie after mount); they work,
      // so this stays a warning until they are rewritten.
      "react-hooks/set-state-in-effect": "warn",
    },
  },
  globalIgnores([".next/**", "node_modules/**", "_to_delete/**", "backups/**", "research/**", "templates/**", "next-env.d.ts"]),
]);
