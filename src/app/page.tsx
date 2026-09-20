import React from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import ContactFooter from "@/components/ContactFooter";
import CustomCursor from "@/components/CustomCursor";

import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import {
  profileQuery,
  experiencesQuery,
  projectsQuery,
  servicesQuery,
} from "@/sanity/lib/queries";

// Revalidate every 30 seconds
export const revalidate = 30;

export default async function Home() {
  let profile = null;
  let rawExperiences = [];
  let rawProjects = [];
  let rawServices = [];

  try {
    profile = await client.fetch(profileQuery);
    rawExperiences = await client.fetch(experiencesQuery);
    rawProjects = await client.fetch(projectsQuery);
    rawServices = await client.fetch(servicesQuery);
  } catch (error) {
    console.error("Failed to fetch Sanity data, falling back to static data:", error);
  }

  // Format profile portrait image
  let portraitUrl: string | undefined = "/portrait-v2.png";
  if (profile?.image) {
    try {
      portraitUrl = urlFor(profile.image).url();
    } catch {
      portraitUrl = "/portrait-v2.png";
    }
  }

  // Format projects with URLs
  const formattedProjects = (rawProjects || []).map((p: any) => {
    let desktopUrl: string | undefined = undefined;
    let mobileUrl: string | undefined = undefined;

    if (p.image) {
      try {
        desktopUrl = urlFor(p.image).url();
      } catch {
        desktopUrl = undefined;
      }
    }
    if (p.mobileImage) {
      try {
        mobileUrl = urlFor(p.mobileImage).url();
      } catch {
        mobileUrl = undefined;
      }
    }

    return {
      ...p,
      image: desktopUrl,
      mobileImage: mobileUrl,
    };
  });

  return (
    <div className="card-shell relative min-h-screen bg-[var(--paper)] text-[var(--ink)] font-['Archivo',sans-serif] uppercase antialiased font-normal overflow-clip">
      <Navbar
        name={profile?.name}
        wordmarkGhost={profile?.wordmarkGhost}
        wordmarkRest={profile?.wordmarkRest}
        githubUrl={profile?.github}
        linkedinUrl={profile?.linkedin}
        email={profile?.email}
      />
      <main id="main">
        <Hero
          name={profile?.name || undefined}
          title={profile?.title || undefined}
          headlineWord1={profile?.headlineWord1 || undefined}
          headlineWord2={profile?.headlineWord2 || undefined}
          estText={profile?.estText || undefined}
          heroLede={profile?.heroLede || undefined}
          disciplines={
            profile?.disciplines && Array.isArray(profile.disciplines) && profile.disciplines.length > 0
              ? profile.disciplines
              : undefined
          }
          heroRole={profile?.heroRole || undefined}
          imageUrl={portraitUrl}
        />
        <About
          quote={profile?.aboutQuote}
          bio1={profile?.bio1}
          stats={
            profile?.stats && Array.isArray(profile.stats) && profile.stats.length > 0
              ? profile.stats
              : undefined
          }
        />
        <Experience
          workExperience={
            rawExperiences && Array.isArray(rawExperiences) && rawExperiences.length > 0
              ? rawExperiences
              : undefined
          }
        />
        <Projects
          projects={
            formattedProjects && Array.isArray(formattedProjects) && formattedProjects.length > 0
              ? formattedProjects
              : undefined
          }
        />
        <Services
          services={
            rawServices && Array.isArray(rawServices) && rawServices.length > 0
              ? rawServices
              : undefined
          }
        />
        <ContactFooter
          email={profile?.email}
          mobile={profile?.mobile}
          linkedinUrl={profile?.linkedin}
          githubUrl={profile?.github}
          location={profile?.location}
          availabilityStatus={profile?.availabilityStatus}
          availabilityLocation={profile?.availabilityLocation}
          scatterKeywords={profile?.scatterKeywords}
          channels={profile?.channels}
          legalCopyright={profile?.legalCopyright}
          legalCredit={profile?.legalCredit}
        />
      </main>
      <CustomCursor />
    </div>
  );
}
