import { NavNotification } from "@/features/dashboard/components/navbar/nav-notification";
import { NavPath } from "@/features/dashboard/components/navbar/nav-path";
import { NavUser } from "@/features/dashboard/components/navbar/nav-user";
import { Separator } from "@/shared/components/ui/separator";
import { SidebarTrigger } from "@/shared/components/ui/sidebar";

export function AppNavbar() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
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
        <NavUser />
      </div>
    </header>
  );
}
