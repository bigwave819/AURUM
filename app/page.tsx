// app/page.tsx
import { HeroSection } from "@/components/landing/hero-section";
import { StorySection } from "@/components/landing/story-section";
import { CtaSection } from "@/components/landing/cta-section";

export default function HomePage() {
  return (
    <main>
      <HeroSection />

      <StorySection
        eyebrow="Heritage"
        heading="Built on a century of restraint"
        body="AURUM exists for those who measure quality in decades, not seasons. Every piece we carry is chosen for permanence — mechanisms built to outlast trends, faces designed to age into character rather than obsolescence."
        imageSrc="/one.jpg"
        imageAlt="A curated case of fine timepieces from AURUM's collection"
        fallbackColor="#E8DDD0"
      />

      <StorySection
        eyebrow="Craftsmanship"
        heading="Every detail, deliberate"
        body="From the weight of the crown to the finish on the caseback, nothing is incidental. Our specialists inspect each timepiece before it reaches a client — because precision isn't a feature, it's the entire premise."
        imageSrc="/two.jpg"
        imageAlt="Close-up detail of a AURUM timepiece"
        fallbackColor="#F5EDE3"
        reverse
      />

      <StorySection
        eyebrow="The collection"
        heading="Curated, not catalogued"
        body="We don't stock everything — we stock what's worth owning. A focused selection of references from the houses that defined modern watchmaking, sourced and verified by people who actually wear them."
        imageSrc="/three.jpg"
        imageAlt="A selection of AURUM's curated timepiece collection"
        fallbackColor="#745A27"
      />

      <CtaSection />
    </main>
  );
}