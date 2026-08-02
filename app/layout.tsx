import type { Metadata } from "next";
import "./globals.css";
import { SiteFooter, SiteHeader } from "@/components/site-shell";

export const metadata: Metadata = {
  title: {
    default: "Studium v Dánsku pro Čechy a Slováky | doDánska",
    template: "%s | doDánska",
  },
  description:
    "Najdi anglický program, připrav přihlášku, naplánuj stěhování a pochop SU. Praktický průvodce studiem v Dánsku krok za krokem.",
  other: {
    "codex-preview": "development",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="cs">
      <body>
        <a className="skip-link" href="#hlavni-obsah">
          Přeskočit na obsah
        </a>

        <SiteHeader />
        {children}
        <SiteFooter />

        {/* Cloudflare Web Analytics */}
        <script
          type="module"
          src="https://static.cloudflareinsights.com/beacon.min.js"
          data-cf-beacon='{"token":"0c3d02a76f1948a08e2bb1eb65111a91"}'
        ></script>
      </body>
    </html>
  );
}
