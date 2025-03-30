"use client";

import { email } from "@/features/authentication/schema";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const changeEmailFormSchema = z.object({
  email: email,
});

type ChangeEmailFormFields = z.infer<typeof changeEmailFormSchema>;

export function ChangeEmailForm() {
  const { user } = useSession();
  const form = useForm({
    defaultValues: {
      email: user.email,
    },
    resolver: zodResolver(changeEmailFormSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: ChangeEmailFormFields) => {
      await authClient.changeEmail(
        {
          newEmail: values.email,
          callbackURL: "/dashboard/profile",
        },
        {
          onSuccess: () => {
            const email = user.emailVerified ? user.email : values.email;

            toast.success("Email Change Requested", {
              description: `A confirmation email has been sent to ${email}. Please check your inbox to confirm the change.`,
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
    <div className="space-y-4 rounded-lg border bg-inherit p-8">
      <div className="space-y-0.5">
        <div className="text-lg font-semibold">Update Email</div>
        <p className="text-muted-foreground hidden text-[0.8rem] md:block">
          {"Update your account's profile information."}
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-6 space-y-6">
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
