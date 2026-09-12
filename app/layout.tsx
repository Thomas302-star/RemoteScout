import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RemoteScout | Find remote jobs in one place",
  description:
    "Discover remote job opportunities from trusted sources in one organized experience.",
};

const scrollFixScript = `
  (function () {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    function resetScroll() {
      window.scrollTo(0, 0);
    }

    resetScroll();
    window.addEventListener("pageshow", resetScroll);
    window.addEventListener("load", resetScroll);

    requestAnimationFrame(resetScroll);
    requestAnimationFrame(function () {
      requestAnimationFrame(resetScroll);
    });

    setTimeout(resetScroll, 50);
    setTimeout(resetScroll, 250);
  })();
`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{ __html: scrollFixScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
