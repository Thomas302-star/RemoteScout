import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RemoteScout | Find remote jobs in one place",
  description:
    "Discover remote job opportunities from trusted sources in one organized experience.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
