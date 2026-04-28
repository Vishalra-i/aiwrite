import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WriteFlow AI - Next-Gen AI Content Generator",
  description: "Generate high-quality content in seconds using the power of AI. Write blogs, ad copies, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-slate-50 text-slate-900 selection:bg-primary selection:text-white`}>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
