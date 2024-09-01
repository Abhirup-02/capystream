import { getSelf } from "./auth-service"
import { db } from "./db"

export async function getSearch(term?: string) {
    let userID

    try {
        const self = await getSelf()
        userID = self.id
    }
    catch {
        userID = null
    }

    let streams = []

    if (userID) {
        streams = await db.stream.findMany({
            where: {
                user: {
                    NOT: {
                        blocking: {
                            some: {
                                blockedID: userID
                            }
                        }
                    }
                },
                OR: [
                    {
                        name: {
                            contains: term
                        }
                    },
                    {
                        user: {
                            username: {
                                contains: term
                            }
                        }
                    }
                ]
            },
            select: {
                user: true,
                id: true,
                name: true,
                isLive: true,
                thumbnailURL: true,
                updatedAt: true
            },
            orderBy: [
                {
                    isLive: 'desc'
                },
                {
                    updatedAt: 'desc'
                }
            ]
        })
        await db.$disconnect()
    }
    else {
        streams = await db.stream.findMany({
            where: {
                OR: [
                    {
                        name: {
                            contains: term
                        }
                    },
                    {
                        user: {
                            username: {
                                contains: term
                            }
                        }
                    }
                ]
            },
            select: {
                user: true,
                id: true,
                name: true,
                isLive: true,
                thumbnailURL: true,
                updatedAt: true
            },
            orderBy: [
                {
                    isLive: 'desc'
                },
                {
                    updatedAt: 'desc'
                }
            ]
        })
        await db.$disconnect()
    }

    return streams
}
