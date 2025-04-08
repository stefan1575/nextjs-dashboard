"use client";

import { SidebarLogo } from "@/features/dashboard/components/sidebar/sidebar-logo";
import { SidebarMain } from "@/features/dashboard/components/sidebar/sidebar-main";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/shared/components/ui/sidebar";
import { Bot } from "lucide-react";
import * as React from "react";

const data = {
  main: [
    {
      title: "Chat",
      url: "/dashboard/chat",
      icon: Bot,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarLogo />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMain items={data.main} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
