"use client";

import { Button } from "../ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { email } from "@/lib/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const changeEmailFormSchema = z.object({
  email: email,
});

type ChangeEmailFormFields = z.infer<typeof changeEmailFormSchema>;

type ChangeEmailFormProps = {
  user: typeof auth.$Infer.Session.user;
};

export function ChangeEmailForm({ user }: ChangeEmailFormProps) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: user.email,
    },
    resolver: zodResolver(changeEmailFormSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const router = useRouter();

  const [message, setMessage] = useState("");

  const onSubmit: SubmitHandler<ChangeEmailFormFields> = async (values) => {
    setMessage("");

    await authClient.changeEmail(
      {
        newEmail: values.email,
      },
      {
        onSuccess: () => {
          setMessage("Email changed successfully");
          router.refresh();
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
    );
  };

  return (
    <div className="max-w-7xl">
      <div className="space-y-4 rounded-lg border bg-inherit p-8">
        <div className="space-y-0.5">
          <div className="text-lg font-semibold">Update Email</div>
          <p className="text-muted-foreground text-[0.8rem]">
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
              <p className="text-sm text-green-400">⚠ {message}</p>
            )}
          </div>
          {isSubmitting ? (
            <Button type="submit" className="cursor-pointer" disabled>
              <Loader2 className="animate-spin" />
              Loading...
            </Button>
          ) : (
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={isSubmitting}
            >
              Submit
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
