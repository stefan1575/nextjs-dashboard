"use client";

import { password } from "../schema";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { authClient } from "@/shared/lib/auth-client";
import { cn } from "@/shared/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const resetPasswordFormSchema = z
  .object({
    password: password,
    confirmPassword: password,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type ResetPasswordFormFields = z.infer<typeof resetPasswordFormSchema>;

type ResetPasswordFormProps = {
  token: string;
  className?: string;
};

export function ResetPasswordForm({
  token,
  className,
  ...props
}: ResetPasswordFormProps) {
  const form = useForm({
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
    resolver: zodResolver(resetPasswordFormSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: ResetPasswordFormFields) => {
      await authClient.resetPassword(
        {
          newPassword: values.password,
          token,
        },
        {
          onSuccess: () => {
            router.replace("/login");
          },
          onError: (ctx) => {
            toast.error("Password Reset Failed", {
              description:
                ctx.error.message ??
                "Something went wrong, please try again later",
            });
          },
        },
      );
    },
  });

  const onSubmit: SubmitHandler<ResetPasswordFormFields> = (values) => {
    mutate(values);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Reset password</CardTitle>
          <CardDescription>
            Create a new password for your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <Input
                          type={showPassword ? "text" : "password"}
                          required
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-1 bottom-1 h-7 w-7"
                        >
                          {showPassword ? (
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
                    <p className="text-muted-foreground text-xs">
                      Must be at least 8 characters long
                    </p>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <div className="relative flex items-center">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          required
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          className="absolute right-1 bottom-1 h-7 w-7"
                        >
                          {showConfirmPassword ? (
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
                <Button type="submit" className="w-full" disabled>
                  <Loader2 className="animate-spin" />
                  Loading...
                </Button>
              ) : (
                <Button type="submit" className="w-full" disabled={isPending}>
                  Reset password
                </Button>
              )}
            </form>
          </Form>
        </CardContent>
        <CardFooter>
          <div className="text-muted-foreground text-sm">
            Remember your password?{" "}
            <Link
              href="/login"
              className="text-primary hover:text-primary/90 underline underline-offset-4"
            >
              Back to login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
