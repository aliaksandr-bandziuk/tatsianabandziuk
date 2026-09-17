/**
 * Short field builders. Every schema mirrors a view model in
 * src/content/types.ts (field names are the same); docs/sanity-mapping.md
 * lists where each model field lives.
 */
type Options = {
  title?: string;
  description?: string;
  group?: string;
  fieldset?: string;
  hidden?: boolean;
  required?: boolean;
  initialValue?: unknown;
  rows?: number;
  list?: string[] | { title: string; value: string }[];
  collapsed?: boolean;
};

// Sanity's field typings are strict per field type; the builders return plain definitions.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Field = any;

const humanize = (name: string) =>
  name.replace(/([A-Z])/g, " $1").replace(/^./, (c) => c.toUpperCase());

function base(name: string, o: Options) {
  return {
    name,
    title: o.title ?? humanize(name),
    description: o.description,
    group: o.group,
    fieldset: o.fieldset,
    hidden: o.hidden,
    initialValue: o.initialValue,
    validation: o.required ? (r: { required: () => unknown }) => r.required() : undefined,
  };
}

export const str = (name: string, o: Options = {}): Field => ({
  ...base(name, o),
  type: "string",
  options: o.list ? { list: o.list } : undefined,
});

export const txt = (name: string, o: Options = {}): Field => ({ ...base(name, o), type: "text", rows: o.rows ?? 3 });

export const num = (name: string, o: Options = {}): Field => ({ ...base(name, o), type: "number" });

export const bool = (name: string, o: Options = {}): Field => ({ ...base(name, o), type: "boolean" });

export const img = (name: string, o: Options = {}): Field => ({ ...base(name, o), type: "image" });

/** Field of a named object type (accentHeading, seo, recommendation…). */
export const typed = (name: string, type: string, o: Options = {}): Field => ({
  ...base(name, o),
  type,
  options: { collapsible: true, collapsed: o.collapsed ?? false },
});

/** Inline object with its own fields. */
export const obj = (name: string, fields: Field[], o: Options = {}): Field => ({
  ...base(name, o),
  type: "object",
  fields,
  options: { collapsible: true, collapsed: o.collapsed ?? true },
});

/** Array of strings (one line each) or of paragraphs (`text`). */
export const strings = (name: string, o: Options = {}): Field => ({ ...base(name, o), type: "array", of: [{ type: "string" }] });
export const paragraphs = (name: string, o: Options = {}): Field => ({ ...base(name, o), type: "array", of: [{ type: "text", rows: 4 }] });

/** Array of named object types. */
export const list = (name: string, types: string | string[], o: Options = {}): Field => ({
  ...base(name, o),
  type: "array",
  of: (Array.isArray(types) ? types : [types]).map((type) => ({ type })),
});

/** Array of inline objects. */
export const objects = (name: string, fields: Field[], o: Options & { preview?: { title: string; subtitle?: string } } = {}): Field => ({
  ...base(name, o),
  type: "array",
  of: [
    {
      type: "object",
      name: `${name}Item`,
      fields,
      preview: o.preview ? { select: o.preview } : undefined,
    },
  ],
});
