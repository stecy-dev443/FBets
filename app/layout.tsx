import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FBets — The Matchday Experience",
  description: "A premium sports markets experience. Demo fixtures and illustrative odds only.",
  applicationName: "FBets"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
