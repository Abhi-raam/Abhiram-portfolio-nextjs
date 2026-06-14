import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  profileQuery,
  experiencesQuery,
  educationsQuery,
  projectsQuery,
  skillsQuery,
} from "@/sanity/lib/queries";

// Disable Next.js caching to always fetch the latest data from Sanity
export const revalidate = 0;

export default async function Home() {
  let profile = null;
  let experiences = [];
  let educations = [];
  let projects = [];
  let skills = [];

  try {
    profile = await client.fetch(profileQuery);
    experiences = await client.fetch(experiencesQuery);
    educations = await client.fetch(educationsQuery);
    projects = await client.fetch(projectsQuery);
    skills = await client.fetch(skillsQuery);
  } catch (error) {
    console.error("Failed to fetch Sanity data, using local static fallbacks:", error);
  }

  // Extract variables with type checking and default fallbacks
  const name = profile?.name || undefined;
  const title = profile?.title || undefined;
  const bio1 = profile?.bio1 || undefined;
  const bio2 = profile?.bio2 || undefined;
  const resumeUrl = profile?.resumeUrl || undefined;
  const stats = profile?.stats || undefined;
  const email = profile?.email || undefined;
  const mobile = profile?.mobile || undefined;
  const linkedinUrl = profile?.linkedin || undefined;
  const githubUrl = profile?.github || undefined;
  const location = profile?.location || undefined;
  const imageUrl = profile?.image ? urlFor(profile.image).url() : undefined;
  const specialties = profile?.specialties || undefined;

  return (
    <>
      <Navbar name={name} />
      <main className="flex-1 w-full animate-fadeIn">
        <Hero
          name={name}
          title={title}
          bio1={bio1}
          resumeUrl={resumeUrl}
          githubUrl={githubUrl}
          linkedinUrl={linkedinUrl}
          imageUrl={imageUrl}
        />
        <About
          bio1={bio1}
          bio2={bio2}
          stats={stats && stats.length > 0 ? stats : undefined}
          specialties={specialties}
        />
        <Experience
          workExperience={experiences && experiences.length > 0 ? experiences : undefined}
          educationHistory={educations && educations.length > 0 ? educations : undefined}
        />
        <Projects
          projects={projects && projects.length > 0 ? projects : undefined}
        />
        <Skills
          skills={skills && skills.length > 0 ? skills : undefined}
        />
        <Contact
          email={email}
          mobile={mobile}
          linkedinUrl={linkedinUrl}
          githubUrl={githubUrl}
          location={location}
        />
      </main>
      <Footer
        name={name}
        email={email}
        linkedinUrl={linkedinUrl}
        githubUrl={githubUrl}
      />
    </>
  );
}
