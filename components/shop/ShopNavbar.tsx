// ============================================================
//  AURUM — Shop Navbar
//  Displays brand logo + navigation links + Clerk auth controls.
//  Shows SignInButton + SignUpButton when signed out,
//  and UserButton when signed in.
// ============================================================

'use client'

import Link from 'next/link'
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'

export function ShopNavbar() {
  return (
    <nav className="w-full border-b border-[#E8E0D5] bg-white/90 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-16">

        {/* Brand */}
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/"
            className="text-[#8B6914] tracking-[0.35em] uppercase text-lg font-light select-none"
          >
            AURUM
          </Link>
        </motion.div>

        {/* Nav Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:flex items-center gap-8"
        >
          {[
            { label: 'Collection', href: '/collection' },
            { label: 'Watches', href: '/watch' },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[10px] tracking-[0.2em] uppercase text-[#6B6560] hover:text-[#8B6914] transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </motion.div>

        {/* Auth Controls + Cart */}
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex items-center gap-4"
        >
          {/* Cart icon — always visible */}
          <Link
            href="/cart"
            aria-label="Shopping bag"
            className="text-[#6B6560] hover:text-[#8B6914] transition-colors duration-200"
          >
            <ShoppingBag size={18} strokeWidth={1.5} />
          </Link>

          {/* Signed-out: show Sign In + Sign Up buttons */}
          <SignedOut>
            <SignInButton mode="redirect">
              <button
                className="text-[10px] tracking-[0.2em] uppercase text-[#6B6560] hover:text-[#8B6914] transition-colors duration-200 cursor-pointer"
                aria-label="Sign in to your account"
              >
                Sign In
              </button>
            </SignInButton>

            <SignUpButton mode="redirect">
              <button
                className="text-[10px] tracking-[0.2em] uppercase bg-[#8B6914] text-white px-4 py-2 rounded-[4px] hover:bg-[#A8823E] transition-colors duration-200 cursor-pointer"
                aria-label="Create a new account"
              >
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>

          {/* Signed-in: show UserButton avatar */}
          <SignedIn>
            <UserButton
              appearance={{
                variables: { colorPrimary: '#8B6914' },
                elements: {
                  avatarBox: 'w-8 h-8 ring-1 ring-[#E8E0D5]',
                  userButtonPopoverCard: 'shadow-md border border-[#E8E0D5]',
                  userButtonPopoverActionButton:
                    'text-xs tracking-[0.15em] uppercase hover:bg-[#F5F0EB]',
                },
              }}
              afterSignOutUrl="/"
            />
          </SignedIn>
        </motion.div>

      </div>
    </nav>
  )
}
