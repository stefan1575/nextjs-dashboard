"use server";

import { SetPasswordFormFields } from "@/features/profile/components/set-password-form";
import { auth } from "@/shared/lib/auth";
import { headers } from "next/headers";

export async function setPassword(values: SetPasswordFormFields) {
  await auth.api.setPassword({
    headers: await headers(),
    body: { newPassword: values.password },
  });
}
