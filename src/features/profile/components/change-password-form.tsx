"use client";

import { password } from "@/features/authentication/schema";
import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { useSession } from "@/shared/hooks/use-session";
import { authClient } from "@/shared/lib/auth-client";
import { sendEmail } from "@/shared/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const changePasswordFormSchema = z
  .object({
    oldPassword: z.string(),
    newPassword: password,
  })
  .refine((data) => data.oldPassword !== data.newPassword, {
    message:
      "New password must be different from the one you entered as your current password.",
    path: ["newPassword"],
  });

type ChangePasswordFormFields = z.infer<typeof changePasswordFormSchema>;

export function ChangePasswordForm() {
  const { user } = useSession();

  const form = useForm({
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

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: ChangePasswordFormFields) => {
      await authClient.changePassword(
        {
          newPassword: values.newPassword,
          currentPassword: values.oldPassword,
          revokeOtherSessions: true,
        },
        {
          onSuccess: async () => {
            toast.success("Password Updated Successfully", {
              description:
                "Your password has been changed. Please use your new password to log in next time.",
            });

            await sendEmail({
              to: user.email,
              subject: "Your Password Has Been Changed",
              text: `Your password has been successfully changed.\n\nIf you did not request this change, you can reset your password using the link below:\n\n${process.env.NEXT_PUBLIC_URL! + "/forgot-password"}\n\n.`,
            });
          },
          onError: (ctx) => {
            toast.error("Password Update Failed", {
              description:
                ctx.error.message ??
                "Something went wrong, please try again later.",
            });
          },
        },
      );
    },
  });

  const onSubmit: SubmitHandler<ChangePasswordFormFields> = (values) => {
    mutate(values);
  };

  return (
    <div className="space-y-4 rounded-lg border bg-inherit p-8">
      <div className="space-y-0.5">
        <div className="text-lg font-semibold">Update Password</div>
        <p className="text-muted-foreground hidden text-[0.8rem] md:block">
          {
            "Ensure your account is using a long, random password to stay secure."
          }
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-6">
          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Current Password</FormLabel>
                <FormControl>
                  <div className="relative flex items-center">
                    <Input
                      type={showOldPassword ? "text" : "password"}
                      placeholder="Current Password"
                      required
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      className="absolute right-1 bottom-1 h-7 w-7"
                    >
                      {showOldPassword ? (
                        <EyeOff className="stroke-gray-500" />
                      ) : (
                        <Eye className="stroke-gray-500" />
                      )}
                      <span className="sr-only">
                        Toggle password visibility
                      </span>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New Password</FormLabel>
                <FormControl>
                  <div className="relative flex items-center">
                    <Input
                      type={showNewPassword ? "text" : "password"}
                      placeholder="New Password"
                      required
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-1 bottom-1 h-7 w-7"
                    >
                      {showNewPassword ? (
                        <EyeOff className="stroke-gray-500" />
                      ) : (
                        <Eye className="stroke-gray-500" />
                      )}
                      <span className="sr-only">
                        Toggle password visibility
                      </span>
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
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
      </Form>
    </div>
  );
}
