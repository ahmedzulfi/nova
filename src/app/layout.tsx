import type { Metadata } from "next";
import { Inter, Archivo, Cairo } from "next/font/google";
import "./globals.css";
import ErrorReporter from "@/components/ErrorReporter";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Script from "next/script";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  variable: "--font-archivo",
  display: "swap",
});

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nova Paw Festival | Qatar's First Pet Festival",
  description: "A two-day celebration of dogs and cats featuring international shows, live entertainment, and family experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${archivo.variable} ${cairo.variable}`}>
      <body className="antialiased">
        <ErrorReporter />
        <Script
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/scripts//route-messenger.js"
          strategy="afterInteractive"
          data-target-origin="*"
          data-message-type="ROUTE_CHANGE"
          data-include-search-params="true"
          data-only-in-iframe="true"
          data-debug="true"
          data-custom-data='{"appName": "YourApp", "version": "1.0.0", "greeting": "hi"}'
        />
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
