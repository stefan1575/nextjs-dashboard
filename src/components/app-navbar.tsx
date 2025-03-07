import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { NavNotification } from "@/components/navbar/nav-notification"
import { NavUser } from "@/components/navbar/nav-user"
import { auth } from "@/lib/auth"
import { NavPath } from "./navbar/nav-path"

type AppNavbarProps = {
  user: typeof auth.$Infer.Session.user
}

export function AppNavbar({ user }: AppNavbarProps) {
  return (
    <header className="flex h-14 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b justify-between">
      <div className="flex items-center gap-2 ml-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <NavPath />
      </div>
      <div className="pr-4 flex items-center justify-center gap-2">
        <NavNotification />
        <NavUser user={user} />
      </div>
    </header>
  )
}