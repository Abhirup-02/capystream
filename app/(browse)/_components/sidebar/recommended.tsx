"use client"

import { useSidebar } from "@/store/useSidebar"
import { User } from "@prisma/client"
import { UserItem, UserItemSkeleton } from "./user-item"

interface RecommendedProps {
    data: (User & {
        stream: { isLive: boolean } | null
    })[]
}

export function Recommended({ data }: RecommendedProps) {

    const { collapsed } = useSidebar((state) => state)

    const showLabel = !collapsed && data.length > 0

    return (
        <>
            {showLabel && (
                <div className="pl-6 mb-4">
                    <p className="text-sm text-muted-foreground">
                        Recommended
                    </p>
                </div>
            )}

            <ul className="space-y-2 px-2">
                {data.map((user) => (
                    <div key={user.id}>
                        <UserItem
                            key={user.id}
                            username={user.username}
                            imageURL={user.imageURL}
                            isLive={user.stream?.isLive}
                        />
                    </div>
                ))}
            </ul>
        </>
    )
}

export function RecommendedSkeleton() {
    return (
        <ul className="px-2">
            {[...Array(3)].map((_, i) => (
                <UserItemSkeleton key={i} />
            ))}
        </ul>
    )
}
