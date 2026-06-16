// ============================================================
//  AURUM — Homepage
//  Simple hero landing page. Clerk auth controls appear in
//  the navbar (ShopNavbar) via SignedIn/SignedOut wrappers.
// ============================================================

import Link from 'next/link'

export default function HomePage() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] text-center px-6 bg-[#FDFAF7]">
      {/* Eyebrow */}
      <p className="text-[10px] tracking-[0.3em] uppercase text-[#A89880] mb-6">
        Haute Horlogerie
      </p>

      {/* Headline */}
      <h1 className="text-5xl md:text-7xl font-light tracking-[0.1em] text-[#1A1612] uppercase leading-tight mb-6">
        Time, <br className="hidden md:block" />
        <span className="text-[#8B6914]">Perfected.</span>
      </h1>

      {/* Sub-headline */}
      <p className="text-sm md:text-base text-[#6B6560] max-w-md leading-relaxed mb-10">
        Discover our curated collection of the world's finest timepieces — crafted for those who demand nothing less than perfection.
      </p>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 items-center">
        <Link
          href="/collection"
          className="text-[11px] tracking-[0.25em] uppercase bg-[#8B6914] text-white px-8 py-3.5 rounded-[4px] hover:bg-[#A8823E] transition-colors duration-200"
        >
          Explore Collection
        </Link>
        <Link
          href="/watch"
          className="text-[11px] tracking-[0.25em] uppercase border border-[#8B6914] text-[#8B6914] px-8 py-3.5 rounded-[4px] hover:bg-[#8B6914] hover:text-white transition-colors duration-200"
        >
          Shop All Watches
        </Link>
      </div>

      {/* Decorative rule */}
      <div className="mt-20 flex items-center gap-4">
        <div className="h-px w-16 bg-[#E8E0D5]" />
        <span className="text-[10px] tracking-[0.3em] uppercase text-[#A89880]">
          Since 1887
        </span>
        <div className="h-px w-16 bg-[#E8E0D5]" />
      </div>
    </section>
  )
}
