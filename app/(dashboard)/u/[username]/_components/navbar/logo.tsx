import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";

const font = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"]
})

export function Logo() {
    return (
        <div className="flex items-center gap-x-4">
            <div className="bg-white rounded-full p-1 mr-12 shrink-0 lg:mr-0 lg:shrink">
                <Image
                    src='/capy.svg'
                    alt="capystream"
                    width={36}
                    height={36}
                />
            </div>
            <div className={cn(
                "hidden lg:block",
                font.className
            )}>
                <p className="text-lg font-semibold">Capystream</p>
                <p className="text-xs text-muted-foreground">Creator dashboard</p>
            </div>
        </div>
    )
}
