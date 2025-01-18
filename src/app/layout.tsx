import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/components/providers/StoreProvider";

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
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  );
}
