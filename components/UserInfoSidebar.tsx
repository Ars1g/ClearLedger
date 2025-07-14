"use client";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "@supabase/supabase-js";
import { EllipsisVertical, LogOutIcon, UserIcon } from "lucide-react";
import Link from "next/link";
import { signOutAction } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function UserInfoSidebar({ user }: { user: User }) {
  const { isMobile } = useSidebar();
  const router = useRouter();

  async function handleLogout() {
    const result = await signOutAction();

    if (result.success) {
      toast.success("You have been signed out");
      router.push("/");
    }
    if (result.error) {
      toast.error("Failed to log out");
    }
  }
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton>
              <Avatar>
                <AvatarImage
                  src={user.user_metadata.avatar_url}
                  alt="user avatar"
                />
                <AvatarFallback>
                  {user.email?.toUpperCase().slice(0, 1)}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {user.user_metadata.full_name}
                </span>
                <span className="text-muted-foreground truncate text-xs">
                  {user.email}
                </span>
              </div>
              <EllipsisVertical className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" side={isMobile ? "bottom" : "right"}>
            <DropdownMenuLabel>
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage
                    src={user.user_metadata.avatar_url}
                    alt="user avatar"
                  />
                  <AvatarFallback className="rounded-lg">
                    {user.email?.toUpperCase().slice(0, 1)}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {user.user_metadata.full_name}
                  </span>
                  <span className="text-muted-foreground truncate text-xs">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <Link href="/settings" className="flex items-center gap-2">
                <DropdownMenuItem className="flex-1">
                  <UserIcon />
                  Account
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />

              <Link href="/reports" className="flex items-center gap-2">
                <DropdownMenuItem className="flex-1" onClick={handleLogout}>
                  <LogOutIcon />
                  Log out
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
