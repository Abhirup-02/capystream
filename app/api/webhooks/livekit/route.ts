import { db } from "@/lib/db";
import { WebhookReceiver } from "livekit-server-sdk";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const receiver = new WebhookReceiver(
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!
)

export async function POST(req: NextRequest) {
    const body = await req.text()
    const headerPayload = headers()
    const authorization = headerPayload.get("Authorization")

    if (!authorization) {
        return NextResponse.json(
            { message: "No authorization header" },
            { status: 400 }
        )
    }

    const event = await receiver.receive(body, authorization)

    if (event.event === 'ingress_started') {
        await db.stream.update({
            where: {
                ingressID: event.ingressInfo?.ingressId
            },
            data: {
                isLive: true
            }
        })

        return NextResponse.json(
            { message: "Livestream started" },
            { status: 200 }
        )
    }

    if (event.event === 'ingress_ended') {
        await db.stream.update({
            where: {
                ingressID: event.ingressInfo?.ingressId
            },
            data: {
                isLive: false
            }
        })

        return NextResponse.json(
            { message: "Livestream ended" },
            { status: 200 }
        )
    }
}
