import { notFound } from "next/navigation";
import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { Actions } from "./_components/actions";
import { isBlockedUser } from "@/lib/block-service.";
import { StreamPlayer } from "@/components/stream-player";

interface UserPageProps {
    params: {
        username: string;
    }
}

export default async function UserPage({ params }: UserPageProps) {

    const user = await getUserByUsername(params.username)

    if (!user || !user.stream) {
        notFound()
    }

    const isBlocked = await isBlockedUser(user.id)
    const isFollowing = await isFollowingUser(user.id)

    if (isBlocked) {
        notFound()
    }

    return (
        <StreamPlayer
            user={user}
            stream={user.stream}
            isFollowing={isFollowing}
        />
        //     <Actions
        //         userID={user.id}
        //         isBlocked={isBlocked}
        //         isFollowing={isFollowing}
        //     />
    )
}
