import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Proč studovat v Dánsku",
  description: "Výhody i realita studia v Dánsku: školné, SU, praktická výuka, dánština, města, komunita a životní náklady.",
};

const studyBenefits = [
  ["0 DKK", "Školné", "Občané EU/EEA na kvalifikovaných veřejných programech zpravidla školné neplatí."],
  ["EN", "Studium v angličtině", "V Dánsku najdeš stovky vysokoškolských programů vyučovaných v angličtině."],
  ["↔", "Praxe a spolupráce", "Projekty, skupinová práce, diskuse a kontakt s firmami jsou běžnou součástí mnoha programů."],
];

export default function WhyDenmarkPage() {
  return <main id="hlavni-obsah">
    <section className="page-hero why-hero shell"><div className="page-hero-grid"><div><p className="eyebrow"><span /> Proč Dánsko</p><h1>Práce na reálných projektech.<br />Méně memorování.<br /><em>Study-Life Balance!</em></h1></div><p className="lead">Dánsko nabízí kvalitní programy v angličtině, praktickou výuku a mezinárodní prostředí. Když si bydlení a rozpočet začneš plánovat včas, můžeš si všechny tyto možnosti užít mnohem klidněji.</p></div></section>
    <section id="skolne" className="why-facts shell">{studyBenefits.map(([number, title, text]) => <article key={title}><strong>{number}</strong><h2>{title}</h2><p>{text}</p></article>)}</section>

    <section className="content-section shell"><div className="content-grid"><div><p className="eyebrow"><span /> Jak probíhá výuka</p><h2>Projektová výuka je standardem!</h2></div><div className="content-body"><p>Dánská výuka často stojí na samostatnosti, diskusi a řešení skutečných problémů. Vyučující ti poradí, ale velkou část odpovědnosti za přípravu a průběh projektu máš ty. Počítej se skupinovými projekty, prezentacemi, četbou a pravidelnou zpětnou vazbou.</p><div className="cards-grid"><div className="info-card"><h3>Vyučující oslovuješ křestním jménem!</h3><p>Méně hierarchie může usnadnit otázky i spolupráci. Respekt se ukazuje přípravou a spolehlivostí.</p></div><div className="info-card"><h3>Spolupráce patří k odbornosti</h3><p>Rozdělování práce, dávání zpětné vazby a obhajování rozhodnutí jsou součástí odbornosti.</p></div></div><div className="callout callout-mint"><strong>Tento styl ti může vyhovovat, pokud</strong><p>se chceš aktivně zapojovat, umíš se zeptat a raději hledáš řešení, než se učíš text nazpaměť.</p></div></div></div></section>

    <section className="life-feature"><div className="shell"><div className="life-image"><Image src="/images/student-life.png" alt="Studenti společně večeří v útulném dánském bytě" width={1400} height={1050} sizes="(max-width: 900px) 100vw, 50vw" unoptimized /></div><div><p className="eyebrow eyebrow-light"><span /> Každodenní život</p><h2>Studentské komunity, krátké vzdálenosti a příroda.</h2><p>Studentský život v Dánsku často tvoří společné večeře, akce na kampusu, sportovní kluby a další spolky. Města jsou dobře dostupná na kole a z mnoha kampusů se rychle dostaneš do parku, k moři nebo do centra.</p><ul><li>studentské bary a spolky</li><li>krátké vzdálenosti a každodenní cyklistika</li><li>mezinárodní spolužáci a angličtina od prvního dne</li><li>bezpečné veřejné prostory a blízkost přírody</li></ul></div></div></section>

    <section className="content-section shell"><div className="content-grid"><div><p className="eyebrow"><span /> Dánština</p><h2>Studovat můžeš anglicky. Dánština ti usnadní život.</h2></div><div className="content-body"><p>Na anglickém programu dánštinu většinou nepotřebuješ. I základní znalost jazyka ti ale může pomoci při hledání práce, na úřadech i v běžném životě.</p><p>Oficiální dánské kurzy bývají pro způsobilé dospělé rezidenty po doporučení obce bez kurzovného. Mohou však vyžadovat počáteční vratný depozit a pravidelnou účast. Přesné podmínky si vždy ověř ve své obci.</p><a className="source-line" href="https://lifeindenmark.borger.dk/school-and-education/learning-danish/danish-language-training" target="_blank" rel="noreferrer">Oficiální informace o kurzech dánštiny ↗</a></div></div></section>

    <section className="city-personalities shell content-section"><div className="tool-heading"><div><p className="eyebrow"><span /> Studentská města</p><h2>Které město ti vyhovuje?</h2></div><p>Studijní program je nejdůležitější. Město ale ovlivní nájem, dojíždění, volný čas i celkový rozpočet.</p></div><div className="city-personality-grid"><article><span>CPH</span><h3>Kodaň</h3><p>Velkoměsto, mezinárodní prostředí a největší konkurence při hledání bydlení.</p></article><article><span>AAR</span><h3>Aarhus</h3><p>Velké univerzitní město s kompaktním centrem a blízkostí moře.</p></article><article><span>ODE</span><h3>Odense</h3><p>Klidnější město, dobrá doprava na kole a často nižší náklady než v Kodani.</p></article><article><span>AAL</span><h3>Aalborg</h3><p>Silná studentská komunita, projektová výuka a obvykle dostupnější bydlení.</p></article></div></section>

    <section className="honest-grid shell content-section"><div><p className="eyebrow"><span /> Výhody</p><h2>Praktické studium a větší samostatnost.</h2><ul><li>programy v angličtině</li><li>otevřenější komunikace s vyučujícími</li><li>studentské spolky, sport a akce na kampusu</li><li>města vhodná pro kolo a blízkost přírody</li></ul></div><div><p className="eyebrow eyebrow-light"><span /> Dobré vědět</p><h2>Začátek chce trochu přípravy.</h2><ul><li>bydlení je dobré hledat včas a počítat s počáteční platbou</li><li>SU nedostaneš automaticky — je potřeba splnit podmínky</li><li>v zimě jsou dny kratší a někdy fouká</li><li>dánština ti může otevřít více pracovních možností</li></ul></div></section>

    <section className="next-step-band"><div className="shell"><div><p className="eyebrow eyebrow-light"><span /> Chceš pokračovat?</p><h2>Najdi program, který ti vyhovuje.</h2></div><Link className="button button-light" href="/programy#dotaznik">Najít program →</Link></div></section>
  </main>;
}
