import { defineField, defineType } from "sanity";

export default defineType({
  name: "achievement",
  title: "Achievement",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "icon",
      title: "Icon Name",
      type: "string",
      options: {
        list: [
          { title: "Award (trophy)", value: "award" },
          { title: "Zap (lightning)", value: "zap" },
          { title: "Database (storage)", value: "database" },
          { title: "Terminal (code)", value: "terminal" },
          { title: "Graduation (cap)", value: "graduation" },
          { title: "Briefcase (bag)", value: "briefcase" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "order",
      title: "Order Index",
      type: "number",
      description: "Controls the sort order (ascending)",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
