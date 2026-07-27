import type { Metadata } from "next";
import { Fraunces, Sora, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import ScrollBackground from "@/components/ScrollBackground";
import MagneticCursor from "@/components/MagneticCursor";
import ScrollProgress from "@/components/ScrollProgress";

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz", "SOFT", "WONK"],
  style: ["normal", "italic"],
  weight: "variable",
});

const sora = Sora({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Actonaughts — Full-Stack Consulting & Engineering",
  description:
    "Actonaughts is a full-stack consulting studio led by Robert Slavens and Chello May Harrison (and ship's cat Morris), joining strategy and engineering into one accountable team.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${sora.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <SmoothScrollProvider>
          <ScrollBackground />
          <MagneticCursor />
          <ScrollProgress />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
