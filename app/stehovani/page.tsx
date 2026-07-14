import type { Metadata } from "next";
import Link from "next/link";
import { MovingTools } from "@/components/moving-tools";

export const metadata: Metadata = {
  title: "Stěhování do Dánska: bydlení a rozpočet",
  description: "Praktický plán stěhování do Dánska, kalkulačka startovního rozpočtu, housing portály a checklist prvních úřadů.",
};

const timeline = [
  ["4–6 měsíců předem", "Housing žádosti, finanční polštář a širší oblast dojíždění."],
  ["Po přijetí", "Aktualizace housing žádostí, pobytové dokumenty a rozpočet podle smlouvy."],
  ["2–6 týdnů předem", "Ověřená nájemní smlouva, cesta, kopie dokumentů a CV."],
  ["Po příjezdu", "EU pobyt, CPR, MitID, banka, daň, práce a případně SU."],
];

export default function MovingPage() {
  return <main id="hlavni-obsah">
    <section className="page-hero shell"><div className="page-hero-grid"><div><p className="eyebrow"><span /> Od acceptance letter k prvnímu týdnu</p><h1>Přestěhovat se dá za den. Zařídit život chce plán.</h1></div><p className="lead">Nejdřív peníze a bydlení. Potom pobytový dokument, CPR, MitID, banka, práce — a až potom případná SU.</p></div></section>
    <div className="timeline-strip">{timeline.map(([title, text], index) => <div key={title}><span>0{index + 1}</span><strong>{title}</strong><p>{text}</p></div>)}</div>
    <section className="moving-warning"><div className="shell"><p className="eyebrow eyebrow-light"><span /> Realistický start</p><h2>10 000 DKK je spíš nouzovka než plán.</h2><p>V soukromém pronájmu může být legálně požadován až tříměsíční depozit, až tři měsíce předplaceného nájmu a první nájem. Při nájmu 6 000 DKK je to v krajním případě 42 000 DKK ještě před první večeří.</p><a className="button button-light" href="#rozpocet">Spočítat vlastní rozpočet ↓</a></div></section>
    <MovingTools />
    <section className="next-step-band"><div className="shell"><div><p className="eyebrow eyebrow-light"><span /> Až najdeš práci</p><h2>SU není automatické. Připrav se správně.</h2></div><Link className="button button-light" href="/su">SU krok za krokem →</Link></div></section>
  </main>;
}
