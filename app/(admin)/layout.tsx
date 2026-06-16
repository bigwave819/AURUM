import { redirect } from "next/navigation";
import { currentUser } from "@clerk/nextjs/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();
  
  if (user?.publicMetadata?.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-sidebar border-r p-4 hidden md:block">
        <div className="text-xl font-bold mb-6">Admin Panel</div>
      </aside>
      <main className="flex-grow p-8 bg-muted/20">
        {children}
      </main>
    </div>
  );
}
