import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function POST(req: NextRequest) {
    const WEBHOOK_SECRET = process.env.CLERK_WEBHOOK_SECRET

    if (!WEBHOOK_SECRET) {
        throw new Error("Add CLERK_WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local")
    }

    const headerPayload = headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    if (!svix_id || !svix_timestamp || !svix_signature) {
        return NextResponse.json(
            { message: "Error occured -- no svix headers" },
            { status: 400 }
        )
    }

    let event: WebhookEvent
    const wh = new Webhook(WEBHOOK_SECRET)

    const payload = await req.json()

    try {
        event = wh.verify(JSON.stringify(payload), {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent
    } catch (err) {
        console.error('Error verifying webhook:', err)
        return NextResponse.json(
            { message: 'Error occured' },
            { status: 400 }
        )
    }


    if (event.type === "user.created") {
        const user = await db.user.create({
            data: {
                externalUserID: payload.data.id,
                username: payload.data.username,
                imageURL: payload.data.image_url,
                stream: {
                    create: {
                        name: `${payload.data.username}'s stream`
                    }
                }
            }
        })
        await db.$disconnect()

        console.log(`User created -> ${user.username}`)

        return NextResponse.json(
            { message: "User created" },
            { status: 201 }
        )
    }

    if (event.type === "user.updated") {
        const user = await db.user.update({
            where: {
                externalUserID: payload.data.id
            },
            data: {
                username: payload.data.username,
                imageURL: payload.data.image_url,
                stream: {
                    update: {
                        name: `${payload.data.username}'s stream`
                    }
                }
            }
        })
        await db.$disconnect()

        console.log(`User updated -> ${user.username}`)

        return NextResponse.json(
            { message: "User updated" },
            { status: 200 }
        )
    }

    if (event.type === "user.deleted") {
        const user = await db.user.delete({
            where: {
                externalUserID: payload.data.id
            }
        })
        await db.$disconnect()

        console.log(`User deleted -> ${user.username}`)

        return NextResponse.json(
            { message: "User deleted" },
            { status: 200 }
        )
    }
}
