"use server"

import { getSelf } from "@/lib/auth-service"
import { blockUser, unblockUser } from "@/lib/block-service."
import { RoomServiceClient } from "livekit-server-sdk"
import { revalidatePath } from "next/cache"

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!
)

export async function onBlock(id: string) {
    const self = await getSelf()

    let blockedUser

    try {
        blockedUser = await blockUser(id)
    }
    catch (err) {
        /* user is a guest */
        throw new Error("Internal Error")
    }

    try {
        await roomService.removeParticipant(self.id, id)
    }
    catch {
        /* user is not in the room */
    }

    revalidatePath(`/u/${self.username}/community`)

    return blockedUser
}

export async function onUnblock(id: string) {
    try {
        const unblockedUser = await unblockUser(id)

        revalidatePath('/')

        if (unblockedUser) {
            revalidatePath(`/${unblockedUser.blocked.username}`)
        }

        return unblockedUser
    }
    catch (err) {
        throw new Error("Internal Error")
    }
}
