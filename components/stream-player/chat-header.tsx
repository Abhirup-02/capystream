import { Skeleton } from "../ui/skeleton"
import { ChatToggle } from "./chat-toggle"

export function ChatHeader() {
    return (
        <div className="relative p-3 border-b">
            <div className="absolute left-2 top-2 hidden lg:block">
                <ChatToggle />
            </div>
            <p className="font-semibold text-primary text-center">
                Stream Chat
            </p>
        </div>
    )
}

export function ChatHeaderSkeleton() {
    return (
        <div className="relative p-3 border-b hidden md:block">
            <Skeleton className="absolute w-6 h-6 left-3 top-3" />
            <Skeleton className="w-28 mx-auto" />
        </div>
    )
}
