// components/landing/cta-section.tsx
"use client";

import { useRef, useLayoutEffect } from "react";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function CtaSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      gsap.from(section.querySelectorAll("[data-reveal]"), {
        opacity: 0,
        y: 24,
        duration: 0.8,
        ease: "power3.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: section,
          start: "top 70%",
          toggleActions: "play none none none",
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    const refreshTimeout = setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      clearTimeout(refreshTimeout);
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="flex flex-col items-center justify-center text-center gap-5 py-28 sm:py-36 px-6"
      style={{ backgroundColor: "#3A2F22" }}
    >
      <p
        data-reveal
        className="text-[11px] tracking-[0.18em] uppercase"
        style={{ color: "#B89660" }}
      >
        Begin here
      </p>
      <h2
        data-reveal
        className="text-3xl sm:text-[40px]"
        style={{ color: "#F5EDE3", fontFamily: "var(--font-serif, Georgia, serif)" }}
      >
        Explore the collection
      </h2>
      <Link
        data-reveal
        href="/watch"
        className="px-9 py-4 text-[12px] tracking-widest uppercase rounded-md transition-opacity hover:opacity-90"
        style={{ backgroundColor: "#745A27", color: "#FFF8F3" }}
      >
        View watches
      </Link>
    </section>
  );
}