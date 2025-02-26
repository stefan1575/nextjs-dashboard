"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { authClient } from "@/lib/auth-client";
import { LoginSchema } from "@/lib/auth.schema"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { GoogleButton } from "@/components/google-button"

type FormFields = z.infer<typeof LoginSchema>

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
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
    resolver: zodResolver(LoginSchema),
    mode: 'onTouched',
    reValidateMode: "onChange"
  })

  const router = useRouter()

  const onSubmit: SubmitHandler<FormFields> = async (values) => {
    await authClient.signIn.email({
      email: values.email,
      password: values.password,
    }, {
      onSuccess: () => {
        router.replace("/dashboard")
      },
      onError: (ctx) => {
        setError("password", { type: "custom", message: ctx.error.message })
      },
    })
  }

  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} >
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
                {errors.email?.message && (
                  <p className="text-red-400 text-sm">⚠ {errors.email.message}</p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <div className="flex items-center relative space-x-2">
                  <Input
                    {...register("password")}
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="************"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute bottom-1 right-1 h-7 w-7"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                    <span className="sr-only">Toggle password visibility</span>
                  </Button>
                </div>
                {errors.password?.message && (
                  <p className="text-red-400 text-sm">⚠ {errors.password.message}</p>
                )}
              </div>
              {isSubmitting ? (
                <Button type="submit" className="w-full" disabled>
                  <Loader2 className="animate-spin" />
                  Loading...
                </Button>
              ) : (
                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  Login
                </Button>
              )}
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <GoogleButton>Sign in with Google</GoogleButton>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
