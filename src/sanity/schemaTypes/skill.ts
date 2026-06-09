import { defineField, defineType } from "sanity";

export default defineType({
  name: "skill",
  title: "Skill",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Skill Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "level",
      title: "Proficiency Level (0-100)",
      type: "number",
      validation: (Rule) => Rule.required().min(0).max(100),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Frontend", value: "frontend" },
          { title: "Backend", value: "backend" },
          { title: "Tools", value: "tools" },
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
