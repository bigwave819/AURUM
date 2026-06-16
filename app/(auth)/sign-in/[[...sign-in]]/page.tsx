// ============================================================
//  AURUM — Clerk Sign In Catch-All Route
//  Required by @clerk/nextjs for redirect & modal flows.
//  Place at: app/(auth)/sign-in/[[...sign-in]]/page.tsx
// ============================================================

import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <main className="min-h-screen bg-[#F5F0EB] flex flex-col items-center justify-center px-4">
      <SignIn
        appearance={{
          variables: {
            colorPrimary: '#8B6914',
            colorBackground: '#FFFFFF',
            colorText: '#111111',
            colorTextSecondary: '#6B6560',
            colorInputBackground: '#FFFFFF',
            colorInputText: '#111111',
            borderRadius: '6px',
            fontFamily: 'Inter, sans-serif',
          },
          elements: {
            card: 'shadow-sm border border-[#E8E0D5] rounded-[6px] py-10 px-8',
            headerTitle:
              'font-cormorant text-2xl font-light tracking-widest text-[#8B6914] uppercase',
            headerSubtitle: 'text-[#6B6560] text-xs tracking-widest uppercase mt-1',
            logoImage: 'hidden',
            logoBox: 'hidden',
            formFieldLabel:
              'text-[10px] font-medium tracking-[0.2em] uppercase text-[#6B6560]',
            formFieldInput:
              'border-[#E8E0D5] rounded-[6px] text-sm focus:border-[#8B6914] focus:ring-0',
            formButtonPrimary:
              'bg-[#8B6914] hover:bg-[#A8823E] text-white text-[11px] tracking-[0.25em] uppercase font-medium rounded-[4px] py-3 transition-colors',
            footerActionLink: 'text-[#8B6914] hover:text-[#A8823E]',
            dividerLine: 'bg-[#E8E0D5]',
            dividerText: 'text-[#6B6560] text-xs tracking-widest uppercase',
          },
          layout: {
            logoPlacement: 'none',
            showOptionalFields: false,
          },
        }}
      />

      {/* AURUM branding above the card */}
      <div className="absolute top-[calc(50%-220px)] text-center pointer-events-none">
        <p className="text-2xl tracking-[0.35em] text-[#8B6914] uppercase font-light">
          AURUM
        </p>
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#6B6560] mt-1">
          Luxury Timepieces
        </p>
      </div>

      <p className="mt-8 text-[10px] tracking-[0.2em] uppercase text-[#A89880]">
        © 2024 AURUM LUXURY. ALL RIGHTS RESERVED.
      </p>
    </main>
  )
}
