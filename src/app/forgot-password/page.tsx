import { ForgotPasswordForm } from "@/features/authentication/components/forgot-password-form";
import { Logo } from "@/shared/components/logo";

export default function ForgotPassword() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="flex w-full max-w-md flex-col gap-6">
        <Logo className="self-center" />
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
