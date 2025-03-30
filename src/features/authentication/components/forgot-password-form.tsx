"use client";

import { email } from "@/features/authentication/schema";
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
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const changeEmailFormSchema = z.object({
  email: email,
});

type ChangeEmailFormFields = z.infer<typeof changeEmailFormSchema>;

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm({
    defaultValues: {
      email: "",
    },
    resolver: zodResolver(changeEmailFormSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: ChangeEmailFormFields) => {
      await authClient.forgetPassword(
        {
          email: values.email,
          redirectTo: "/reset-password",
        },
        {
          onSuccess: () => {
            toast.success("Password Reset Email Sent", {
              description:
                "If an account with this email exists, you will receive a password reset link shortly.",
            });
          },
          onError: (ctx) => {
            toast.error("Email Sending Failed", {
              description:
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
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Forgot password</CardTitle>
          <CardDescription>
            {
              "Enter your email address and we'll send you a link to reset your password."
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="m@example.com"
                        type="email"
                        required
                        {...field}
                      />
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
                  Send reset link
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
