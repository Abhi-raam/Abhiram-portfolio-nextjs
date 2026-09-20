"use client";

import React from "react";
import Image from "next/image";
import { motion, type Variants } from "framer-motion";
import { HERO_DATA } from "@/data/siteData";

const charVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: (i: number) => ({
    opacity: 1,
    y: [50, -18, 0],
    transition: {
      y: {
        times: [0, 0.52, 1],
        duration: 0.8,
        delay: 0.1 + i * 0.034,
        ease: ["easeOut", "easeInOut"],
      },
      opacity: {
        duration: 0.35,
        delay: 0.1 + i * 0.034,
        ease: "easeOut",
      },
    },
  }),
};

interface HeroProps {
  name?: string;
  title?: string;
  headlineWord1?: string;
  headlineWord2?: string;
  estText?: string;
  heroLede?: string;
  disciplines?: string[];
  heroRole?: string;
  imageUrl?: string;
}

export function Hero({
  name,
  headlineWord1,
  headlineWord2,
  estText = HERO_DATA.leftRail.estText,
  heroLede = HERO_DATA.rightRail.lede,
  disciplines = HERO_DATA.rightRail.disciplines,
  heroRole = HERO_DATA.rightRail.role,
  imageUrl,
}: HeroProps) {
  const safeDisciplines = disciplines && Array.isArray(disciplines) && disciplines.length > 0 ? disciplines : HERO_DATA.rightRail.disciplines;
  const safeEstText = estText && estText.trim() ? estText : HERO_DATA.leftRail.estText;
  const safeHeroLede = heroLede && heroLede.trim() ? heroLede : HERO_DATA.rightRail.lede;
  const safeHeroRole = heroRole && heroRole.trim() ? heroRole : HERO_DATA.rightRail.role;
  const portraitSrc = imageUrl || HERO_DATA.portrait.src;
  const portraitAlt = name ? `${name} - Frontend Developer` : HERO_DATA.portrait.alt;

  // Build headline words dynamically if custom words are provided
  const displayHeadline = React.useMemo(() => {
    if (!headlineWord1 && !headlineWord2) {
      return HERO_DATA.headlineWords;
    }

    const line1Str = headlineWord1 || "ENGINEERING";
    const line2Str = headlineWord2 || "THE FUTURE";

    const formatLine = (str: string) => {
      const words = str.trim().split(/\s+/);
      return words.map((w, wIdx) => {
        return w.split("").map((char, cIdx) => ({
          char,
          ghost: (wIdx + cIdx) % 3 === 0,
        }));
      });
    };

    return [formatLine(line1Str), formatLine(line2Str)];
  }, [headlineWord1, headlineWord2]);

  let globalCharIndex = 0;

  return (
    <section
      className="scene relative flex flex-col items-center pt-[clamp(36px,5vw,76px)] px-[var(--gutter)] pb-12 lg:pb-0 h-auto lg:h-[clamp(660px,71vw,1100px)]"
      aria-label="Intro"
    >
      <h1 className="relative z-[2] text-center display display-xl" aria-label={HERO_DATA.ariaLabel}>
        <span aria-hidden="true">
          {displayHeadline.map((line, lineIdx) => (
            <span key={lineIdx}>
              {lineIdx > 0 && <br />}
              {line.map((word, wordIdx) => (
                <span key={wordIdx}>
                  {wordIdx > 0 && " "}
                  <span className="gw">
                    {word.map((item, charIdx) => {
                      const idx = globalCharIndex++;
                      return (
                        <motion.span
                          key={charIdx}
                          custom={idx}
                          initial="hidden"
                          animate="visible"
                          variants={charVariants}
                          className={`gl ${item.ghost ? "ghost" : ""}`}
                        >
                          {item.char}
                        </motion.span>
                      );
                    })}
                  </span>
                </span>
              ))}
            </span>
          ))}
        </span>
      </h1>

      <figure
        className="pointer-events-none z-[3] relative lg:absolute inset-x-0 bottom-auto lg:bottom-0 mx-auto w-[min(72vw,400px)] lg:w-[clamp(310px,40vw,600px)] -mt-[12vw] lg:mt-0 mb-2 lg:mb-0 [mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_10%,black_90%,transparent_100%)]"
        aria-hidden="true"
      >
        <div className="portrait-img relative w-full aspect-[4/5] [mask-image:linear-gradient(to_bottom,black_58%,transparent_82%)] [-webkit-mask-image:linear-gradient(to_bottom,black_58%,transparent_82%)]">
          <Image
            alt={portraitAlt}
            src={portraitSrc}
            fill
            sizes="(max-width: 1024px) min(72vw, 400px), clamp(310px, 40vw, 600px)"
            priority
            className="object-cover object-top !filter-none"
            style={{ filter: "none", WebkitFilter: "none" }}
          />
        </div>
      </figure>

      <div className="z-[4] static lg:absolute w-full lg:w-auto left-auto lg:left-[var(--gutter)] top-auto lg:top-[clamp(300px,33vw,500px)] flex flex-row lg:flex-col justify-between lg:justify-start items-center lg:items-start gap-[clamp(28px,3vw,48px)] mb-9 lg:mb-0">
        <p className="micro tracking-[0.06em] text-[clamp(11px,1.1vw,16px)]">{safeEstText}</p>
        <a
          className="circle-btn !w-[clamp(72px,7vw,104px)]"
          href={HERO_DATA.leftRail.ctaHref}
          aria-label={HERO_DATA.leftRail.ctaAriaLabel}
          onClick={(e) => e.currentTarget.blur()}
        >
          <svg
            viewBox="0 0 24 24"
            className="arr"
            aria-hidden="true"
          >
            <path d="M4 12h16M15 7l5 5-5 5"></path>
          </svg>
        </a>
      </div>

      <div className="z-[4] static lg:absolute w-full lg:w-auto right-auto lg:right-[var(--gutter)] top-auto lg:top-[clamp(300px,33vw,500px)] bottom-auto lg:bottom-[clamp(40px,6vw,96px)] flex flex-col justify-between text-left lg:text-right items-start lg:items-end gap-10 lg:gap-0">
        <p className="lede max-w-[26ch]">{safeHeroLede}</p>
        <div className="flex flex-col items-inherit gap-8">
          <ul
            className="tracking-[0.08em] text-[var(--muted)] flex flex-col items-start lg:items-end gap-3.5 text-[clamp(12px,1.15vw,16px)] list-none p-0"
            aria-label="Disciplines"
          >
            {safeDisciplines.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="micro mut">{safeHeroRole}</p>
        </div>
      </div>
    </section>
  );
}

export default Hero;
