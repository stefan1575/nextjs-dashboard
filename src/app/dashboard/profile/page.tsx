import { ChangeEmailForm } from "@/features/profile/components/change-email-form";
import { ChangePasswordForm } from "@/features/profile/components/change-password-form";
import { DeleteAccountForm } from "@/features/profile/components/delete-account-form";
import { LinkGoogleCard } from "@/features/profile/components/link-google-card";
import { SetPasswordForm } from "@/features/profile/components/set-password-form";
import { VerifyEmailCard } from "@/features/profile/components/verify-email-card";

export default function Page() {
  return (
    <div className="space-y-6">
      <VerifyEmailCard />
      <LinkGoogleCard />
      <SetPasswordForm />
      <ChangeEmailForm />
      <ChangePasswordForm />
      <DeleteAccountForm />
    </div>
  );
}
