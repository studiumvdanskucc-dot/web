import type { Metadata } from "next";
import { ProgrammeExplorer } from "@/components/programme-explorer";

export const metadata: Metadata = {
  title: "Najdi studijní program v Dánsku",
  description: "Chytrý dotazník a filtrovatelný katalog anglických bakalářských a magisterských programů v Dánsku.",
};

export default function ProgrammesPage() {
  return <main id="hlavni-obsah">
    <section className="page-hero shell">
      <div className="page-hero-grid">
        <div><p className="eyebrow"><span /> Najdi program</p><h1>Ne podle prestiže.<br />Podle tebe.</h1></div>
        <p className="lead">Popiš, co tě baví, jak rád/a pracuješ a kam míříš. Dostaneš skutečné programy z katalogu — s vysvětlením, proč dávají smysl.</p>
      </div>
    </section>
    <div className="page-band"><div className="shell page-band-inner"><strong>Žádné vymyšlené obory.</strong><p>Matcher běží lokálně v prohlížeči, používá transparentní pravidla a může doporučit jen program, který existuje v dodané databázi.</p></div></div>
    <ProgrammeExplorer />
  </main>;
}
