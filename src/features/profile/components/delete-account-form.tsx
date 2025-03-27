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
} from "@/shared/components/ui/alert-dialog";
import { Button } from "@/shared/components/ui/button";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { authClient } from "@/shared/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
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
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      password: "",
    },
    resolver: zodResolver(deleteAccountFormSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter();

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: DeletePasswordFormFields) => {
      return authClient.deleteUser({
        password: values.password,
      });
    },
    onSuccess: () => {
      router.push("/login");
    },
    onError: (error) => {
      setError("root", {
        type: "custom",
        message:
          error.message ?? "Something went wrong, please try again later",
      });
    },
  });

  const onSubmit: SubmitHandler<DeletePasswordFormFields> = (values) => {
    mutate(values);
  };

  return (
    <div className="max-w-7xl">
      <div className="space-y-4 rounded-lg border bg-inherit p-8">
        <div className="space-y-0.5">
          <div className="text-lg font-semibold">Delete Account</div>
          <p className="text-muted-foreground text-[0.8rem]">
            {
              "Once your account is deleted, all of its resources and data will be permanently deleted. Before deleting your account, please download any data or information that you wish to retain."
            }
          </p>
        </div>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            {isPending ? (
              <Button
                className="cursor-pointer text-xs font-semibold tracking-widest"
                variant="destructive"
                type="button"
                disabled
              >
                <Loader2 className="animate-spin" /> Loading...
              </Button>
            ) : (
              <Button
                className="cursor-pointer text-xs font-semibold tracking-widest"
                variant="destructive"
                type="button"
              >
                DELETE ACCOUNT
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
                className="space-y-2 py-2"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="flex items-center">
                  <Label htmlFor="password">Current Password</Label>
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
                    className="absolute right-1 bottom-1 h-7 w-7"
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
          <p className="text-sm text-red-400">⚠ {errors.root.message}</p>
        )}
      </div>
    </div>
  );
}
