import { db } from "./db";

export async function getStreamByUserID(userID: string) {
    const stream = await db.stream.findUnique({
        where: { userID }
    })
    await db.$disconnect()

    return stream
}
