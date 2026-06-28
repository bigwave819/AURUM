"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingBag, Menu, X } from "lucide-react";
import { useState } from "react";
import { useSession } from "@/lib/auth-client";
import { UserMenu } from "./user-menu";
import { useCartStore } from "@/store/cart-store";
import { useCartHydrated } from "@/hooks/use-cart-hydrated";

const links = [
  { id: 1, name: "Home", path: "/" },
  { id: 2, name: "Watches", path: "/watch" },
  { id: 3, name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const hydrated = useCartHydrated();
  const totalItems = useCartStore((s) => s.totalItems());

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <nav
      className="relative w-full"
      style={{ backgroundColor: "#FFF8F3", borderBottom: "0.5px solid #E8DDD0" }}
    >
      <div className="flex items-center justify-between px-6 sm:px-10 md:px-16 lg:px-24 h-22">
        <span
          className="text-2xl md:text-3xl font-medium tracking-[0.22em] shrink-0"
          style={{ color: "#745A27" }}
        >
          AURUM
        </span>

        <ul className="hidden md:flex items-center gap-10 lg:gap-14 list-none">
          {links.map(({ id, name, path }) => {
            const active = pathname === path;
            return (
              <li key={id}>
                <Link
                  href={path}
                  className="relative pb-1 text-[13px] tracking-[0.12em] font-medium transition-colors duration-200 group"
                  style={{ color: active ? "#745A27" : "#4D463A" }}
                >
                  {name}
                  <span
                    className="absolute bottom-0 left-0 h-[1.5px] w-0 group-hover:w-full transition-all duration-300 ease-out"
                    style={{ backgroundColor: "#745A27", opacity: active ? 0 : 1 }}
                  />
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

        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <button
            className="relative p-2 rounded-lg transition-colors duration-200 cursor-pointer"
            style={{ color: "#4D463A" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#F0E9DF")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
            aria-label="Cart"
            onClick={() => router.push("/cart")}
          >
            <ShoppingBag size={20} />
            {hydrated && totalItems > 0 && (
              <span
                className="absolute -top-0.5 -right-0.5 flex items-center justify-center min-w-4.5 h-4.5 px-1 rounded-full text-[10px] font-medium leading-none"
                style={{ backgroundColor: "#745A27", color: "#FFF8F3" }}
              >
                {totalItems > 9 ? "9+" : totalItems}
              </span>
            )}
          </button>

          {session?.user ? (
            <UserMenu user={session.user} />
          ) : (
            <button
              className="text-xs font-medium px-4 py-2 rounded-lg transition-colors duration-200 cursor-pointer"
              style={{ color: "#FFF8F3", backgroundColor: "#745A27" }}
              onClick={() => router.push("/auth")}
            >
              Sign in
            </button>
          )}

          <button
            className="md:hidden p-2 rounded-lg transition-colors duration-200"
            style={{ color: "#4D463A" }}
            onClick={() => setOpen((p) => !p)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

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
              className="flex items-center px-8 sm:px-12 py-5 text-sm tracking-widest font-medium transition-colors duration-200"
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