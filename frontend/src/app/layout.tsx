import "../styles/global.css";

import { inter } from "@/font";
import { Geist, Geist_Mono } from "next/font/google";
import type { Metadata } from "next";
import Providers from "@/provider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next"



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://likesub.io.vn"),
  title: {
    default: "Likesub VIP - Dịch Vụ Tăng Tương Tác Mạng Xã Hội Chuyên Nghiệp",
    template: "%s | Likesub VIP"
  },
  description: "Nền tảng tăng tương tác mạng xã hội hàng đầu Việt Nam. Tăng like, follow, view, comment chất lượng cao cho Facebook, Instagram, TikTok, YouTube. Giá rẻ - Uy tín - Bảo hành.",
  keywords: [
    "tăng like",
    "tăng follow",
    "tăng view",
    "tăng comment",
    "facebook",
    "instagram",
    "tiktok",
    "youtube",
    "mạng xã hội",
    "tương tác",
    "seeding",
    "marketing"
  ],
  authors: [{ name: "Likesub VIP" }],
  creator: "Likesub VIP",
  publisher: "Likesub VIP",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: "https://likesub.io.vn",
    siteName: "Likesub VIP",
    title: "Likesub VIP - Dịch Vụ Tăng Tương Tác Mạng Xã Hội Chuyên Nghiệp",
    description: "Nền tảng tăng tương tác mạng xã hội hàng đầu Việt Nam. Tăng like, follow, view, comment chất lượng cao. Giá rẻ - Uy tín - Bảo hành.",
    images: [
      {
        url: "/images/og-preview.jpg",
        width: 1200,
        height: 630,
        alt: "Likesub VIP - Dịch Vụ Tăng Tương Tác Mạng Xã Hội",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Likesub VIP - Dịch Vụ Tăng Tương Tác Mạng Xã Hội",
    description: "Nền tảng tăng tương tác mạng xã hội hàng đầu Việt Nam. Giá rẻ - Uy tín - Bảo hành.",
    images: ["/images/background-preview.jpg"],
    creator: "@likesubvip",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  verification: {
    // Thêm Google Search Console verification nếu có
    // google: "your-google-verification-code",
  },
  alternates: {
    canonical: "https://likesub.io.vn",
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={inter.variable}>
      <head>
        <meta name="theme-color" content="#3b82f6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
