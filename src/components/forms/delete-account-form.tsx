"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { z } from "zod";

const deleteAccountFormSchema = z.object({
  password: z.string().min(1),
});

type DeletePasswordFormFields = z.infer<typeof deleteAccountFormSchema>;

export function DeleteAccountForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    defaultValues: {
      password: "",
    },
    resolver: zodResolver(deleteAccountFormSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<DeletePasswordFormFields> = async (values) => {
    await authClient.deleteUser(
      {
        password: values.password,
      },
      {
        onSuccess: () => {
          router.push("/login");
        },
        onError: (ctx) => {
          setError("root", {
            type: "custom",
            message:
              ctx.error.message ??
              "Something went wrong, please try again later",
          });
        },
      },
    );
  };

  return (
    <div className="max-w-7xl">
      <div className="p-4 sm:p-8 bg-inherit space-y-2 sm:rounded-lg border">
        <div className="space-y-0.5 pb-2">
          <div className="font-[520]">Delete Account</div>
          <p className="text-[0.8rem] text-muted-foreground">
            {
              "Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain."
            }
          </p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            {isSubmitting ? (
              <Button
                className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150"
                type="button"
                disabled
              >
                <Loader2 className="animate-spin" /> Delete Account
              </Button>
            ) : (
              <Button
                className="inline-flex items-center px-4 py-2 bg-red-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-red-500 active:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition ease-in-out duration-150"
                type="button"
              >
                Delete Account
              </Button>
            )}
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
              <form
                id="delete-account-form"
                className="py-2 space-y-2"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex items-center">
                  <Label htmlFor="password">Current Password</Label>
                </div>
                <div className="flex items-center relative">
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
                    className="absolute bottom-1 right-1 h-7 w-7"
                  >
                    {showPassword ? (
                      <EyeOff className="stroke-gray-500" />
                    ) : (
                      <Eye className="stroke-gray-500" />
                    )}
                    <span className="sr-only">Toggle password visibility</span>
                  </Button>
                </div>
              </form>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                form="delete-account-form"
                type="submit"
                disabled={!isValid}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        {errors.root?.message && (
          <p className="text-red-400 text-sm">⚠ {errors.root.message}</p>
        )}
      </div>
    </div>
  );
}
