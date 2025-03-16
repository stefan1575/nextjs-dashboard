import { ChangeEmailForm } from "@/components/forms/change-email-form";
import { ChangePasswordForm } from "@/components/forms/change-password-form";
import { DeleteAccountForm } from "@/components/forms/delete-account-form";
import { auth } from "@/lib/auth";
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
