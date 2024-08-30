import { useAuth } from "@clerk/nextjs";
import { Button } from "../ui/button";
import { Heart } from "lucide-react";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { onFollow, onUnfollow } from "@/actions/follow";
import { toast } from "sonner";
import { Skeleton } from "../ui/skeleton";

interface ActionsProps {
    isFollowing: boolean;
    hostIdentity: string;
    isHost: boolean;
}

export function Actions({ isFollowing, hostIdentity, isHost }: ActionsProps) {

    const { userId } = useAuth()
    const router = useRouter()
    const [isPending, startTransition] = useTransition()

    function handleFollow() {
        startTransition(() => {
            onFollow(hostIdentity)
                .then((data) => toast.success(`You are now follow ${data?.following.username}`))
                .catch(() => toast.error('Something went wrong'))
        })
    }

    function handlUnfollow() {
        startTransition(() => {
            onUnfollow(hostIdentity)
                .then((data) => toast.success(`You have unfollowed ${data?.following.username}`))
                .catch(() => toast.error('Something went wrong'))
        })
    }

    function toggleFollow() {
        if (!userId) {
            return router.push('/sign-in')
        }
        if (isHost) return

        if (isFollowing) {
            handleFollow()
        }
        else {
            handlUnfollow()
        }
    }

    return (
        <Button
            disabled={isPending || isHost}
            onClick={toggleFollow}
            variant="primary"
            size="sm"
            className="w-full lg:w-auto"
        >
            <Heart className={cn(
                "h-4 w-4 mr-2",
                isFollowing ? "fill-white" : "fill-none"
            )} />
            {isFollowing ? 'Unfollow' : 'Follow'}
        </Button>
    )
}

export function ActionsSkeleton() {
    return (
        <Skeleton className="h-8 w-full lg:w-24" />
    )
}
