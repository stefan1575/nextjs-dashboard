"use client"

import {
  Bot,
  Cable,
  CalendarDays,
  CalendarSync,
  Contact,
  LayoutDashboard,
  MessageCircle,
  Network,
  Send,
  Settings,
} from "lucide-react"
import { SidebarContentGroup } from "@/components/sidebar/sidebar-main"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { auth } from "@/lib/auth"
import { SidebarLogo } from "@/components/sidebar/sidebar-logo"
import Link from "next/link"

const data = {
  planning: [
    {
      title: "Dashboard",
      url: "#",
      icon: LayoutDashboard,
    },
    {
      title: "Conversations",
      url: "#",
      icon: MessageCircle,
    },
    {
      title: "Contacts",
      url: "#",
      icon: Contact,
    },
    {
      title: "Calendar",
      url: "#",
      icon: CalendarDays,
    },
  ],
  automations: [
    {
      title: "Workflows",
      url: "#",
      icon: Network,
    },
    {
      title: "Scheduler",
      url: "#",
      icon: CalendarSync,
    },
    {
      title: "Email",
      url: "#",
      icon: Send,
    },
    {
      title: "Conversation Bot",
      url: "#",
      icon: Bot,
    },
    {
      title: "Integrations",
      url: "#",
      icon: Cable,
    },
  ],

}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  session: typeof auth.$Infer.Session
}

export function AppSidebar({ ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        {/* Placeholder Logo */}
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarContentGroup title="Planning" items={data.planning} />
        <SidebarContentGroup title="Automations" items={data.automations} />
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
              asChild
            >
              <Link href="#">
                <Settings /> Settings
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
