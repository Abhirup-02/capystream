'use client'

import { Maximize, Minimize } from "lucide-react";
import { Hint } from "../hint";

interface FullScreenControlProps {
    isFullScreen: boolean;
    onToggle: () => void;
}

export function FullScreenControl({ isFullScreen, onToggle }: FullScreenControlProps) {

    const Icon = isFullScreen ? Minimize : Maximize

    const label = isFullScreen ? 'Exit Fullscreen' : 'Enter Fullscreen'

    return (
        <div className="flex items-center justify-center gap-4">
            <Hint label={label} asChild>
                <button onClick={onToggle} className="text-white p-1.5 hover:bg-white/10">
                    <Icon className="w-5 h-5" />
                </button>
            </Hint>
        </div>
    )
}
