"use client";

import { email } from "@/features/authentication/schema";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { useSession } from "@/shared/hooks/use-session";
import { authClient } from "@/shared/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const changeEmailFormSchema = z.object({
  email: email,
});

type ChangeEmailFormFields = z.infer<typeof changeEmailFormSchema>;

export function ChangeEmailForm() {
  const { user } = useSession();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: user.email,
    },
    resolver: zodResolver(changeEmailFormSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const [message, setMessage] = useState("");
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: ChangeEmailFormFields) =>
      await authClient.changeEmail(
        {
          newEmail: values.email,
          callbackURL: "/dashboard/profile",
        },
        {
          onRequest: () => {
            setMessage("");
          },
          onSuccess: () => {
            setMessage(
              "A confirmation email has been sent to your new email address. Please check your inbox to confirm the change.",
            );
          },
          onError: (ctx) => {
            setError("email", {
              type: "custom",
              message:
                ctx.error.message ??
                "Something went wrong, please try again later",
            });
          },
        },
      ),
  });

  const onSubmit: SubmitHandler<ChangeEmailFormFields> = (values) => {
    mutate(values);
  };

  return (
    <div className="space-y-4 rounded-lg border bg-inherit p-8">
      <div className="space-y-0.5">
        <div className="text-lg font-semibold">Update Email</div>
        <p className="text-muted-foreground hidden text-[0.8rem] md:block">
          {"Update your account's profile information."}
        </p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input {...register("email")} id="email" type="email" />
          {errors.email?.message && (
            <p className="text-sm text-red-400">⚠ {errors.email.message}</p>
          )}
          {message !== "" && (
            <p className="text-sm text-green-400">{message}</p>
          )}
        </div>
        {isPending ? (
          <Button type="submit" disabled>
            <Loader2 className="animate-spin" />
            Loading...
          </Button>
        ) : (
          <Button type="submit" disabled={isPending}>
            Submit
          </Button>
        )}
      </form>
    </div>
  );
}
