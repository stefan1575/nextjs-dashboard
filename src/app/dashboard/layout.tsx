import { AppNavbar } from "@/features/dashboard/components/app-navbar";
import { AppSidebar } from "@/features/dashboard/components/app-sidebar";
import { SessionProvider } from "@/features/dashboard/components/session-provider";
import { SidebarInset, SidebarProvider } from "@/shared/components/ui/sidebar";
import { auth } from "@/shared/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect("/login");
  }

  return (
    <SessionProvider session={session}>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <AppNavbar />
          <div className="flex flex-1 flex-col gap-4 p-4">
            <Suspense fallback={<DashboardSkeleton />}>{children}</Suspense>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </SessionProvider>
  );
}

function DashboardSkeleton() {
  return (
    <>
      <div className="grid animate-pulse auto-rows-min gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video animate-pulse rounded-xl" />
        <div className="bg-muted/50 aspect-video animate-pulse rounded-xl" />
        <div className="bg-muted/50 aspect-video animate-pulse rounded-xl" />
      </div>
      <div className="bg-muted/50 min-h-[100vh] flex-1 animate-pulse rounded-xl md:min-h-min" />
    </>
  );
}
