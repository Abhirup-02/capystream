import { notFound } from "next/navigation";
import { isFollowingUser } from "@/lib/follow-service";
import { getUserByUsername } from "@/lib/user-service";
import { Actions } from "./_components/actions";

interface UserPageProps {
    params: {
        username: string;
    }
}

export default async function UserPage({ params }: UserPageProps) {

    const user = await getUserByUsername(params.username)

    if (!user) {
        notFound()
    }

    const isFollowing = await isFollowingUser(user.id)

    return (
        <div className="flex flex-col gap-y-4">
            <p>{user.username}</p>
            <p>{user.id}</p>
            <p>{isFollowing ? 'Following' : 'Not Follwoing'}</p>
            <Actions
                userID={user.id}
                isFollowing={isFollowing}
            />
        </div>
    )
}