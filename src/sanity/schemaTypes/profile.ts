import { defineField, defineType } from "sanity";

export default defineType({
  name: "profile",
  title: "Profile",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bio1",
      title: "Bio Paragraph 1",
      type: "text",
      description: "About me first paragraph",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "bio2",
      title: "Bio Paragraph 2",
      type: "text",
      description: "About me second paragraph (skills/approach focus)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "image",
      title: "Profile Image",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "resume",
      title: "Resume / CV File",
      type: "file",
      description: "Upload your resume PDF",
    }),
    defineField({
      name: "stats",
      title: "Statistics Cards",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "value", type: "string", title: "Value (e.g., 2+)" },
            { name: "label", type: "string", title: "Label (e.g., Years of Experience)" },
            {
              name: "icon",
              type: "string",
              title: "Icon Name",
              options: {
                list: [
                  { title: "Briefcase (Exp)", value: "briefcase" },
                  { title: "Folder (Projects)", value: "folder" },
                  { title: "CPU (Techs)", value: "cpu" },
                  { title: "Git Commit (Commits)", value: "commit" },
                ],
              },
            },
          ],
        },
      ],
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "mobile",
      title: "Mobile Number",
      type: "string",
    }),
    defineField({
      name: "linkedin",
      title: "LinkedIn URL",
      type: "url",
    }),
    defineField({
      name: "github",
      title: "GitHub URL",
      type: "url",
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "specialties",
      title: "Specialties / Focus Areas",
      type: "array",
      of: [{ type: "string" }],
      description: "Focus areas displayed on the About page (e.g. Next.js, TypeScript)",
    }),
  ],
});
