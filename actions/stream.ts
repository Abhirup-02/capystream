"use server"

import { getSelf } from "@/lib/auth-service";
import { db } from "@/lib/db";
import { Stream } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function updateStream(values: Partial<Stream>) {
    try {
        const self = await getSelf()

        const selfStream = await db.stream.findUnique({
            where: {
                userID: self.id
            }
        })

        if (!selfStream) {
            await db.$disconnect()
            throw new Error("Stream not found")
        }

        const validData = {
            thumbnailURL: values.thumbnailURL,
            name: values.name,
            isChatEnabled: values.isChatEnabled,
            isChatDelayed: values.isChatDelayed,
            isChatFollowersOnly: values.isChatFollowersOnly
        }

        const stream = await db.stream.update({
            where: {
                id: selfStream.id
            },
            data: {
                ...validData
            }
        })
        await db.$disconnect()

        revalidatePath(`/u/${self.username}/chat`)
        revalidatePath(`/u/${self.username}`)
        revalidatePath(`/${self.username}`)

        return stream
    }
    catch {
        throw new Error("Internal Error")
    }
}
