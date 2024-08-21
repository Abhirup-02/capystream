import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";

const font = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"]
})

export const Logo = () => {
    return (
        <div className="flex flex-col items-center gap-y-4">
            <div className="bg-white rounded-full p-1">
                <Image
                    src="/capy.svg"
                    alt="capystream"
                    width={90}
                    height={90}
                />
            </div>
            <div className={cn(
                "flex flex-col items-center",
                font.className
            )}>
                <p className="text-xl font-semibold">
                    Capystream
                </p>
                <p className="text-sm text-muted-foreground mt-1">
                    Let&apos;s play
                </p>
            </div>
        </div>
    )
}