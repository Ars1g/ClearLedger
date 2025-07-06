"use client";

import {
  ChartPieIcon,
  LayoutDashboardIcon,
  ListIcon,
  SettingsIcon,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "./ui/sidebar";
import Logo from "./Logo";
import { User } from "@supabase/supabase-js";
import UserInfoSidebar from "./UserInfoSidebar";

const firstGroup = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboardIcon,
  },
  {
    title: "Transactions",
    url: "/transactions",
    icon: ListIcon,
  },
  {
    title: "Reports",
    url: "/reports",
    icon: ChartPieIcon,
  },
];

const secondGroup = [
  {
    title: "Settings",
    url: "/settings",
    icon: SettingsIcon,
  },
];

export default function AppSidebar({ user }: { user: User }) {
  return (
    <Sidebar>
      <SidebarHeader className="mt-3 px-5">
        <Logo />
      </SidebarHeader>
      <SidebarContent className="mt-10">
        <SidebarGroup>
          {/* <SidebarGroupLabel>ClearLedger</SidebarGroupLabel> */}
          <SidebarGroupContent>
            <SidebarMenu>
              {firstGroup.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarSeparator className="my-4" />
              {secondGroup.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <UserInfoSidebar user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}

{
  /* <Button onClick={signOut}>Sign out</Button> */
}
