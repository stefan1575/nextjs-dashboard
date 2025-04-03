import { ResetPasswordForm } from "@/features/authentication/components/reset-password-form";
import { Logo } from "@/shared/components/logo";
import { redirect } from "next/navigation";
import type React from "react";

export default async function ResetPassword({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const token = (await searchParams).token;

  if (!token || typeof token !== "string") {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="flex w-full max-w-md flex-col gap-6">
        <Logo className="self-center" />
        <ResetPasswordForm token={token} />
      </div>
    </div>
  );
}
