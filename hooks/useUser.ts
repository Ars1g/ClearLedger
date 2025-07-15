"use client";
import { getUserSession } from "@/lib/server-data-service";
import { useQuery } from "@tanstack/react-query";

export function useUser() {
  const {
    data: user,
    error,
    isPending,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getUserSession,
  });

  return { user, error, isPending };
}
// TODO: didn't use it anywhere
