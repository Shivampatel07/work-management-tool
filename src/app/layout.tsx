import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/components/providers/StoreProvider";
import AuthProvider from "@/components/providers/AuthProvider";
import CustomToaster from "@/components/common/CustomToaster";

export const metadata: Metadata = {
  title: "WMT",
  description: "Work management tool",
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
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
