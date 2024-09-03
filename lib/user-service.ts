import { db } from "./db";

export async function getUserByUsername(username: string) {
    try {
        const user = await db.user.findUnique({
            where: { username },
            select: {
                id: true,
                externalUserID: true,
                username: true,
                bio: true,
                imageURL: true,
                stream: {
                    select: {
                        id: true,
                        name: true,
                        isLive: true,
                        isChatDelayed: true,
                        isChatEnabled: true,
                        isChatFollowersOnly: true,
                        thumbnailURL: true
                    }
                },
                _count: {
                    select: {
                        followedBy: true
                    }
                }
            }
        })

        return user
    }
    catch (err) {
        console.log(err)
    }
}

export async function getUserById(id: string) {
    try {
        const user = await db.user.findUnique({
            where: { id },
            include: {
                stream: true
            }
        })

        return user
    }
    catch (err) {
        console.log(err)
    }
}
