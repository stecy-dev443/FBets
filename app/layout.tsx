import type { Metadata } from "next";
import "./globals.css";
import "./flagship/flagship.css";
import "./casino/casino.css";

export const metadata: Metadata = {
  title: "FBets — The sharpest live experience",
  description: "A premium live sports experience built on trust. Interactive prototype with simulated markets and responsible-play controls.",
  applicationName: "FBets"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (<html lang="en"><body>{children}</body></html>);
}
