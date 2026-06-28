// app/admin/layout.tsx
import Sidebar from "@/components/layout/sidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-y-auto" style={{ backgroundColor: "#FFF8F3" }}>
        <div className="p-6 sm:p-8">{children}</div>
      </main>
    </div>
  );
}