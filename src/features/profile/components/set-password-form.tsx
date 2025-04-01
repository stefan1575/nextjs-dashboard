"use client";

import { password } from "@/features/authentication/schema";
import { SubmitButton } from "@/shared/components/submit-button";
import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { setPassword } from "@/shared/lib/server";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const setPasswordFormSchema = z.object({
  password,
});

export type SetPasswordFormFields = z.infer<typeof setPasswordFormSchema>;

export function SetPasswordForm() {
  const { data, isLoading } = useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const accounts = await authClient.listAccounts();
      return accounts;
    },
  });

  const form = useForm({
    defaultValues: {
      password: "",
    },
    resolver: zodResolver(setPasswordFormSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: SetPasswordFormFields) => {
      setPassword(values);
    },
  });
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<SetPasswordFormFields> = (values) => {
    mutate(values);
  };

  const credentialAccount = data?.data?.find(
    (account) => account.provider === "credential",
  );

  if (credentialAccount || isLoading) {
    return null;
  }

  return (
    <Card className="bg-inherit px-2 py-8">
      <CardHeader className="flex flex-col">
        <CardTitle className="text-lg font-semibold">Set Password</CardTitle>
        <CardDescription className="text-muted-foreground hidden text-[0.8rem] md:block">
          Set a new password for your account.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Set Password</FormLabel>
                  <FormControl>
                    <div className="relative flex items-center">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Set Password"
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
                </FormItem>
              )}
            />
            <SubmitButton isLoading={isPending} type="submit">
              Submit
            </SubmitButton>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
