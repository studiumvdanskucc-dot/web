import type { Metadata } from "next";
import Link from "next/link";
import { SuTools } from "@/components/su-tools";

export const metadata: Metadata = {
  title: "SU v Dánsku pro české a slovenské studenty",
  description: "Co je dánské SU, kolik činí v roce 2026 a jak probíhá žádost EU studenta se statusem pracovníka.",
};

const steps = [
  ["Zařiď CPR a MitID", "Po EU pobytovém dokumentu registruj adresu a CPR, aktivuj MitID a Digital Post."],
  ["Najdi skutečnou práci", "Obecně 10–12 placených hodin každý týden, obvykle alespoň 10 týdnů a dál po dobu SU."],
  ["Uchovávej důkazy", "Smlouva, pásky, přesné timesheets, dovolená a komunikace o změnách."],
  ["Ověř CPR u školy", "SU office musí mít tvoje CPR správně spojené s aktivním zápisem."],
  ["Podej minSU + equal status", "Po běžné žádosti pokračuj formulářem pro zahraničního občana; dokonči ho do tří týdnů."],
  ["Čti Digital Post", "Rozhodnutí určí tvé podmínky. Změnu práce, hodin či studia hlásíš hned."],
];

export default function SuPage() {
  return <main id="hlavni-obsah">
    <section className="page-hero shell"><div className="page-hero-grid"><div><p className="eyebrow"><span /> SU bez mýtů</p><h1>Grant, který pomůže. Pravidla, která musíš brát vážně.</h1></div><div><p className="lead">SU je státní studijní grant. Běžná oprávněně vyplacená SU se nevrací. Pro studenta z EU ale není automatická.</p><a className="button" href="#co-potrebuji">Zjistit, co potřebuji ↓</a></div></div></section>
    <section className="su-facts shell">
      <article><span>7 426</span><h2>DKK měsíčně</h2><p>Pro studenta vysoké školy bydlícího mimo rodiče v roce 2026, před zdaněním.</p></article>
      <article><span>Ne</span><h2>běžná SU se nevrací</h2><p>Pokud byla vyplacena oprávněně. SU-lån je samostatná půjčka a neoprávněná SU se vrací.</p></article>
      <article><span>10–12</span><h2>hodin týdně</h2><p>Obecný worker rámec, zpravidla souvisle nejméně 10 týdnů. Každá žádost se posuzuje individuálně.</p></article>
    </section>
    <section className="content-section shell"><div className="content-grid"><div><p className="eyebrow"><span /> SU vs. SU-lån</p><h2>Grant není půjčka.</h2></div><div className="comparison-table"><div><span /><strong>SU</strong><strong>SU-lån</strong></div><div><span>Co to je</span><p>Státní studijní grant</p><p>Dobrovolná státní půjčka</p></div><div><span>Vrací se</span><p>Ne, při oprávněném čerpání</p><p>Ano</p></div><div><span>Úroky</span><p>Nejde o úvěr</p><p>Ano, podle podmínek</p></div></div></div></section>
    <section className="su-warning"><div className="shell"><div className="warning-number">43</div><div><p className="eyebrow eyebrow-light"><span /> Častý a nebezpečný mýtus</p><h2>Neřeš měsíční zkratku. Řeš každý týden.</h2><p>Číslo 43 je jen hrubý přepočet. Přesně 40 hodin v běžném měsíci nestačí už proto, že většina měsíců má více než čtyři týdny. Slabé týdny nedoháněj jednou dlouhou směnou.</p></div></div></section>
    <SuTools />
    <section className="content-section shell"><div className="tool-heading"><div><p className="eyebrow"><span /> Žádost krok za krokem</p><h2>Od práce k rozhodnutí.</h2></div><p>SU může být přiznána nejdříve od měsíce, kdy požádáš. Ne zpětně za předchozí měsíce.</p></div><div className="su-step-grid">{steps.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div><div className="callout callout-red"><strong>První týdny jsou citlivé</strong><p>Dovolená nebo propad hodin v prvních deseti týdnech může vést k ukončení SU a vrácení přeplatku. Když vidíš problém, nečekej na konec měsíce: kontaktuj SU office a uchovej důkazy.</p></div></section>
    <section className="content-section shell"><div className="content-grid"><div><p className="eyebrow"><span /> Příjem</p><h2>Hlídáš také roční limit.</h2></div><div className="content-body"><p>SU používá roční příjmový limit <em>fribeløb</em>. Pro měsíc roku 2026, kdy vysokoškolák dostává SU, je nejnižší měsíční složka 20 749 DKK před daní, ale po 8% labour-market contribution.</p><div className="callout callout-blue"><strong>Není to měsíční povolenka k výdělku.</strong><p>Konečný test je za celý kalendářní rok, jednotlivé měsíce mohou mít různé limity a započítávají se i další příjmy. Použij oficiální kalkulačku.</p></div><div className="official-links"><a href="https://www.su.dk/satser/saa-meget-maa-du-tjene/fribeloeb" target="_blank" rel="noreferrer">Oficiální pravidla fribeløb ↗</a><a href="https://www.su.dk/foreign-citizen/gb-foreign-citizen/equal-status-according-to-eu-law/you-are-working-in-denmark" target="_blank" rel="noreferrer">Worker pravidla pro EU ↗</a></div></div></div></section>
    <section className="next-step-band"><div className="shell"><div><p className="eyebrow eyebrow-light"><span /> Ještě nemáš adresu a CPR?</p><h2>Vrať se k pořadí po příjezdu.</h2></div><Link className="button button-light" href="/stehovani#bydleni">Bydlení a první úřady →</Link></div></section>
  </main>;
}
