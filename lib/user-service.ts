import { db } from "./db";

export async function getUserByUsername(username: string) {
    try {
        const user = await db.user.findUnique({
            where: { username },
            include: {
                stream: true,
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
