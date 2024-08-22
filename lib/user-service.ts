import { db } from "./db";

export async function getUserByUsername(username: string) {
    try {
        const user = await db.user.findUnique({
            where: { username }
        })

        return user
    }
    catch (err) {
        console.log(err)
    }
}
