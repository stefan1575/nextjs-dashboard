import { ChangeEmailForm } from "@/features/profile/components/change-email-form";
import { ChangePasswordForm } from "@/features/profile/components/change-password-form";
import { DeleteAccountForm } from "@/features/profile/components/delete-account-form";
import { auth } from "@/shared/lib/auth";
import { headers } from "next/headers";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    throw Error("No session in /dashboard/profile/layout.tsx");
  }

  return (
    <div className="space-y-6">
      <ChangeEmailForm user={session.user} />
      <ChangePasswordForm />
      <DeleteAccountForm />
    </div>
  );
}
