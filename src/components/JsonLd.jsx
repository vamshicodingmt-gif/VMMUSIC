import { buildGraph } from '../data/schema.js';

/**
 * Emits schema.org JSON-LD. `@graph` keeps every node connected to the single
 * studio entity, so Google reads one business instead of duplicates.
 *
 * Rendered as a plain <script> tag — valid in the body, and it is present in
 * the prerendered HTML so crawlers see it without running JavaScript.
 */
export default function JsonLd({ nodes = [], id }) {
  const graph = buildGraph(nodes);
  return (
    <script
      type="application/ld+json"
      id={id}
      // Serialising our own static objects — no user input reaches this.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}
