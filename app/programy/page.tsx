import type { Metadata } from "next";
import { ProgrammeExplorer } from "@/components/programme-explorer";

export const metadata: Metadata = {
  title: "Najdi studijní program v Dánsku",
  description: "Krátký dotazník a katalog anglických bakalářských a magisterských programů v Dánsku.",
};

export default function ProgrammesPage() {
  return <main id="hlavni-obsah">
    <section className="page-hero shell">
      <div className="page-hero-grid">
        <div><p className="eyebrow"><span /> Najdi program</p><h1>Vyber si program,<br />který ti vyhovuje.</h1></div>
        <p className="lead">Odpověz na několik krátkých otázek. Ukážeme ti skutečné programy z katalogu a vysvětlíme, proč odpovídají tvým zájmům.</p>
      </div>
    </section>
    <div className="page-band"><div className="shell page-band-inner"><strong>Doporučujeme jen skutečné programy.</strong><p>Dotazník pracuje přímo v prohlížeči a může doporučit pouze programy, které jsou uvedené v našem katalogu.</p></div></div>
    <ProgrammeExplorer />
  </main>;
}
