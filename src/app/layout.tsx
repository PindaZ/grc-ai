import type { Metadata } from "next";
import { Ubuntu } from "next/font/google";
import { Providers } from "@/components/Providers";
import { AppShell } from "@/components/AppShell";
import "./globals.css";

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GRC Compliance Platform",
  description: "AI-powered Governance, Risk, and Compliance automation platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={ubuntu.className} suppressHydrationWarning>
        <Providers>
          <AppShell>{children}</AppShell>
        </Providers>
      </body>
    </html>
  );
}
