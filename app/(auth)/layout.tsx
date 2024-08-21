import type { Metadata } from "next";
import { Logo } from "./_components/logo";

export const metadata: Metadata = {
    title: "Authentication"
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="h-[95%] flex flex-col justify-center items-center space-y-6">
            <Logo />
            {children}
        </div>
    );
}
