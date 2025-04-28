"use client";

import { GoogleLogo } from "@/shared/components/google-logo";
import { SubmitButton } from "@/shared/components/submit-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { authClient } from "@/shared/lib/auth-client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export function LinkGoogleCard() {
  const { data } = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const accounts = await authClient.listAccounts();
      return accounts;
    },
  });

  const queryClient = useQueryClient();

  const { mutate: linkGoogleAccount, isPending: isLinking } = useMutation({
    mutationFn: async () => {
      await authClient.linkSocial({
        provider: "google",
        callbackURL: "/dashboard/profile",
      });
    },
  });

  const { mutate: unlinkGoogleAccount, isPending: isUnlinking } = useMutation({
    mutationFn: async () => {
      await authClient.unlinkAccount(
        {
          providerId: "google",
        },
        {
          onSuccess: () => {
            toast.success("Google Account Unlinked", {
              description:
                "Your Google account has been successfully unlinked.",
            });

            queryClient.invalidateQueries({ queryKey: ["accounts"] });
          },
          onError: async (ctx) => {
            toast.error("Google Account Unlinking Failed", {
              description:
                ctx.error.message ??
                "Something went wrong, please try again later",
            });
          },
        },
      );
    },
  });

  const googleAccount = data?.data?.find(
    (account) => account.provider === "google",
  );

  const credentialAccount = data?.data?.find(
    (account) => account.provider === "credential",
  );

  function handleLinkGoogleAccount() {
    linkGoogleAccount();
  }

  function handleUnlinkGoogleAccount() {
    unlinkGoogleAccount();
  }

  return (
    <Card className="bg-inherit px-0 py-6 md:px-2 md:py-8">
      <CardHeader className="flex flex-col gap-0.5">
        <CardTitle className="text-lg font-semibold">Providers</CardTitle>
        <CardDescription className="text-muted-foreground hidden text-[0.8rem] md:block">
          Connect your account with a third-party service.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Card className="flex flex-row items-center justify-between bg-inherit p-6">
          <div className="flex flex-row items-center gap-2">
            <GoogleLogo className="size-6" />
            <span className="font-semibold">Google</span>
          </div>
          {!googleAccount ? (
            <SubmitButton
              type="button"
              isLoading={isLinking}
              onClick={handleLinkGoogleAccount}
            >
              Link
            </SubmitButton>
          ) : (
            <SubmitButton
              type="button"
              isLoading={isUnlinking}
              disabled={!credentialAccount}
              onClick={handleUnlinkGoogleAccount}
            >
              Unlink
            </SubmitButton>
          )}
        </Card>
      </CardContent>
    </Card>
  );
}
