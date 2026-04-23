import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "This Time — A Journey Through the Holy Land",
  description:
    "A yearlong photo journey through Israel and Palestine, guided by the weekly Parashot. By Elazar Weiss.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
