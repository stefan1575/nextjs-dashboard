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
import { useRouter } from "next/navigation";
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

  const router = useRouter();

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (values: ChangeEmailFormFields) => {
      return await authClient.changeEmail(
        {
          newEmail: values.email,
        },
        {
          onSuccess: () => {
            router.refresh(); // re-render the nav-user component
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
    },
  });

  const onSubmit: SubmitHandler<ChangeEmailFormFields> = (values) => {
    mutate(values);
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
            {isSuccess && (
              <p className="text-sm text-green-400">
                Email changed successfully
              </p>
            )}
          </div>
          {isPending ? (
            <Button type="submit" className="cursor-pointer" disabled>
              <Loader2 className="animate-spin" />
              Loading...
            </Button>
          ) : (
            <Button
              type="submit"
              className="cursor-pointer"
              disabled={isPending}
            >
              Submit
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
