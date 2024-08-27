import { getSelf } from "./auth-service";
import { db } from "./db";

export async function getRecommended() {

    let userID

    try {
        const self = await getSelf()
        userID = self.id
    }
    catch {
        userID = null
    }

    let users = []

    if (userID) {
        users = await db.user.findMany({
            where: {
                AND: [
                    {
                        NOT: {
                            id: userID
                        }
                    },
                    {
                        NOT: {
                            followedBy: {
                                some: {
                                    followerID: userID
                                }
                            }
                        }
                    },
                    {
                        NOT: {
                            blocking: {
                                some: {
                                    blockedID: userID
                                }
                            }
                        }
                    }
                ]
            },
            include: {
                stream: {
                    select: {
                        isLive: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    } else {
        users = await db.user.findMany({
            include: {
                stream: {
                    select: {
                        isLive: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    }

    return users
}
