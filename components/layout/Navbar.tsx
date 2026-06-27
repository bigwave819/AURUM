"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingBag, UserCircle, Menu, X } from "lucide-react";
import { useState } from "react";


const links = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "Watches",    path: "/watch"       },
  { id: 3, name: "Contact",    path: "/contact"     },
];

export default function Navbar() {
  const pathname  = usePathname();
  const [open, setOpen] = useState(false);
  const router = useRouter()

  if (pathname.startsWith("/admin") || pathname === "not-found") {
      return null;
    }

  return (
    <nav
      className="relative w-full"
      style={{ backgroundColor: "#FFF8F3", borderBottom: "0.5px solid #E8DDD0" }}
    >
      {/* ── Main bar ── */}
      <div className="flex items-center justify-between px-6 sm:px-10 md:px-16 lg:px-24 h-22">

        {/* Logo */}
        <span
          className="text-2xl md:text-3xl font-medium tracking-[0.22em] shrink-0"
          style={{ color: "#745A27" }}
        >
          AURUM
        </span>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-10 lg:gap-14 list-none">
          {links.map(({ id, name, path }) => {
            const active = pathname === path;
            return (
              <li key={id}>
                <Link
                  href={path}
                  className="relative pb-1 text-[13px] tracking-[0.12em] font-medium
                             transition-colors duration-200 group"
                  style={{ color: active ? "#745A27" : "#4D463A" }}
                >
                  {name}

                  {/* hover underline */}
                  <span
                    className="absolute bottom-0 left-0 h-[1.5px] w-0
                               group-hover:w-full transition-all duration-300 ease-out"
                    style={{
                      backgroundColor: "#745A27",
                      opacity: active ? 0 : 1,
                    }}
                  />

                  {/* active underline */}
                  {active && (
                    <span
                      className="absolute bottom-0 left-0 h-[1.5px] w-full"
                      style={{ backgroundColor: "#745A27" }}
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Icons */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0 cursor-pointer">
          <button
            className="p-2 rounded-lg transition-colors duration-200"
            style={{ color: "#4D463A" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#F0E9DF")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            aria-label="Cart"
            onClick={() => router.push("/cart")}
          >
            <ShoppingBag size={20} />
          </button>

          <button
            className="p-2 rounded-lg transition-colors duration-200 cursor-pointer"
            style={{ color: "#4D463A" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#F0E9DF")}
            onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
            aria-label="Account"
            onClick={() => router.push("/auth")}
          >
            <UserCircle size={20} />
          </button>

          {/* Hamburger — mobile only */}
          <button
            className="md:hidden p-2 rounded-lg transition-colors duration-200"
            style={{ color: "#4D463A" }}
            onClick={() => setOpen(p => !p)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* ── Mobile drawer ── */}
      <div
        className="md:hidden overflow-hidden transition-all duration-300 ease-in-out"
        style={{ maxHeight: open ? "300px" : "0px" }}
      >
        {links.map(({ id, name, path }) => {
          const active = pathname === path;
          return (
            <Link
              key={id}
              href={path}
              onClick={() => setOpen(false)}
              className="flex items-center px-8 sm:px-12 py-5 text-sm tracking-widest
                         font-medium transition-colors duration-200"
              style={{
                color: active ? "#745A27" : "#4D463A",
                borderBottom: "0.5px solid #E8DDD0",
                borderLeft: active ? "3px solid #745A27" : "3px solid transparent",
                backgroundColor: active ? "#F5EDE3" : "transparent",
              }}
            >
              {name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}