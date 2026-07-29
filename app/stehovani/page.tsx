import type { Metadata } from "next";
import Link from "next/link";
import { MovingTools } from "@/components/moving-tools";

export const metadata: Metadata = {
  title: "Stěhování do Dánska: bydlení a rozpočet",
  description: "Praktický plán stěhování do Dánska, kalkulačka počátečního rozpočtu, portály s bydlením a kontrolní seznam prvních úřadů.",
};

const timeline = [
  ["4–6 měsíců předem", "Žádosti o bydlení, finanční rezerva a širší oblast dojíždění."],
  ["Po přijetí", "Aktualizace žádostí o bydlení, pobytové dokumenty a rozpočet podle smlouvy."],
  ["2–6 týdnů předem", "Ověřená nájemní smlouva, cesta, kopie dokumentů a CV."],
  ["Po příjezdu", "EU pobyt, CPR, MitID, banka, daň, práce a případně SU."],
];

export default function MovingPage() {
  return <main id="hlavni-obsah">
    <section className="page-hero shell"><div className="page-hero-grid"><div><p className="eyebrow"><span /> Od přijetí k prvnímu týdnu</p><h1>Stěhování do Dánska krok za krokem.</h1></div><p className="lead">Nejdřív si připrav rozpočet a bydlení. Po příjezdu vyřeš pobytový dokument, CPR, MitID, banku a práci. Teprve potom může přijít žádost o SU.</p></div></section>
    <div className="timeline-strip">{timeline.map(([title, text], index) => <div key={title}><span>0{index + 1}</span><strong>{title}</strong><p>{text}</p></div>)}</div>
    <section className="moving-warning"><div className="shell"><p className="eyebrow eyebrow-light"><span /> Realistický rozpočet</p><h2>10 000 DKK většinou nestačí.</h2><p>V soukromém pronájmu může být požadován až tříměsíční depozit, až tři měsíce předplaceného nájmu a první nájem. Při nájmu 6 000 DKK tak může počáteční platba dosáhnout až 42 000 DKK.</p><a className="button button-light" href="#rozpocet">Spočítat vlastní rozpočet ↓</a></div></section>
    <MovingTools />
    <section className="next-step-band"><div className="shell"><div><p className="eyebrow eyebrow-light"><span /> Až najdeš práci</p><h2>Na SU nemáš nárok automaticky.</h2></div><Link className="button button-light" href="/su">Zjistit podmínky SU →</Link></div></section>
  </main>;
}
