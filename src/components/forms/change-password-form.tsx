"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { password } from "@/lib/auth-schema";
import { zodResolver } from "@hookform/resolvers/zod";
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
    formState: { errors, isSubmitting },
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
  const [message, setMessage] = useState("");

  const onSubmit: SubmitHandler<ChangePasswordFormFields> = async (values) => {
    setMessage("");

    await authClient.changePassword(
      {
        newPassword: values.newPassword,
        currentPassword: values.oldPassword,
        revokeOtherSessions: true, // revoke all other sessions the user is signed into
      },
      {
        onSuccess: () => {
          setMessage("Password changed successfully");
        },
        onError: (ctx) => {
          setError("root", {
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
      <div className="p-8 bg-inherit space-y-4 rounded-lg border">
        <div className="space-y-0.5">
          <div className="text-lg font-semibold">Update Password</div>
          <p className="text-[0.8rem] text-muted-foreground">
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
            <div className="flex items-center relative">
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
                className="absolute bottom-1 right-1 h-7 w-7"
              >
                {showOldPassword ? <EyeOff /> : <Eye />}
                <span className="sr-only">Toggle password visibility</span>
              </Button>
            </div>
            {errors.oldPassword?.message && (
              <p className="text-red-400 text-sm">
                ⚠ {errors.oldPassword.message}
              </p>
            )}
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">New Password</Label>
            </div>
            <div className="flex items-center relative">
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
                className="absolute bottom-1 right-1 h-7 w-7"
              >
                {showNewPassword ? <EyeOff /> : <Eye />}
                <span className="sr-only">Toggle password visibility</span>
              </Button>
            </div>
            {errors.newPassword?.message && (
              <p className="text-red-400 text-sm">
                ⚠ {errors.newPassword.message}
              </p>
            )}
            {errors.root?.message && (
              <p className="text-red-400 text-sm">⚠ {errors.root.message}</p>
            )}
            {message !== "" && (
              <p className="text-green-400 text-sm">{message}</p>
            )}
          </div>
          {isSubmitting ? (
            <Button type="submit" disabled>
              <Loader2 className="animate-spin" />
              Loading...
            </Button>
          ) : (
            <Button type="submit" disabled={isSubmitting}>
              Submit
            </Button>
          )}
        </form>
      </div>
    </div>
  );
}
