"use client"

import { onBlock, onUnblock } from "@/actions/block";
import { onFollow, onUnfollow } from "@/actions/follow"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { toast } from "sonner";

interface ActionProps {
    isBlocked: boolean;
    isFollowing: boolean;
    userID: string;
}

export function Actions({ isBlocked, isFollowing, userID }: ActionProps) {

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
                .then((data) => toast.success(`You have unfollowed ${data.following.username}`))
                .catch(() => toast.error("Something went wrong"))
        })
    }

    function handleBlock() {
        startTransition(() => {
            onBlock(userID)
                .then((data) => toast.success(`Blocked user ${data.blocked.username}`))
                .catch(() => toast.error("Something went wrong"))
        })
    }

    function handleUnblock() {
        startTransition(() => {
            onUnblock(userID)
                .then((data) => toast.success(`Unblocked user ${data.blocked.username}`))
                .catch(() => toast.error("Something went wrong"))
        })
    }


    return (
        <>
            <Button
                variant="primary"
                onClick={isFollowing ? handleUnfollow : handleFollow}
                disabled={isPending}
            >
                {isFollowing ? "Unfollow" : "Follow"}
            </Button>

            <Button
                onClick={isBlocked ? handleUnblock : handleBlock}
                disabled={isPending}
            >
                {isBlocked ? "Unblock" : "Block"}
            </Button>
        </>
    )
}
