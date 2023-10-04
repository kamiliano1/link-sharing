import "./globals.css";
import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
const instrumentSans = Instrument_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={instrumentSans.className}>{children}</body>
    </html>
  );
}
