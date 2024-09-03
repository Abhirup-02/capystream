import Head from "next/head";

export default function OfflinePage() {
    return (
        <>
            <Head>
                <title>Capystream</title>
            </Head>
            <div className="h-full flex flex-col space-y-4 items-center justify-center text-muted-foreground">
                <h2>
                    You are offline
                </h2>
            </div>
        </>
    )
}
