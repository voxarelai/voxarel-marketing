type JsonLdData = Record<string, unknown>;

/**
 * Renders a JSON-LD block. The `<` escape stops a string value containing
 * "</script>" from breaking out of the tag.
 */
export function JsonLd({ data }: { data: JsonLdData | JsonLdData[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
