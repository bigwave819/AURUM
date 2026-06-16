// ============================================================
//  AURUM — Shop Layout
//  Wraps all (shop) routes with the top navbar and a footer.
// ============================================================

import { ShopNavbar } from '@/components/shop/ShopNavbar'

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen bg-[#FDFAF7]">
      <ShopNavbar />
      <main className="flex-grow">{children}</main>
      <footer className="border-t border-[#E8E0D5] py-8 text-center">
        <p className="text-[10px] tracking-[0.2em] uppercase text-[#A89880]">
          © 2024 AURUM LUXURY. ALL RIGHTS RESERVED.
        </p>
      </footer>
    </div>
  )
}
