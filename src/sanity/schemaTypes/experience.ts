import { defineField, defineType } from "sanity";

export default defineType({
  name: "experience",
  title: "Experience",
  type: "document",
  fields: [
    defineField({
      name: "role",
      title: "Job Role / Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "company",
      title: "Company",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "period",
      title: "Duration / Period (e.g. 09 DEC 2024 — PRESENT)",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isCurrent",
      title: "Is Currently Working Here?",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "type",
      title: "Employment Type (e.g. Full-Time, Freelance)",
      type: "string",
      initialValue: "Full-Time",
    }),
    defineField({
      name: "location",
      title: "Location (e.g. Kerala, India)",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Summary Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "highlights",
      title: "Key Highlights / Achievements",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "tech",
      title: "Tech Stack & Tools",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "order",
      title: "Order Index",
      type: "number",
      description: "Controls the timeline order (ascending)",
      validation: (Rule) => Rule.required(),
    }),
  ],
});
