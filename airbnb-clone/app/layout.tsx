import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mirashya UG10 | Candolim stay",
  description: "A private serviced apartment in Candolim, Goa.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
