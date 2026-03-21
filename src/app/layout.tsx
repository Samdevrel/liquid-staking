import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Liquid Staking | @samdevrel",
  description: "Earn ETH staking rewards while keeping your assets liquid with Lido, Rocket Pool, ether.fi.",
  keywords: ["liquid staking", "Lido", "Rocket Pool", "ether.fi", "stETH", "staking rewards"],
  authors: [{ name: "Sam", url: "https://x.com/samdevrel" }],
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
