"use client";

import { GoogleButton } from "@/features/authentication/components/google-button";
import { LoginSchema } from "@/features/authentication/schema";
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
import { cn } from "@/shared/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

type FormFields = z.infer<typeof LoginSchema>;

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(LoginSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: FormFields) => {
      return authClient.signIn.email(
        {
          email: values.email,
          password: values.password,
        },
        {
          onSuccess: () => {
            router.replace("/dashboard");
          },
          onError: (ctx) => {
            form.setError("password", {
              type: "custom",
              message: ctx.error.message,
            });
          },
        },
      );
    },
  });

  const onSubmit: SubmitHandler<FormFields> = (values) => {
    mutate(values);
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your email and password</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid gap-6">
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
                {isPending ? (
                  <Button type="submit" className="w-full" disabled>
                    <Loader2 className="animate-spin" />
                    Loading...
                  </Button>
                ) : (
                  <Button type="submit" className="w-full" disabled={isPending}>
                    Login
                  </Button>
                )}
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <div className="flex flex-col gap-4">
                  <GoogleButton>Login with Google</GoogleButton>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <Link href="/" className="underline underline-offset-4">
                    Sign up
                  </Link>
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
