import type { Metadata } from "next";
import "./globals.css";
import "./flagship/flagship.css";
import "./casino/casino.css";
import "./flagship/midnight-gold.css";

export const metadata: Metadata = {
  title: "FBets — The sharpest live action",
  description: "The sharpest live action, in the most private room. Explore FBets sports and casino demos with simulated markets, virtual credits and responsible-play controls.",
  applicationName: "FBets"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (<html lang="en"><body>{children}</body></html>);
}
