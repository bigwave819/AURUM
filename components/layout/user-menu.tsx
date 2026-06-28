"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, User, ShoppingBag, LayoutDashboard } from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface UserMenuProps {
  user: {
    name: string;
    email: string;
    image?: string | null;
    role?: string | null;
  };
}

function getInitials(name: string) {
  return name.split(" ").map((p) => p[0]).join("").slice(0, 2).toUpperCase();
}

export function UserMenu({ user }: UserMenuProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const isAdmin = user.role === "admin";

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  async function handleSignOut() {
    try {
      await authClient.signOut();
      router.push("/");
      router.refresh();
    } catch (error) {
      console.error("Sign out failed", error);
    }
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen((p) => !p)}
        className="flex items-center justify-center w-9 h-9 rounded-full overflow-hidden transition-opacity hover:opacity-85"
        style={{ border: "0.5px solid #D4B896" }}
        aria-label="Account menu"
        aria-expanded={open}
        aria-haspopup="menu"
      >        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.image} alt={user.name} className="w-full h-full object-cover" />
        ) : (
          <div
            className="w-full h-full flex items-center justify-center text-xs font-medium"
            style={{ backgroundColor: "#745A27", color: "#FFF8F3" }}
          >
            {getInitials(user.name)}
          </div>
        )}
      </button>

      {open && (
        <div
          className="absolute right-0 top-full mt-2 w-52 rounded-lg overflow-hidden z-50"
          style={{ backgroundColor: "white", border: "0.5px solid #E8DDD0", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
        >
          <div className="px-4 py-3" style={{ borderBottom: "0.5px solid #E8DDD0" }}>
            <p className="text-sm font-medium truncate" style={{ color: "#3A2F22" }}>
              {user.name}
            </p>
            <p className="text-xs truncate" style={{ color: "#9E9185" }}>
              {user.email}
            </p>
          </div>

          {isAdmin && (
            <button
              onClick={() => { setOpen(false); router.push("/admin/dashboard"); }}
              className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors text-left"
              style={{ color: "#745A27", borderBottom: "0.5px solid #E8DDD0" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F5EDE3")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
            >
              <LayoutDashboard size={15} />
              Admin dashboard
            </button>
          )}

          <button
            onClick={() => { setOpen(false); router.push("/profile"); }}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors text-left"
            style={{ color: "#4D463A" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F5EDE3")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <User size={15} />
            View profile
          </button>

          <button
            onClick={() => { setOpen(false); router.push("/orders"); }}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors text-left"
            style={{ color: "#4D463A" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#F5EDE3")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <ShoppingBag size={15} />
            My orders
          </button>

          <button
            onClick={handleSignOut}
            className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm transition-colors text-left"
            style={{ color: "#A32D2D", borderTop: "0.5px solid #E8DDD0" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#FCEBEB")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <LogOut size={15} />
            Sign out
          </button>
        </div>
      )}
    </div>
  );
}