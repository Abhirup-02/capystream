import type { Metadata } from "next";
import { Suspense } from "react";

import { Navbar } from "./_components/navbar";
import { Sidebar, SidebarSkeleton } from "./_components/sidebar";
import { Container } from "./_components/container";

export const metadata: Metadata = {
    title: "Capystream"
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
                <Suspense fallback={<SidebarSkeleton />}>
                    <Sidebar />
                </Suspense>

                <Container>
                    {children}
                </Container>
            </div>
        </>
    )
}
