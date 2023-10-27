import "./globals.css";
import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import RecoilProvider from "./RecoilProvider";
const instrumentSans = Instrument_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Frontend Mentor - Link-sharing app",
  description: "Frontend Mentor Challenge - Link-sharing app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <RecoilProvider>
        <body className={instrumentSans.className}>{children}</body>
      </RecoilProvider>
    </html>
  );
}
