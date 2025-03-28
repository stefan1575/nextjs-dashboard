import { ChangeEmailForm } from "@/features/profile/components/change-email-form";
import { ChangePasswordForm } from "@/features/profile/components/change-password-form";
import { DeleteAccountForm } from "@/features/profile/components/delete-account-form";

export default async function Page() {
  return (
    <div className="space-y-6 p-0">
      <ChangeEmailForm />
      <ChangePasswordForm />
      <DeleteAccountForm />
    </div>
  );
}
