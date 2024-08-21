import Link from "next/link";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import Image from "next/image";

const font = Poppins({
    subsets: ["latin"],
    weight: ["200", "300", "400", "500", "600", "700", "800"]
})

export function Logo() {
    return (
        <Link href='/'>
            <div className="hidden lg:flex items-center gap-x-4 hover:opacity-75 transition">
                <div className="bg-white rounded-full p-1">
                    <Image
                        src='/capy.svg'
                        alt="capystream"
                        width={36}
                        height={36}
                    />
                </div>
                <div className={cn(font.className)}>
                    <p className="text-lg font-semibold">Capystream</p>
                    <p className="text-xs text-muted-foreground">Let&apos;s play</p>
                </div>
            </div>
        </Link>
    )
}
