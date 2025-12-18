import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MobileNav from "@/components/layout/MobileNav";
import ServiceWorkerRegistration from "@/components/ServiceWorkerRegistration";
import OfflineIndicator from "@/components/ui/OfflineIndicator";
import InstallPrompt from "@/components/pwa/InstallPrompt";
import SplashScreens from "@/components/SplashScreens";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider } from "@/contexts/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Bible Steps - Daily Faith for Real Life",
  description: "5-minute devotions, grace-based streak tracking, and authentic community for young Christians navigating 2026",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: '/icons/icon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/icon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512.png', sizes: '512x512', type: 'image/png' },
      { url: '/icon.svg', sizes: 'any', type: 'image/svg+xml' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      { url: '/icons/apple-touch-icon-120.png', sizes: '120x120', type: 'image/png' },
      { url: '/icons/apple-touch-icon-152.png', sizes: '152x152', type: 'image/png' },
      { url: '/icons/apple-touch-icon-167.png', sizes: '167x167', type: 'image/png' },
    ],
    shortcut: '/icons/icon-192.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Bible Steps",
  },
  other: {
    'color-scheme': 'light dark',
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <SplashScreens />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ThemeProvider>
            <OfflineIndicator />
            <div className="pb-20">
              {children}
            </div>
            <MobileNav />
            <ServiceWorkerRegistration />
            <InstallPrompt />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
