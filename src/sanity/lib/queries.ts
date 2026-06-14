import { groq } from "next-sanity";

export const profileQuery = groq`*[_type == "profile"][0] {
  name,
  title,
  bio1,
  bio2,
  image,
  "resumeUrl": resume.asset->url,
  stats,
  email,
  mobile,
  linkedin,
  github,
  location,
  specialties
}`;

export const experiencesQuery = groq`*[_type == "experience"] | order(order asc) {
  title,
  company,
  duration,
  description,
  tags
}`;

export const educationsQuery = groq`*[_type == "education"] | order(order asc) {
  title,
  subtitle,
  duration,
  description,
  tags
}`;

export const projectsQuery = groq`*[_type == "project"] | order(order asc) {
  name,
  description,
  image,
  category,
  techStack,
  liveUrl,
  githubUrl
}`;

export const skillsQuery = groq`*[_type == "skill"] | order(order asc) {
  name,
  level,
  category
}`;

