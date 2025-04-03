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
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const deleteAccountFormSchema = z.object({
  password: z.string().min(1),
});

type DeletePasswordFormFields = z.infer<typeof deleteAccountFormSchema>;

export function DeleteAccountForm() {
  const form = useForm({
    defaultValues: {
      password: "",
    },
    resolver: zodResolver(deleteAccountFormSchema),
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: DeletePasswordFormFields) => {
      await authClient.deleteUser(
        {
          password: values.password,
        },
        {
          onSuccess: () => {
            toast.success("Account Deletion Requested", {
              description:
                "A confirmation email has been sent. Please check your inbox to proceed with account deletion.",
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

  const onSubmit: SubmitHandler<DeletePasswordFormFields> = (values) => {
    mutate(values);
  };

  return (
    <Card className="border-destructive bg-inherit px-2 py-8">
      <CardHeader className="flex flex-col gap-0.5">
        <CardTitle className="text-destructive text-lg font-semibold">
          Delete Account{" "}
        </CardTitle>
        <CardDescription className="text-muted-foreground hidden text-[0.8rem] md:block">
          {
            "Once you delete your account, there is no going back. Please be certain."
          }
        </CardDescription>
      </CardHeader>
      <CardContent>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            {isPending ? (
              <Button
                className="font-semibold"
                variant="destructive"
                type="button"
                disabled
              >
                <Loader2 className="animate-spin" /> Loading...
              </Button>
            ) : (
              <Button
                className="font-semibold"
                variant="destructive"
                type="button"
              >
                Delete your account
              </Button>
            )}
          </AlertDialogTrigger>
          <AlertDialogContent className="border-destructive">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-destructive">
                Are you absolutely sure?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
              <Form {...form}>
                <form
                  id="delete-account-form"
                  className="space-y-2 py-2"
                  onSubmit={form.handleSubmit(onSubmit)}
                >
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Current Password</FormLabel>
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
                </form>
              </Form>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                form="delete-account-form"
                type="submit"
                disabled={!form.formState.isValid}
              >
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardContent>
    </Card>
  );
}
