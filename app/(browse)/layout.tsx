import type { Metadata } from "next";
import { Navbar } from "./_components/navbar";

export const metadata: Metadata = {
    title: "Browse"
};

export default function BrowseLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <Navbar />
            <div className="flex h-full pt-20">
                {children}
            </div>
        </>
    );
}
