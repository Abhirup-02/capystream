import { getSelf } from "./auth-service"
import { db } from "./db"

export async function getFollowedUsers() {
    try {
        const self = await getSelf()

        const followedUsers = await db.follow.findMany({
            where: {
                followerID: self.id,
                following: {
                    blocking: {
                        none: {
                            blockedID: self.id
                        }
                    }
                }
            },
            include: {
                following: {
                    include: {
                        stream: true
                    }
                }
            }
        })

        return followedUsers
    }
    catch {
        return []
    }
}

export async function isFollowingUser(id: string) {
    try {
        const self = await getSelf()

        const otherUser = await db.user.findUnique({
            where: { id }
        })

        if (!otherUser) {
            throw new Error("User not found")
        }

        if (otherUser.id === self.id) {
            return true
        }

        const existingFollow = await db.follow.findUnique({
            where: {
                followerID_followingID: {
                    followerID: self.id,
                    followingID: otherUser.id
                }
            }
        })

        return !!existingFollow
    }
    catch {
        return false
    }
}

export async function followUser(id: string) {
    const self = await getSelf()

    const otherUser = await db.user.findUnique({
        where: { id }
    })

    if (!otherUser) {
        throw new Error("User not found")
    }

    if (otherUser.id === self.id) {
        throw new Error("Cannot follow yourself")
    }

    const existingFollow = await db.follow.findFirst({
        where: {
            followerID: self.id,
            followingID: otherUser.id
        }
    })


    if (existingFollow) {
        throw new Error("Already following")
    }

    if (self) {
        const follow = await db.follow.create({
            data: {
                followerID: self.id,
                followingID: otherUser.id
            },
            include: {
                following: true,
                follower: true
            }
        })

        return follow
    }
}

export async function unfollowUser(id: string) {
    const self = await getSelf()

    const otherUser = await db.user.findUnique({
        where: { id }
    })

    if (!otherUser) {
        throw new Error("User not found")
    }

    if (otherUser.id === self.id) {
        throw new Error("Cannot unfollow yourself")
    }

    const existingFollow = await db.follow.findFirst({
        where: {
            followerID: self.id,
            followingID: otherUser.id
        }
    })


    if (!existingFollow) {
        throw new Error("Not following")
    }

    const unfollow = await db.follow.delete({
        where: {
            id: existingFollow.id
        },
        include: {
            following: true
        }
    })

    return unfollow
}
