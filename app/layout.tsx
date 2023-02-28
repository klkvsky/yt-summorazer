import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "QuickView",
  description: "Generate TLDR for YouTube video under 60 seconds",
  generator: "Next.js",
  applicationName: "QuickView",
  referrer: "origin-when-cross-origin",
  keywords: [
    "Next.js",
    "React",
    "JavaScript",
    "Youtube",
    "Summariser",
    "klkvsky",
  ],
  authors: [
    { name: "klkvsky" },
    { name: "Baiel Kulokovsky", url: "https://bento.me/klkvsky" },
  ],
  colorScheme: "light",
  creator: "klkvsky",
  publisher: "Baiel Kulikovsky",
  alternates: {},
  formatDetection: {
    email: true,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "QuickView",
    description: "Generate TLDR for YouTube video under 60 seconds",
    url: "https://yt-summorazer.vercel.app/",
    siteName: "QuickView",
    locale: "en-US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-white text-black dark:bg-neutral-900 dark:text-white">
        {children}
      </body>
    </html>
  );
}
