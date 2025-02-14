import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/components/providers/StoreProvider";
import AuthProvider from "@/components/providers/AuthProvider";
import CustomToaster from "@/components/common/CustomToaster";
import CommonAllComponents from "@/components/common/CommonAllComponents";

export const metadata: Metadata = {
  title: "Discusync - Streamlined Work Management & Team Collaboration",
  description: "Discusync is a powerful work management tool designed for teams. Streamline communication, task management, and collaboration in one seamless platform.",
  icons: '/favicon.ico',
  openGraph: {
    title: "Discusync - Streamlined Work Management & Team Collaboration",
    description: "Discusync is a powerful work management tool designed for teams. Streamline communication, task management, and collaboration in one seamless platform.",
    type: "website",
    url: "https://discusync.vercel.app",
    images: [
      {
        url: "/logo.png",
        alt: "Discusync - Streamlined Work Management & Team Collaboration",
      },
    ],
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* StoreProvider is a custom provider that wraps the entire application */}
        <StoreProvider />

        {/* Toaster is a toast provider that wraps the entire application to show toast notifications*/}
        <CustomToaster />

        {/* AuthProvider is a custom provider that wraps the entire application */}
        <AuthProvider>
          <CommonAllComponents >
            {children}
          </CommonAllComponents>
        </AuthProvider>
      </body>
    </html>
  );
}
