import type { Metadata } from "next";
import "./globals.css";

import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { ThemeProvider } from "@/components/theme-provider";


export const metadata: Metadata = {
  title: "CapyStream"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark }} afterSignOutUrl='/'>
      <html lang="en">
        <body>
          <ThemeProvider
            attribute="class"
            forcedTheme="dark"
            storageKey="capystream-theme"
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
