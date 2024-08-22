"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LiveBadge } from "@/components/live-badge";
import { UserAvatar } from "@/components/user-avatar";
import { useSidebar } from "@/store/useSidebar";
import { Skeleton } from "@/components/ui/skeleton";

interface UserItemProps {
    username: string;
    imageURL: string;
    isLive?: boolean;
}

export function UserItem({ username, imageURL, isLive }: UserItemProps) {

    const pathname = usePathname()

    const { collapsed } = useSidebar((state) => state)

    const href = `/${username}`
    const isActive = pathname === href

    return (
        <Button
            asChild
            variant="ghost"
            className={cn(
                "w-full h-14",
                collapsed ? "justify-center" : "justify-start",
                isActive && "bg-accent"
            )}
        >
            <Link href={href}>
                <div className={cn(
                    "flex items-center w-full gap-x-4",
                    collapsed && "justify-center"
                )}>
                    <UserAvatar
                        imageURL={imageURL}
                        username={username}
                        isLive={isLive}
                        showBadge={collapsed}
                    />
                    {!collapsed && (
                        <p className="truncate">
                            {username}
                        </p>
                    )}
                    {!collapsed && isLive && (
                        <LiveBadge classname="ml-auto" />
                    )}
                </div>
            </Link>
        </Button>
    )
}

export function UserItemSkeleton() {
    return (
        <li className="flex items-center gap-x-4 px-3 py-2">
            <Skeleton className="min-h-[32px] min-w-[32px] rounded-full" />
            <div className="flex-1">
                <Skeleton className="h-6" />
            </div>
        </li>
    )
}
