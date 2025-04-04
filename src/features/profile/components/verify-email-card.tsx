"use client";

import { Button } from "@/shared/components/ui/button";
import { useSession } from "@/shared/hooks/use-session";
import { authClient } from "@/shared/lib/auth-client";
import { useMutation } from "@tanstack/react-query";
import { AlertCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";

export function VerifyEmailCard() {
  const { user } = useSession();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      await authClient.sendVerificationEmail(
        {
          email: user.email,
          callbackURL: "/dashboard/profile",
        },
        {
          onSuccess: () => {
            toast.success("Verification Email Sent", {
              description:
                "We've sent you a verification email. Please check your inbox and follow the link to verify your account.",
            });
          },
          onError: () => {
            toast.error("Email Sending Failed", {
              description:
                "Something went wrong while sending the email. Please try again later.",
            });
          },
        },
      );
    },
  });

  async function handleVerifyEmail() {
    mutate();
  }

  if (user.emailVerified) {
    return null;
  }

  return (
    <div className="space-y-4 rounded-lg border border-amber-200 bg-amber-50 p-6 text-sm md:p-8 dark:border-amber-800 dark:bg-amber-950/30">
      <div className="flex items-center gap-2">
        <AlertCircle className="h-4 w-4 text-amber-500 dark:text-amber-400" />
        <span className="font-medium text-amber-800 dark:text-amber-300">
          Your email {user.email} is not verified
        </span>
      </div>
      <div className="mt-2">
        {isPending ? (
          <Button
            type="submit"
            className="border-amber-300 text-amber-600 hover:bg-amber-100 hover:text-amber-700 dark:border-amber-700 dark:text-amber-400 dark:hover:bg-amber-900/40 dark:hover:text-amber-300"
            disabled
          >
            <Loader2 className="animate-spin" />
            Loading...
          </Button>
        ) : (
          <Button
            variant="outline"
            className="border-amber-300 text-amber-600 hover:bg-amber-100 hover:text-amber-700 dark:border-amber-700 dark:text-amber-400 dark:hover:bg-amber-900/40 dark:hover:text-amber-300"
            onClick={handleVerifyEmail}
          >
            Send verification email
          </Button>
        )}
      </div>
    </div>
  );
}
