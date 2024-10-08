import { getSelf } from "./auth-service"
import { db } from "./db"

export async function getBlockedUsers() {
    try {
        const self = await getSelf()

        const blockedUsers = await db.block.findMany({
            where: {
                blockerID: self.id
            },
            include: {
                blocked: true
            }
        })

        return blockedUsers
    }
    catch {
        return []
    }
}

export async function isBlockedUser(id: string) {
    try {
        const self = await getSelf()

        const otherUser = await db.user.findUnique({
            where: { id }
        })

        if (!otherUser) {
            throw new Error("User not found")
        }

        if (otherUser.id === self.id) {
            return false
        }

        const existingBlock = await db.block.findUnique({
            where: {
                blockerID_blockedID: {
                    blockerID: self.id,
                    blockedID: otherUser.id
                }
            }
        })

        return !!existingBlock
    }
    catch {
        return false
    }
}

export async function blockUser(id: string) {
    const self = await getSelf()

    if (self.id === id) {
        throw new Error("Cannot block yourself")
    }

    const otherUser = await db.user.findUnique({
        where: { id }
    })

    if (!otherUser) {
        throw new Error("User not found")
    }

    const existingBlock = await db.block.findUnique({
        where: {
            blockerID_blockedID: {
                blockerID: self.id,
                blockedID: otherUser.id
            }
        }
    })

    if (existingBlock) {
        throw new Error("Already blocked")
    }

    const block = await db.block.create({
        data: {
            blockerID: self.id,
            blockedID: otherUser.id
        },
        include: {
            blocked: true
        }
    })

    return block
}

export async function unblockUser(id: string) {
    const self = await getSelf()

    if (self.id === id) {
        throw new Error("Cannot block yourself")
    }

    const otherUser = await db.user.findUnique({
        where: { id }
    })

    if (!otherUser) {
        throw new Error("User not found")
    }

    const existingBlock = await db.block.findUnique({
        where: {
            blockerID_blockedID: {
                blockerID: self.id,
                blockedID: otherUser.id
            }
        }
    })

    if (!existingBlock) {
        throw new Error("Not blocked")
    }

    const unblock = await db.block.delete({
        where: {
            id: existingBlock.id
        },
        include: {
            blocked: true
        }
    })

    return unblock
}
