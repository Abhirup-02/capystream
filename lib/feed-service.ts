import { getSelf } from "./auth-service"
import { db } from "./db"

export async function getStreams() {
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
                }
            },
            select: {
                id: true,
                user: true,
                isLive: true,
                name: true,
                thumbnailURL: true
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
    }
    else {
        streams = await db.stream.findMany({
            select: {
                id: true,
                user: true,
                isLive: true,
                name: true,
                thumbnailURL: true
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
    }

    return streams
}
