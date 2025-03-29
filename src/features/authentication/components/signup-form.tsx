"use client";

import { GoogleButton } from "@/features/authentication/components/google-button";
import { SignUpSchema } from "@/features/authentication/schema";
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
import { authClient } from "@/shared/lib/auth-client";
import { cn } from "@/shared/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type FormFields = z.infer<typeof SignUpSchema>;

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(SignUpSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: FormFields) =>
      authClient.signUp.email(
        {
          name: values.email.split("@")[0],
          email: values.email,
          password: values.password,
        },
        {
          onSuccess: () => {
            router.replace("/dashboard");
          },
          onError: (ctx) => {
            form.setError("email", {
              type: "custom",
              message: ctx.error.message,
            });
          },
        },
      ),
  });

  const onSubmit: SubmitHandler<FormFields> = async (values) => {
    mutate(values);
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Create an account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Please fill in this form to create an account
          </p>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-3">
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
          </div>
          <div className="grid gap-3">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center">
                    <FormLabel>Password</FormLabel>
                    <a
                      href="#"
                      className="ml-auto text-sm underline-offset-4 hover:underline"
                    >
                      Forgot your password?
                    </a>
                  </div>
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
                </FormItem>
              )}
            />
          </div>
          {isPending ? (
            <Button type="submit" className="w-full" disabled>
              <Loader2 className="animate-spin" />
              Loading...
            </Button>
          ) : (
            <Button type="submit" className="w-full" disabled={isPending}>
              Create an account
            </Button>
          )}
          <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
            <span className="bg-background text-muted-foreground relative z-10 px-2">
              Or continue with
            </span>
          </div>
          <GoogleButton>Sign up with Google</GoogleButton>
        </div>
        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link href="/login" className="underline underline-offset-4">
            Login
          </Link>
        </div>
        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          By clicking continue, you agree to our{" "}
          <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>.
        </div>
      </form>
    </Form>
  );
}
