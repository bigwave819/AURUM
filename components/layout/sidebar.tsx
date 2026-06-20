// components/admin/sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Clock,
  ShoppingBag,
  Users,
  Settings,
  ChevronLeft,
} from "lucide-react";
import { useSidebarStore } from "@/store/sidebar-store";

const links = [
  { id: 1, name: "Dashboard", path: "/admin/dashboard",  icon: LayoutDashboard },
  { id: 2, name: "Watches",   path: "/admin/watches",    icon: Clock           },
  { id: 3, name: "Orders",    path: "/admin/orders",     icon: ShoppingBag     },
  { id: 4, name: "Customers", path: "/admin/customers",  icon: Users           },
  { id: 5, name: "Settings",  path: "/admin/settings",   icon: Settings        },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { collapsed, toggle } = useSidebarStore();

  return (
    <aside
      className="h-screen flex flex-col shrink-0 transition-[width] duration-250 ease-in-out"
      style={{
        width: collapsed ? "72px" : "232px",
        backgroundColor: "#FFF8F3",
        borderRight: "0.5px solid #E8DDD0",
      }}
    >
      {/* Top: logo + collapse toggle */}
      <div
        className="flex items-center justify-between px-4 h-16 shrink-0"
        style={{ borderBottom: "0.5px solid #E8DDD0" }}
      >
        {!collapsed && (
          <span
            className="text-sm font-medium tracking-[0.2em] whitespace-nowrap"
            style={{ color: "#745A27" }}
          >
            AURUM
          </span>
        )}
        <button
          onClick={toggle}
          aria-label="Toggle sidebar"
          className="w-7 h-7 flex items-center justify-center rounded-lg shrink-0 transition-transform duration-250"
          style={{ color: "#4D463A" }}
          onMouseEnter={e => (e.currentTarget.style.background = "#F0E9DF")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
        >
          <ChevronLeft
            size={17}
            style={{ transform: collapsed ? "rotate(180deg)" : "none", transition: "transform 0.25s" }}
          />
        </button>
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-2.5 pt-3.5 flex flex-col gap-0.5">
        {links.map(({ id, name, path, icon: Icon }) => {
          const active = pathname === path;
          return (
            <Link
              key={id}
              href={path}
              className={`flex items-center gap-3 rounded-lg text-[13px] font-medium tracking-wide whitespace-nowrap transition-colors duration-150
                ${collapsed ? "justify-center px-0 py-2.5" : "px-2.5 py-2.5 border-l-[3px]"}`}
              style={{
                color: active ? "#745A27" : "#4D463A",
                backgroundColor: active ? "#F5EDE3" : "transparent",
                borderLeftColor: !collapsed ? (active ? "#745A27" : "transparent") : undefined,
              }}
              onMouseEnter={e => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "#F0E9DF";
                  (e.currentTarget as HTMLElement).style.color = "#745A27";
                }
              }}
              onMouseLeave={e => {
                if (!active) {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                  (e.currentTarget as HTMLElement).style.color = "#4D463A";
                }
              }}
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span>{name}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Bottom: user */}
      <div className="px-2.5 py-3" style={{ borderTop: "0.5px solid #E8DDD0" }}>
        <div
          className={`flex items-center gap-2.5 rounded-lg p-2 cursor-pointer transition-colors duration-150 ${collapsed ? "justify-center" : ""}`}
          onMouseEnter={e => (e.currentTarget.style.background = "#F0E9DF")}
          onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
        >
          <div
            className="w-7.5 h-7.5 rounded-full flex items-center justify-center text-[12px] font-medium shrink-0"
            style={{ backgroundColor: "#745A27", color: "#FFF8F3" }}
          >
            HG
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <p className="text-xs font-medium whitespace-nowrap" style={{ color: "#3A2F22" }}>
                Hirwa
              </p>
              <p className="text-[11px] whitespace-nowrap" style={{ color: "#9E9185" }}>
                Admin
              </p>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}