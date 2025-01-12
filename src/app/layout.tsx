import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Analytics from "@/components/Analytics";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Blog app | Nabendu Manna",
  description: "A Next.js blog app where user can read and write blog posts created by Nabendu Manna"
};

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning dir="ltr" lang="en">
      <Analytics />
      <body className={`${inter.className} 
      [&::-webkit-scrollbar]:w-1
      [&::-webkit-scrollbar-track]:rounded-full
      [&::-webkit-scrollbar-track]:bg-gray-100
      [&::-webkit-scrollbar-thumb]:rounded-full
      [&::-webkit-scrollbar-thumb]:bg-gray-300
      dark:[&::-webkit-scrollbar-track]:bg-neutral-700
      dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500`}>
        <Providers attribute="class" defaultTheme="dark">{children}</Providers>
      </body>
    </html>
  );
}
