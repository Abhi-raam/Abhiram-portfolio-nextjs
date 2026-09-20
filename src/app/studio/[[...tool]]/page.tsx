"use client";

import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export default function StudioPage() {
  return (
    <div data-lenis-prevent className="fixed inset-0 h-full w-full overflow-hidden">
      <NextStudio config={config} />
    </div>
  );
}
