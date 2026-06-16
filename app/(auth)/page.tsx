// ============================================================
//  AURUM — Sign In Page
//  Matches the Login screen from the designs:
//  Centered card, AURUM logo, "Management Suite Access" label,
//  email + password fields, gold SIGN IN button
//  Clerk handles the actual auth UI via <SignIn />
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
            // Card
            card: 'shadow-sm border border-[#E8E0D5] rounded-[6px] py-10 px-8',
            // Header
            headerTitle: 'font-cormorant text-2xl font-light tracking-widest text-[#8B6914] uppercase',
            headerSubtitle: 'text-[#6B6560] text-xs tracking-widest uppercase mt-1',
            // Logo area — we inject AURUM branding above
            logoImage: 'hidden',
            logoBox: 'hidden',
            // Form fields
            formFieldLabel: 'text-[10px] font-medium tracking-[0.2em] uppercase text-[#6B6560]',
            formFieldInput: 'border-[#E8E0D5] rounded-[6px] text-sm focus:border-[#8B6914] focus:ring-0',
            // Primary button — matches gold SIGN IN button
            formButtonPrimary:
              'bg-[#8B6914] hover:bg-[#A8823E] text-white text-[11px] tracking-[0.25em] uppercase font-medium rounded-[4px] py-3 transition-colors',
            // Footer links
            footerActionLink: 'text-[#8B6914] hover:text-[#A8823E]',
            // Divider
            dividerLine: 'bg-[#E8E0D5]',
            dividerText: 'text-[#6B6560] text-xs tracking-widest uppercase',
          },
          layout: {
            logoPlacement: 'none',
            showOptionalFields: false,
          },
        }}
        redirectUrl="/admin/dashboard"
        signUpUrl={undefined} // disable public sign-up — admin-only
      />

      {/* AURUM branding injected above the Clerk card */}
      <div className="absolute top-[calc(50%-220px)] text-center pointer-events-none">
        <p className="font-cormorant text-2xl tracking-[0.35em] text-[#8B6914] uppercase">
          AURUM
        </p>
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#6B6560] mt-1">
          Management Suite Access
        </p>
      </div>

      <p className="mt-8 text-[10px] tracking-[0.2em] uppercase text-[#A89880]">
        © 2024 AURUM LUXURY. ALL RIGHTS RESERVED.
      </p>
    </main>
  )
}