import { NavUser } from "./navbar/nav-user";
import { NavNotification } from "@/components/navbar/nav-notification";
import { NavPath } from "@/components/navbar/nav-path";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";

type AppNavbarProps = {
  user: typeof auth.$Infer.Session.user;
};

export function AppNavbar({ user }: AppNavbarProps) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 border-b justify-between">
      <div className="flex items-center gap-2 px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <NavPath />
      </div>
      <div className="flex items-center justify-center gap-2 pr-4">
        <NavNotification />
        <NavUser user={user} />
      </div>
    </header>
  );
}
