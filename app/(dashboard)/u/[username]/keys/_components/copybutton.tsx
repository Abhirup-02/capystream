"use client"

import { Button } from "@/components/ui/button"
import { CheckIcon, Copy } from "lucide-react"
import { useState } from "react"

interface CopyButtonProps {
    value?: string
}

export function CopyButton({ value }: CopyButtonProps) {

    const [isCopied, setIsCopied] = useState(false)

    function onCopy() {
        if (!value) return

        setIsCopied(true)
        navigator.clipboard.writeText(value)
        setTimeout(() => {
            setIsCopied(false)
        }, 1000)
    }

    const Icon = isCopied ? CheckIcon : Copy

    return (
        <Button
            onClick={onCopy}
            disabled={!value || isCopied}
            variant="ghost"
            size="sm"
        >
            <Icon className="w-4 h-4" />
        </Button>
    )
}
