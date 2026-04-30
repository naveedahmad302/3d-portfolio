import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Naveed Ahmad | Full-Stack Developer & Creative Engineer",
  description:
    "Ultra-premium 3D developer portfolio showcasing cutting-edge web experiences, full-stack development, and creative engineering by Naveed Ahmad.",
  keywords: [
    "developer",
    "portfolio",
    "full-stack",
    "react",
    "next.js",
    "three.js",
    "3D",
    "creative",
    "engineer",
  ],
  authors: [{ name: "Naveed Ahmad" }],
  openGraph: {
    title: "Naveed Ahmad | Full-Stack Developer",
    description:
      "Immersive 3D developer portfolio — pushing the boundaries of web experiences.",
    type: "website",
    locale: "en_US",
    siteName: "Naveed Ahmad Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Naveed Ahmad | Full-Stack Developer",
    description:
      "Immersive 3D developer portfolio — pushing the boundaries of web experiences.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen bg-background text-foreground overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
