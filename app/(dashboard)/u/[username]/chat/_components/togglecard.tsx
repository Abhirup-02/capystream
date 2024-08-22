"use client"

import { toast } from "sonner";
import { useTransition } from "react";

import { updateStream } from "@/actions/stream";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";

type FieldTypes = "isChatEnabled" | "isChatDelayed" | "isChatFollowersOnly"

interface ToggleCardProps {
    field: FieldTypes;
    label: string;
    value: boolean;
}

export function ToggleCard({ field, label, value }: ToggleCardProps) {

    const [isPending, startTransition] = useTransition()

    function onChange() {
        startTransition(() => {
            updateStream({ [field]: !value })
                .then(() => toast.success("Chat settings updated"))
                .catch(() => toast.success("Something went wrong"))
        })
    }

    return (
        <div className="rounded-xl bg-muted p-6">
            <div className="flex items-center justify-between">
                <p className="font-semibold shrink-0">
                    {label}
                </p>
                <div className="space-y-2">
                    <Switch
                        disabled={isPending}
                        onCheckedChange={onChange}
                        checked={value}
                    >
                        {value ? "On" : "Off"}
                    </Switch>
                </div>
            </div>
        </div>
    )
}

export function ToggleCardSkeleton() {
    return (
        <Skeleton className="rounded-xl p-10 w-full" />
    )
}
