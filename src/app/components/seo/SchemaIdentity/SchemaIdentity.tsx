import { identityGraph } from "@/lib/schema/identity";

/**
 * Emits the site-wide Person + ProfessionalService + WebSite graph.
 *
 * Uses a plain <script> rather than next/script on purpose. next/script queues
 * its content into self.__next_s and injects it after hydration, so the JSON-LD
 * is absent from the server HTML — invisible to any crawler that doesn't run
 * JavaScript, which includes most of the fetchers behind LLM answers.
 */
export default function SchemaIdentity({ lang }: { lang: string }) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(identityGraph(lang)) }}
    />
  );
}
