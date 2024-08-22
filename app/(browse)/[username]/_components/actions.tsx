"use client"

import { onFollow, onUnfollow } from "@/actions/follow"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { toast } from "sonner";

interface ActionProps {
    isFollowing: boolean;
    userID: string;
}

export function Actions({ isFollowing, userID }: ActionProps) {

    const [isPending, startTransition] = useTransition()

    function handleFollow() {
        startTransition(() => {
            onFollow(userID)
                .then((data) => toast.success(`You are now following ${data?.following.username}`))
                .catch(() => toast.error("Something went wrong"))
        })
    }

    function handleUnfollow() {
        startTransition(() => {
            onUnfollow(userID)
                .then((data) => toast.success(`You have unfollowed ${data?.following.username}`))
                .catch(() => toast.error("Something went wrong"))
        })
    }

    return (
        <Button
            variant="primary"
            onClick={isFollowing ? handleUnfollow : handleFollow}
            disabled={isPending}
        >
            {isFollowing ? "Unfollow" : "Follow"}
        </Button>
    )
}
