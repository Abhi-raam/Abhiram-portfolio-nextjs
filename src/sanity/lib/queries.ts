import { groq } from "next-sanity";

export const profileQuery = groq`*[_type == "profile"][0] {
  name,
  wordmarkGhost,
  wordmarkRest,
  title,
  headlineWord1,
  headlineWord2,
  estText,
  heroLede,
  disciplines,
  heroRole,
  aboutQuote,
  bio1,
  image,
  "resumeUrl": resume.asset->url,
  stats,
  email,
  mobile,
  linkedin,
  github,
  location,
  availabilityStatus,
  availabilityLocation,
  scatterKeywords,
  channels,
  legalCopyright,
  legalCredit
}`;

export const experiencesQuery = groq`*[_type == "experience"] | order(order asc) {
  _id,
  role,
  title,
  company,
  period,
  duration,
  isCurrent,
  type,
  location,
  description,
  highlights,
  tech,
  tags,
  order
}`;

export const projectsQuery = groq`*[_type == "project"] | order(order asc) {
  _id,
  name,
  index,
  projectType,
  category,
  desc,
  image,
  mobileImage,
  tech,
  liveUrl,
  githubUrl,
  order
}`;

export const servicesQuery = groq`*[_type == "service"] | order(order asc) {
  _id,
  name,
  number,
  category,
  titlePrefix,
  titleGhost,
  description,
  chips,
  layout,
  href,
  order
}`;
