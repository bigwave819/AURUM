// components/landing/story-section.tsx
"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface StorySectionProps {
  eyebrow: string;
  heading: string;
  body: string;
  imageSrc?: string;
  imageAlt: string;
  fallbackColor: string;
  reverse?: boolean;
}

export function StorySection({
  eyebrow,
  heading,
  body,
  imageSrc,
  imageAlt,
  fallbackColor,
  reverse,
}: StorySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(section.querySelectorAll("[data-reveal]"), {
        opacity: 0,
        y: 32,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.12,
        scrollTrigger: {
          trigger: section,
          start: "top 75%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`grid sm:grid-cols-2 items-center gap-10 sm:gap-16 px-6 sm:px-16 py-20 sm:py-28 max-w-6xl mx-auto overflow-hidden ${
        reverse ? "sm:[&>*:first-child]:order-2" : ""
      }`}
      style={{ backgroundColor: "#FFF8F3" }}
    >
      <div data-reveal>
        <p className="text-[11px] tracking-[0.18em] uppercase mb-3" style={{ color: "#B89660" }}>
          {eyebrow}
        </p>
        <h2
          className="text-2xl sm:text-[32px] leading-tight mb-4"
          style={{ color: "#3A2F22", fontFamily: "var(--font-serif, Georgia, serif)" }}
        >
          {heading}
        </h2>
        <p className="text-sm leading-relaxed max-w-md" style={{ color: "#6B6258" }}>
          {body}
        </p>
      </div>

      <div
        data-reveal
        className="relative aspect-4/3 rounded-xl w-full overflow-hidden"
        style={{ backgroundColor: fallbackColor }}
      >
        {imageSrc && (
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-contain p-6 sm:p-8"
            sizes="(max-width: 640px) 100vw, 50vw"
          />
        )}
      </div>
    </section>
  );
}