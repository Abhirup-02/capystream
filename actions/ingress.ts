"use server"

import { getSelf } from "@/lib/auth-service"
import { db } from "@/lib/db"
import { CreateIngressOptions, IngressAudioEncodingPreset, IngressClient, IngressInput, IngressVideoEncodingPreset, RoomServiceClient, TrackSource } from "livekit-server-sdk"
import { revalidatePath } from "next/cache"

const roomService = new RoomServiceClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!
)

const ingressClient = new IngressClient(
    process.env.LIVEKIT_API_URL!,
    process.env.LIVEKIT_API_KEY!,
    process.env.LIVEKIT_API_SECRET!
)


async function resetIngresses(hostIdentity: string) {
    const ingresses = await ingressClient.listIngress({
        roomName: hostIdentity
    })

    const rooms = await roomService.listRooms([hostIdentity])

    for (const room of rooms) {
        await roomService.deleteRoom(room.name)
    }

    for (const ingress of ingresses) {
        if (ingress.ingressId) {
            await ingressClient.deleteIngress(ingress.ingressId)
        }
    }
}

export async function createIngress(ingressType: IngressInput) {
    const self = await getSelf()

    await resetIngresses(self.id)

    const ingressOptions: CreateIngressOptions = {
        name: self.username,
        roomName: self.id,
        participantIdentity: self.id,
        participantName: self.username,
    }

    if (ingressType === IngressInput.WHIP_INPUT) {
        ingressOptions.enableTranscoding = true
    } else {
        // @ts-ignore
        ingressOptions.video = {
            source: TrackSource.CAMERA,
            encodingOptions: {
                value: IngressVideoEncodingPreset.H264_1080P_30FPS_3_LAYERS,
                case: "preset"
            }
        }
        // @ts-ignore
        ingressOptions.audio = {
            source: TrackSource.MICROPHONE,
            encodingOptions: {
                value: IngressAudioEncodingPreset.OPUS_STEREO_96KBPS,
                case: "preset"
            }
        }
    }

    const ingress = await ingressClient.createIngress(ingressType, ingressOptions)

    if (!ingress || !ingress.url || !ingress.streamKey) {
        throw new Error("Failed to create ingress")
    }

    await db.stream.update({
        where: {
            userID: self.id
        },
        data: {
            ingressID: ingress.ingressId,
            serverURL: ingress.url,
            streamKey: ingress.streamKey
        }
    })

    revalidatePath(`/u/${self.username}/keys`)

    return ingress
}
