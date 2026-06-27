// components/landing/hero-section.tsx
"use client";

import { useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function HeroSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Entrance — plays once on load
      gsap.from(".al-hero-reveal", {
        opacity: 0,
        y: 24,
        duration: 1,
        ease: "power3.out",
        stagger: 0.15,
        delay: 0.2,
      });

      // Scroll-out — pinned hero fades/scales as the user scrolls past it
      const st = ScrollTrigger.create({
        trigger: section,
        start: "top top",
        end: "+=100%",
        pin: true,
        pinSpacing: true,
        scrub: true,
        invalidateOnRefresh: true,
      });

      gsap.to(".al-hero-fade", {
        opacity: 0,
        y: -40,
        scale: 0.96,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=70%",
          scrub: true,
        },
      });

      gsap.to(".al-hero-bg-text", {
        scale: 1.4,
        opacity: 0,
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: "+=100%",
          scrub: true,
        },
      });

      return () => st.kill();
    }, sectionRef);

    const refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      clearTimeout(refreshTimeout);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen overflow-hidden flex items-center justify-center"
      style={{ backgroundColor: "#0E0C0A", height: "calc(100vh - 6rem)" }}
    >
      {/* Oversized background numerals — pure type as texture */}
      <div
        className="al-hero-bg-text absolute inset-0 flex items-center justify-center pointer-events-none select-none"
        aria-hidden="true"
      >
        <span
          className="text-[40vw] sm:text-[28vw] leading-none font-medium"
          style={{
            color: "transparent",
            WebkitTextStroke: "1px #2A2218",
            fontFamily: "var(--font-serif, Georgia, serif)",
          }}
        >
          XII
        </span>
      </div>

      <div className="relative z-10 flex flex-col items-center text-center px-6">
        <p
          className="al-hero-reveal al-hero-fade text-[11px] tracking-[0.2em] uppercase mb-6"
          style={{ color: "#B89660" }}
        >
          Fine horology
        </p>

        <h1
          className="al-hero-reveal al-hero-fade text-4xl sm:text-6xl lg:text-7xl font-medium tracking-wide leading-[1.05] mb-6"
          style={{ color: "#F5EDE3", fontFamily: "var(--font-serif, Georgia, serif)" }}
        >
          Time,
          <br />
          <em className="italic" style={{ color: "#745A27", fontStyle: "italic" }}>
            considered.
          </em>
        </h1>

        <p
          className="al-hero-reveal al-hero-fade text-sm sm:text-base max-w-md mb-2"
          style={{ color: "#A89A87" }}
        >
          The AURUM collection — timepieces chosen for permanence, not the season.
        </p>

        <p
          className="al-hero-reveal al-hero-fade text-[11px] tracking-[0.15em] uppercase mt-10"
          style={{ color: "#8A7E6E" }}
        >
          The AURUM collection
        </p>
      </div>

      <div className="al-hero-reveal al-hero-fade absolute bottom-8 left-0 right-0 text-center pointer-events-none z-10">
        <p className="text-[10px] tracking-[0.12em] uppercase mb-1" style={{ color: "#6B5F4F" }}>
          Scroll
        </p>
        <div className="mx-auto w-px h-6 animate-bounce" style={{ backgroundColor: "#6B5F4F" }} />
      </div>
    </section>
  );
}