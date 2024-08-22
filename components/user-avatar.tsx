import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { LiveBadge } from "./live-badge";

const avatarSizes = cva(
    "",
    {
        variants: {
            size: {
                default: "h-4 w-4",
                lg: "h-14 w-14"
            },
            defaultVariants: {
                size: "default"
            }
        }
    }
)

interface UserAvatarProps extends VariantProps<typeof avatarSizes> {
    username: string;
    imageURL: string;
    isLive?: boolean;
    showBadge?: boolean;
}

export function UserAvatar({ username, imageURL, isLive, showBadge, size }: UserAvatarProps) {

    const canShowBadge = showBadge && isLive

    return (
        <div className="relative">
            <Avatar className={cn(
                isLive && "ring-2 ring-rose-500 border border-background",
                avatarSizes({ size })
            )}>
                <AvatarImage src={imageURL} className="object-cover" />
                <AvatarFallback>
                    {username[0]}
                    {username[username.length - 1]}
                </AvatarFallback>
            </Avatar>
            {canShowBadge && (
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2">
                    <LiveBadge />
                </div>
            )}
        </div>
    )
}

interface UserAvatarSkeletonProps extends VariantProps<typeof avatarSizes> { }

export function UserAvatarSkeleton({ size }: UserAvatarSkeletonProps) {
    return (
        <Skeleton className={cn(
            "rounded-full",
            avatarSizes({ size })
        )} />
    )
}
