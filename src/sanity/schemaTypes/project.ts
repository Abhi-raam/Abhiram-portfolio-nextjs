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
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Thumbnail Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Next.js", value: "next" },
          { title: "React.js", value: "react" },
          { title: "Full Stack", value: "fullstack" },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "techStack",
      title: "Tech Stack / Skills Used",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "liveUrl",
      title: "Live Demo URL (Optional)",
      type: "url",
    }),
    defineField({
      name: "githubUrl",
      title: "GitHub URL (Optional)",
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
