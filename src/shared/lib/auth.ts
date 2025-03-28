import { db } from "@/db";
import * as schema from "@/db/schema";
import { sendEmail } from "@/shared/lib/utils";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Confirm Your Account Deletion",
        text: `You have requested to delete your account. To proceed, please confirm by clicking the link below:\n\n${url}\n\nIf you did not request this, please ignore this email.`,
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url }) => {
      await sendEmail({
        to: user.email,
        subject: "Verify your email address",
        text: `Welcome! Please verify your email address by clicking the link below:\n\n${url}\n\nIf you did not sign up, please ignore this email.`,
      });
    },
    sendOnSignUp: true,
    autoSignInAfterVerification: true,
    expiresIn: 3600, // 1 hour
  },
  user: {
    changeEmail: {
      enabled: true,
      sendChangeEmailVerification: async ({ user, url }) => {
        await sendEmail({
          to: user.email,
          subject: "Confirm Your Email Change Request",
          text: `You have requested to change your email address. Please confirm this request by clicking the link below:\n\n${url}\n\nIf you did not request this change, please ignore this email.`,
        });
      },
    },
    deleteUser: {
      enabled: true,
      sendDeleteAccountVerification: async ({ user, url }) => {
        await sendEmail({
          to: user.email,
          subject: "Confirm Your Account Deletion",
          text: `You have requested to delete your account. To proceed, please confirm by clicking the link below:\n\n${url}\n\nIf you did not request this, please ignore this email.`,
        });
      },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      redirectURI: process.env.BETTER_AUTH_URL + "/api/auth/callback/google",
    },
  },
});
