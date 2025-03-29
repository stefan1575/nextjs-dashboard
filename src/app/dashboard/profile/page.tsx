import { ChangeEmailForm } from "@/features/profile/components/change-email-form";
import { ChangePasswordForm } from "@/features/profile/components/change-password-form";
import { DeleteAccountForm } from "@/features/profile/components/delete-account-form";
import { VerifyEmailCard } from "@/features/profile/components/verify-email-card";

export default async function Page() {
  return (
    <div className="space-y-6 p-0">
      <VerifyEmailCard />
      <ChangeEmailForm />
      <ChangePasswordForm />
      <DeleteAccountForm />
    </div>
  );
}
