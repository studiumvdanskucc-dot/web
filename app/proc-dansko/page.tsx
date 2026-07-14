import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Proč studovat v Dánsku",
  description: "Výhody i realita studia v Dánsku: školné, SU, praktická výuka, dánština, města, komunita a životní náklady.",
};

const studyBenefits = [
  ["0 DKK", "Školné", "Občané EU/EEA na kvalifikovaných veřejných programech zpravidla školné neplatí."],
  ["EN", "Studium v angličtině", "Stovky programů se vyučují v angličtině — náš katalog jich nyní obsahuje 352."],
  ["↔", "Praxe a spolupráce", "Projekty, skupinová práce, diskuse a kontakt s firmami jsou běžnou součástí mnoha programů."],
];

export default function WhyDenmarkPage() {
  return <main id="hlavni-obsah">
    <section className="page-hero why-hero shell"><div className="page-hero-grid"><div><p className="eyebrow"><span /> Proč Dánsko</p><h1>Víc svobody.<br />Méně biflování.<br /><em>Hodně kola.</em></h1></div><p className="lead">Dánsko kombinuje kvalitní anglické programy, praktickou výuku a život, který se vejde mezi školu, práci, moře a přátele. Není levné ani bezstarostné — a právě proto plánujeme realisticky.</p></div></section>
    <section id="skolne" className="why-facts shell">{studyBenefits.map(([number, title, text]) => <article key={title}><strong>{number}</strong><h2>{title}</h2><p>{text}</p></article>)}</section>

    <section className="content-section shell"><div className="content-grid"><div><p className="eyebrow"><span /> Jiný styl školy</p><h2>Otázka bývá důležitější než správná odpověď.</h2></div><div className="content-body"><p>Dánská výuka často stojí na samostatnosti, diskusi a řešení skutečných problémů. Učitel je dostupný průvodce, ale nikdo tě nebude každý týden vodit za ruku. Počítej se skupinovými projekty, prezentacemi, četbou a vlastní odpovědností.</p><div className="cards-grid"><div className="info-card"><h3>Na křestní jméno</h3><p>Méně hierarchie může usnadnit otázky i spolupráci. Respekt se ukazuje přípravou a spolehlivostí.</p></div><div className="info-card"><h3>Projekt není „měkký“</h3><p>Rozdělit práci, dát si zpětnou vazbu a obhájit rozhodnutí je součást odbornosti.</p></div></div><div className="callout callout-mint"><strong>Dobré pro tebe, pokud…</strong><p>chceš věci zkoušet, umíš se ozvat, sneseš nejednoznačnost a raději vytváříš řešení, než jen reprodukuješ skripta.</p></div></div></div></section>

    <section className="life-feature"><div className="shell"><div className="life-image"><Image src="/images/student-life.png" alt="Studenti společně večeří v útulném dánském bytě" width={1400} height={1050} sizes="(max-width: 900px) 100vw, 50vw" /></div><div><p className="eyebrow eyebrow-light"><span /> Hygge bez katalogového filtru</p><h2>Klid, komunita a místo u vody.</h2><p>Hygge není dekorace. Je to společná večeře, svíčky v temném listopadu, páteční bar na kampusu a pocit, že nemusíš každou minutu dokazovat výkon. K tomu pláže, přístavy, parky, čistý design a města stavěná pro kolo.</p><ul><li>studentské Friday bars a spolky</li><li>krátké vzdálenosti a každodenní cyklistika</li><li>mezinárodní spolužáci a angličtina od prvního dne</li><li>bezpečné veřejné prostory a blízkost přírody</li></ul></div></div></section>

    <section className="content-section shell"><div className="content-grid"><div><p className="eyebrow"><span /> Dánština</p><h2>Začni anglicky. Postupně si odemkni dánštinu.</h2></div><div className="content-body"><p>Na anglickém programu můžeš studovat bez dánštiny. Pro práci, přátele a pocit domova ale i základní dánština znamená velký rozdíl.</p><p>Oficiální dánské kurzy bývají pro způsobilé dospělé rezidenty po doporučení obce bez kurzovného. Ne vždy jsou úplně bez počátečního výdaje: například Kodaň a Aarhus v roce 2026 uvádějí vratný depozit 2 000 DKK a vlastní podmínky účasti.</p><a className="source-line" href="https://lifeindenmark.borger.dk/school-and-education/learning-danish/danish-language-training" target="_blank" rel="noreferrer">Oficiální informace o Danish education ↗</a></div></div></section>

    <section className="city-personalities shell content-section"><div className="tool-heading"><div><p className="eyebrow"><span /> Čtyři studentské rytmy</p><h2>Které město ti sedne?</h2></div><p>Program je první filtr. Město je každodenní život — nájem, dojíždění, komunita i tempo.</p></div><div className="city-personality-grid"><article><span>CPH</span><h3>Kodaň</h3><p>Velkoměsto, mezinárodní tempo, design a největší konkurence o bydlení.</p></article><article><span>AAR</span><h3>Aarhus</h3><p>Velká univerzitní energie v kompaktním městě blízko vody.</p></article><article><span>ODE</span><h3>Odense</h3><p>Klidnější rytmus, silná cyklistika a často přívětivější rozpočet.</p></article><article><span>AAL</span><h3>Aalborg</h3><p>Výrazná studentská komunita, projektová výuka a praktičtější ceny.</p></article></div></section>

    <section className="honest-grid shell content-section"><div><p className="eyebrow"><span /> Co milujeme</p><h2>Samostatnost, důvěra a prostor dýchat.</h2><ul><li>praktické programy v angličtině</li><li>otevřenější vztah s vyučujícími</li><li>studentské spolky, sport a Friday bars</li><li>kolo, voda, design a funkční města</li></ul></div><div><p className="eyebrow eyebrow-light"><span /> Co může bolet</p><h2>Drahý start, vítr a hledání práce.</h2><ul><li>vysoký depozit a nedostatek bydlení</li><li>SU není automatická</li><li>temná zima a každodenní vítr</li><li>dánština často otevírá více pracovních dveří</li></ul></div></section>

    <section className="next-step-band"><div className="shell"><div><p className="eyebrow eyebrow-light"><span /> Dává ti to smysl?</p><h2>Najdi program, ve kterém to začne.</h2></div><Link className="button button-light" href="/programy#dotaznik">Najít můj program →</Link></div></section>
  </main>;
}
