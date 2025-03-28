import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type sendEmail = {
  to: string;
  subject: string;
  text: string;
};

export async function sendEmail({ to, subject, text }: sendEmail) {
  try {
    await fetch(process.env.BETTER_AUTH_URL! + "/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        to,
        subject,
        text,
      }),
    });
  } catch {
    throw Error("Error sending email");
  }
}
