"use client";

import { GoogleButton } from "@/components/google-button";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { SignUpSchema } from "@/lib/auth-schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
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
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(SignUpSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const router = useRouter();

  const onSubmit: SubmitHandler<FormFields> = async (values) => {
    await authClient.signUp.email(
      {
        email: values.email,
        name: values.email,
        password: values.password,
      },
      {
        onSuccess: () => {
          router.replace("/dashboard");
        },
        onError: (ctx) => {
          setError("email", { type: "custom", message: ctx.error.message });
        },
      },
    );
  };

  const [showPassword, setShowPassword] = useState(false);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="m@example.com"
            required
          />
          {errors.email?.message && (
            <p className="text-sm text-red-400">⚠ {errors.email.message}</p>
          )}
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <div className="relative flex items-center">
            <Input
              {...register("password")}
              id="password"
              type={showPassword ? "text" : "password"}
              required
            />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-1 bottom-1 h-7 w-7 cursor-pointer"
            >
              {showPassword ? (
                <EyeOff className="stroke-gray-500" />
              ) : (
                <Eye className="stroke-gray-500" />
              )}
              <span className="sr-only">Toggle password visibility</span>
            </Button>
          </div>
          {errors.password?.message && (
            <p className="text-sm text-red-400">⚠ {errors.password.message}</p>
          )}
        </div>
        {isSubmitting ? (
          <Button type="submit" className="w-full cursor-pointer" disabled>
            <Loader2 className="animate-spin" />
            Loading...
          </Button>
        ) : (
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={isSubmitting}
          >
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
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </form>
  );
}
