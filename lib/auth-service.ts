import { currentUser } from "@clerk/nextjs/server";
import { db } from "./db";

export async function getSelf() {
    const self = await currentUser()

    if (!self || !self.username) {
        throw new Error("Unauthorized")
    }

    try {
        const user = await db.user.findUnique({
            where: {
                externalUserID: self.id
            }
        })

        return user
    }
    catch (err) {
        throw new Error("Error at fetching data")
    }
}
