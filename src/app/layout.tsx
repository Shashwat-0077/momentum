import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { SessionProvider } from "next-auth/react";

import { QueryProvider } from "@/providers/query-providers";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Momentum",
    description:
        "Momentum is a powerful web app that helps you track, visualize, and manage your data effortlessly. With seamless Notion integration, you can sync and analyze your Notion databases alongside your personal data. Momentum features interactive charts for deep insights, a habit tracker with vibrant heat-maps to monitor your progress, and a clean, intuitive interface to keep you organized and motivated every step of the way.",
};

// NOTE : Should have used GraphQL for this, i didn't think it would grow this big

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="dark">
            <body
                className={`${geistSans.variable} ${geistMono.variable} antialiased`}
            >
                <SessionProvider>
                    <QueryProvider>{children}</QueryProvider>
                </SessionProvider>
                <Toaster />
            </body>
        </html>
    );
}
