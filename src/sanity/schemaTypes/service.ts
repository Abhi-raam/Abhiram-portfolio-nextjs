import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Service / Area of Expertise",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Service Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "number",
      title: "Number String (e.g. 01, 02)",
      type: "string",
    }),
    defineField({
      name: "category",
      title: "Category (e.g. FRONTEND, APPLICATIONS, INTEGRATION)",
      type: "string",
    }),
    defineField({
      name: "titlePrefix",
      title: "Title Prefix (e.g. FRONTEND )",
      type: "string",
    }),
    defineField({
      name: "titleGhost",
      title: "Title Ghost Word (e.g. DEVELOPMENT)",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "chips",
      title: "Skill / Tech Chips",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", type: "string", title: "Label" },
            { name: "featured", type: "boolean", title: "Featured / Highlighted Chip", initialValue: false },
          ],
        },
      ],
    }),
    defineField({
      name: "layout",
      title: "Bento Card Layout",
      type: "string",
      options: {
        list: [
          { title: "Wide (50% on desktop)", value: "wide" },
          { title: "Compact (33.3% on desktop)", value: "compact" },
        ],
      },
      initialValue: "compact",
    }),
    defineField({
      name: "href",
      title: "Action Link URL",
      type: "string",
      initialValue: "#contact",
    }),
    defineField({
      name: "order",
      title: "Order Index",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
