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

export function LinkGoogleCard() {
  const { data, isPending } = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const accounts = await authClient.listAccounts();
      return accounts;
    },
  });

  const { mutate: linkGoogleAccount, isPending: isLinking } = useMutation({
    mutationFn: async () => {
      await authClient.linkSocial({
        provider: "google",
        callbackURL: "/dashboard/profile",
      });
    },
  });

  const googleAccount = data?.data?.find(
    (account) => account.provider === "google",
  );

  const { mutate: unlinkGoogleAccount, isPending: isUnlinking } = useMutation({
    mutationFn: async () => {
      await authClient.unlinkAccount({
        providerId: "google",
        accountId: googleAccount!.accountId,
      });
    },
  });

  function handleLinkGoogleAccount() {
    linkGoogleAccount();
  }

  function handleUnlinkGoogleAccount() {
    unlinkGoogleAccount();
  }

  return (
    <Card className="bg-inherit px-2 py-8">
      <CardHeader className="flex flex-col space-y-0.5">
        <CardTitle className="text-lg font-semibold">Providers</CardTitle>
        <CardDescription className="text-muted-foreground hidden text-[0.8rem] md:block">
          Connect your account with a third-party service.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isPending ? (
          <Card className="flex animate-pulse flex-row items-center justify-between px-6 py-10"></Card>
        ) : (
          <Card className="flex flex-row items-center justify-between bg-inherit p-6">
            <div className="flex flex-row items-center gap-2">
              <GoogleLogo className="size-6" />
              <span className="text">Google</span>
            </div>
            {googleAccount ? (
              <SubmitButton
                isLoading={isUnlinking}
                onClick={() => handleUnlinkGoogleAccount()}
              >
                Unlink
              </SubmitButton>
            ) : (
              <SubmitButton
                isLoading={isLinking}
                onClick={() => handleLinkGoogleAccount()}
              >
                Link
              </SubmitButton>
            )}
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
