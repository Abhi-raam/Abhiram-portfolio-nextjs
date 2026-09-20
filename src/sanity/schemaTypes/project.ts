import { defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Project",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Project Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "index",
      title: "Index String (e.g. 01, 02)",
      type: "string",
    }),
    defineField({
      name: "projectType",
      title: "Project Category / Group",
      type: "string",
      options: {
        list: [
          { title: "Client Work", value: "client" },
          { title: "Own / Personal Products", value: "products" },
        ],
      },
      initialValue: "client",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category Tag (e.g. FINTECH & DASHBOARD)",
      type: "string",
    }),
    defineField({
      name: "desc",
      title: "Short Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Primary Desktop Screenshot",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "mobileImage",
      title: "Secondary Mobile Screenshot (Optional)",
      type: "image",
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: "tech",
      title: "Tech Stack Tags",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "liveUrl",
      title: "Live Demo URL",
      type: "url",
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL",
      type: "url",
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
