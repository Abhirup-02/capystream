"use client"

import { useSidebar } from "@/store/useSidebar"
import { Follow, User } from "@prisma/client"
import { UserItem, UserItemSkeleton } from "./user-item"

interface FollowingProps {
    data: (Follow & {
        following: User & {
            stream: { isLive: boolean } | null
        }
    })[]
}

export function Following({ data }: FollowingProps) {

    const { collapsed } = useSidebar((state) => state)

    if (!data.length) {
        return null
    }

    return (
        <>
            {!collapsed && (
                <div className="pl-6 mb-4">
                    <p className="text-sm text-muted-foreground">
                        Following
                    </p>
                </div>
            )}
            <ul className="space-y-2 px-2">
                {data.map((follow) => (
                    <UserItem
                        key={follow.following.id}
                        username={follow.following.username}
                        imageURL={follow.following.imageURL}
                        isLive={follow.following.stream?.isLive}
                    />
                ))}
            </ul>
        </>
    )
}

export function FollowingSkeleton() {
    return (
        <ul className="px-2 pt-2 lg:pt-0">
            {[...Array(3)].map((_, i) => (
                <UserItemSkeleton key={i} />
            ))}
        </ul>
    )
}
