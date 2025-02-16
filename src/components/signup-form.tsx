"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { SubmitHandler, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { authClient } from "@/lib/auth-client";
import { SignUpSchema } from "@/lib/auth.schema"
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { useState } from "react"
import { GoogleLogo } from "@/components/icons/google-logo"
import { useRouter } from "next/navigation"


type FormFields = z.infer<typeof SignUpSchema>

export function SignupForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"form">) {
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
    mode: 'onTouched',
    reValidateMode: "onChange"
  })

  const router = useRouter()

  const onSubmit: SubmitHandler<FormFields> = async (values) => {
    await authClient.signUp.email({
      email: values.email,
      name: values.email,
      password: values.password,
    }, {
      onSuccess: () => {
        router.push("/dashboard")
      },
      onError: (ctx) => {
        setError("email", { type: "custom", message: ctx.error.message })
      },
    })
  }

  const [showPassword, setShowPassword] = useState(false)

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create an account</h1>
        <p className="text-balance text-sm text-muted-foreground">
          Please fill in this form to create an account
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            {...register("email")}
            id="email"
            type="email"
            placeholder="m@example.com"
            className=""
            required
          />
          {errors.email?.message && (
            <p className="text-red-400 text-sm">
              ⚠ {errors.email.message}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <div className="flex items-center relative space-x-2">
            <Input
              {...register("password")}
              id="password"
              type={showPassword ? "text" : "password"}
              placeholder="************"
              className="bg-black"
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
            <p className="text-red-400 text-sm">
              ⚠ {errors.password.message}
            </p>
          )}
        </div>
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Loader2 className="animate-spin"
              />
              Loading...
            </>
          ) : (
            "Create an account"
          )}
        </Button>
        <div className="font-bold relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
          <span className="relative z-10 bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
        <Button type="button" variant="outline">
          <GoogleLogo />
          Sign up with Google
        </Button>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link href="/login" className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </form>
  )
}
