import { UrlCard } from "./_components/urlcard";
import { getSelf } from "@/lib/auth-service";
import { getStreamByUserID } from "@/lib/stream-service";
import { KeyCard } from "./_components/keycard";
import { ConnectModal } from "./_components/connectmodal";

export default async function KeysPage() {

    const self = await getSelf()
    const stream = await getStreamByUserID(self.id)

    if (!stream) {
        throw new Error("Stream not found")
    }

    return (
        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">
                    Keys & URLs
                </h1>
                <ConnectModal />
            </div>
            <div className="space-y-4">
                <UrlCard value={stream.serverURL} />
                <KeyCard value={stream.streamKey} />
            </div>
        </div>
    )
}
