// app/admin/settings/page.tsx
import { headers } from "next/headers";
import { auth } from "@/lib/auth";
import { ProfileForm } from "@/components/admin/settings/profile-form";

export default async function SettingsPage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <p className="text-sm font-medium" style={{ color: "#3A2F22" }}>
          Not signed in
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 max-w-lg">
      <div>
        <h1 className="text-xl font-medium" style={{ color: "#3A2F22" }}>
          Settings
        </h1>
        <p className="text-sm mt-1" style={{ color: "#9E9185" }}>
          Manage your account details.
        </p>
      </div>

      <ProfileForm
        user={{
          id: session.user.id,
          name: session.user.name,
          email: session.user.email,
          image: session.user.image ?? null,
        }}
      />
    </div>
  );
}