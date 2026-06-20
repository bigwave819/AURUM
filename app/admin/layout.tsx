import Sidebar from "@/components/layout/sidebar";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="grow p-8 bg-muted/20">
        {children}
      </main>
    </div>
  );
}
