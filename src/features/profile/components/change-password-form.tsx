"use client";

import { password } from "@/features/authentication/schema";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { authClient } from "@/shared/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const changePasswordFormSchema = z.object({
  oldPassword: z.string(),
  newPassword: password,
});

type ChangePasswordFormFields = z.infer<typeof changePasswordFormSchema>;

export function ChangePasswordForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    watch,
  } = useForm({
    defaultValues: {
      oldPassword: "",
      newPassword: "",
    },
    resolver: zodResolver(changePasswordFormSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [oldPassword, newPassword] = watch(["oldPassword", "newPassword"]);

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: async (values: ChangePasswordFormFields) => {
      return authClient.changePassword({
        newPassword: values.newPassword,
        currentPassword: values.oldPassword,
        revokeOtherSessions: true,
      });
    },
    onError: (error) => {
      setError("root", {
        type: "custom",
        message:
          error.message ?? "Something went wrong, please try again later",
      });
    },
  });

  const onSubmit: SubmitHandler<ChangePasswordFormFields> = (values) => {
    mutate(values);
  };

  return (
    <div className="max-w-7xl">
      <div className="space-y-4 rounded-lg border bg-inherit p-8">
        <div className="space-y-0.5">
          <div className="text-lg font-semibold">Update Password</div>
          <p className="text-muted-foreground text-[0.8rem]">
            {
              "Ensure your account is using a long, random password to stay secure."
            }
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-6">
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Current Password</Label>
            </div>
            <div className="relative flex items-center">
              <Input
                {...register("oldPassword")}
                id="oldPassword"
                className=""
                type={showOldPassword ? "text" : "password"}
                placeholder="************"
                required={newPassword !== ""}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute right-1 bottom-1 h-7 w-7 cursor-pointer"
              >
                {showOldPassword ? <EyeOff /> : <Eye />}
                <span className="sr-only">Toggle password visibility</span>
              </Button>
            </div>
            {errors.oldPassword?.message && (
              <p className="text-sm text-red-400">
                ⚠ {errors.oldPassword.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">New Password</Label>
            </div>
            <div className="relative flex items-center">
              <Input
                {...register("newPassword")}
                id="newPassword"
                className=""
                type={showNewPassword ? "text" : "password"}
                placeholder="************"
                required={oldPassword !== ""}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-1 bottom-1 h-7 w-7 cursor-pointer"
              >
                {showNewPassword ? <EyeOff /> : <Eye />}
                <span className="sr-only">Toggle password visibility</span>
              </Button>
            </div>
            {errors.newPassword?.message && (
              <p className="text-sm text-red-400">
                ⚠ {errors.newPassword.message}
              </p>
            )}
            {errors.root?.message && (
              <p className="text-sm text-red-400">⚠ {errors.root.message}</p>
            )}
            {isSuccess && (
              <p className="text-sm text-green-400">
                Password changed successfully
              </p>
            )}
          </div>
          {isPending ? (
            <Button className="cursor-pointer" type="submit" disabled>
              <Loader2 className="animate-spin" />
              Loading...
            </Button>
          ) : (
            <Button
              className="cursor-pointer"
              type="submit"
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
