import { getSelf } from "./auth-service";
import { db } from "./db";

export async function getRecommended() {

    let userID

    const self = await getSelf()
    if (!self) {
        userID = self
    } else {
        userID = self.id
    }

    let users = []

    if (userID) {
        users = await db.user.findMany({
            where: {
                NOT: {
                    id: userID
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        })
    } else {
        users = await db.user.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })
    }

    return users
}
