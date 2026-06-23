// components/admin/settings/profile-form.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { updateProfile } from "@/actions/admin-actions";
import { profileSchema, type ProfileValues } from "@/lib/schemas/settings-schema";

interface ProfileFormProps {
  user: {
    id: string;
    name: string;
    email: string;
    image: string | null;
  };
}

function getInitials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function ProfileForm({ user }: ProfileFormProps) {
  const router = useRouter();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: { name: user.name },
  });

  async function onSubmit(values: ProfileValues) {
    setSubmitError(null);
    setSuccess(false);

    const result = await updateProfile(values);

    if (!result.success) {
      setSubmitError(result.error ?? "Something went wrong.");
      return;
    }

    setSuccess(true);
    router.refresh();
  }

  return (
    <div
      className="rounded-lg p-6 flex flex-col gap-5"
      style={{ border: "0.5px solid #E8DDD0", backgroundColor: "white" }}
    >
      <div className="flex items-center gap-4">
        <Avatar className="h-14 w-14">
          <AvatarImage src={user.image ?? undefined} alt={user.name} />
          <AvatarFallback
            style={{ backgroundColor: "#745A27", color: "#FFF8F3" }}
            className="text-sm font-medium"
          >
            {getInitials(user.name)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium" style={{ color: "#3A2F22" }}>
            {user.name}
          </p>
          <p className="text-xs" style={{ color: "#9E9185" }}>
            {user.email}
          </p>
        </div>
      </div>

      <Separator style={{ backgroundColor: "#E8DDD0" }} />

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
        {submitError && (
          <div
            className="rounded-md px-3 py-2 text-xs"
            style={{ backgroundColor: "#FCEBEB", color: "#791F1F", border: "0.5px solid #F09595" }}
          >
            {submitError}
          </div>
        )}

        {success && (
          <div
            className="rounded-md px-3 py-2 text-xs"
            style={{ backgroundColor: "#EAF4EA", color: "#2D5F2D", border: "0.5px solid #A8D5A8" }}
          >
            Profile updated.
          </div>
        )}

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name">Display name</Label>
          <Input id="name" {...register("name")} />
          {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
        </div>

        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={user.email} disabled />
          <p className="text-[11px]" style={{ color: "#9E9185" }}>
            Email is tied to your Google account and can't be changed here.
          </p>
        </div>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-fit"
          style={{ backgroundColor: "#745A27", color: "#FFF8F3" }}
        >
          {isSubmitting ? "Saving…" : "Save changes"}
        </Button>
      </form>
    </div>
  );
}