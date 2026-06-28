// app/auth/redirect/page.tsx — NEW FILE
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function AuthRedirectPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/auth");
  }

  const role = (session.user as any).role;

  if (role === "admin") {
    redirect("/admin/dashboard");
  }

  redirect("/");
}