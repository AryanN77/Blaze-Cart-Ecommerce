import type { Metadata } from "next";
import { Geist, Geist_Mono, Recursive } from "next/font/google";
import "./globals.css";
import PageLayout from "@/components/PageLayout";
import Image from "next/image";
import { Toaster } from "sonner";
import TanStackProvider from "@/providers/TanStackProvider";

const recursive = Recursive({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Blaze Cart | Your Ultimate Shopping Destination",
  description: "Shop the best products at unbeatable prices on Blaze Cart. Fast delivery, secure checkout, and top-notch quality.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <TanStackProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          className={`${recursive.className} antialiased`}
        >
          <PageLayout>
            {children}
            <Toaster />
          </PageLayout>
        </body>
      </html>
    </TanStackProvider>
  );
}
