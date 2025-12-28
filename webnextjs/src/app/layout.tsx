import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/header/Header";
import Footer from "@/components/Footer";
import Link from "next/link";


export const metadata: Metadata = {
  title: "Portfolio",
  description: "Abdullah Yazji Portfolio",
};

export default function RootLayout({auth, children }: Readonly<{auth: React.ReactNode, children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Header />
        <nav><Link href="/signin">Open modal</Link></nav>
        <main>{auth}</main>
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
