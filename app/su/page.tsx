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
  ["Podej žádost v minSU", "Po běžné žádosti pokračuj formulářem pro rovnocenné postavení zahraničního občana a dokonči ho do tří týdnů."],
  ["Čti Digital Post", "Rozhodnutí určí tvé podmínky. Změnu práce, hodin či studia hlásíš hned."],
];

export default function SuPage() {
  return <main id="hlavni-obsah">
    <section className="page-hero shell"><div className="page-hero-grid"><div><p className="eyebrow"><span /> SU bez mýtů</p><h1>SU může pomoci, ale má jasné podmínky.</h1></div><div><p className="lead">SU je dánská státní podpora studentů. Pokud ji dostáváš oprávněně, běžná SU se nevrací. Student z EU na ni ale nemá nárok automaticky.</p><a className="button" href="#co-potrebuji">Zjistit, co potřebuji ↓</a></div></div></section>
    <section className="su-facts shell">
      <article><span>7 426</span><h2>DKK měsíčně</h2><p>Pro studenta vysoké školy bydlícího mimo rodiče v roce 2026, před zdaněním.</p></article>
      <article><span>Ne</span><h2>běžná SU se nevrací</h2><p>Pokud byla vyplacena oprávněně. SU-lån je samostatná půjčka a neoprávněná SU se vrací.</p></article>
      <article><span>10–12</span><h2>hodin týdně</h2><p>Obecné pravidlo pro status pracovníka, zpravidla souvisle nejméně 10 týdnů. Každá žádost se posuzuje individuálně.</p></article>
    </section>
    <section className="content-section shell"><div className="content-grid"><div><p className="eyebrow"><span /> SU vs. SU-lån</p><h2>Grant není půjčka.</h2></div><div className="comparison-table"><div><span /><strong>SU</strong><strong>SU-lån</strong></div><div><span>Co to je</span><p>Státní studijní grant</p><p>Dobrovolná státní půjčka</p></div><div><span>Vrací se</span><p>Ne, při oprávněném čerpání</p><p>Ano</p></div><div><span>Úroky</span><p>Nejde o úvěr</p><p>Ano, podle podmínek</p></div></div></div></section>
    <section className="su-warning"><div className="shell"><div className="warning-number">43</div><div><p className="eyebrow eyebrow-light"><span /> Častý omyl</p><h2>Nestačí hlídat měsíční součet. Kontroluj každý týden.</h2><p>Číslo 43 je jen hrubý měsíční přepočet. Většina měsíců má více než čtyři týdny, proto samotný měsíční součet nemusí stačit. Výpadek hodin v jednom týdnu neřeš jen delší směnou v jiném týdnu.</p></div></div></section>
    <SuTools />
    <section className="content-section shell"><div className="tool-heading"><div><p className="eyebrow"><span /> Žádost krok za krokem</p><h2>Jak požádat o SU.</h2></div><p>SU může být přiznána nejdříve od měsíce, kdy požádáš. Za předchozí měsíce ji zpětně nedostaneš.</p></div><div className="su-step-grid">{steps.map(([title, text], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{text}</p></article>)}</div><div className="callout callout-red"><strong>První týdny jsou důležité</strong><p>Dovolená nebo pokles hodin v prvních deseti týdnech může vést k ukončení SU a vrácení přeplatku. Pokud se objeví problém, kontaktuj školní SU oddělení a uchovej si doklady.</p></div></section>
    <section className="content-section shell"><div className="content-grid"><div><p className="eyebrow"><span /> Příjem</p><h2>Zkontroluj také roční příjmový limit.</h2></div><div className="content-body"><p>SU používá roční příjmový limit <em>fribeløb</em>. Pro měsíc roku 2026, kdy vysokoškolák dostává SU, je nejnižší měsíční složka 20 749 DKK před daní, ale po 8% příspěvku na trh práce.</p><div className="callout callout-blue"><strong>Limit není pevná měsíční částka.</strong><p>Konečný výpočet se dělá za celý kalendářní rok. Jednotlivé měsíce mohou mít různé limity a započítávají se i další příjmy. Použij oficiální kalkulačku.</p></div><div className="official-links"><a href="https://www.su.dk/satser/saa-meget-maa-du-tjene/fribeloeb" target="_blank" rel="noreferrer">Oficiální pravidla fribeløb ↗</a><a href="https://www.su.dk/foreign-citizen/gb-foreign-citizen/equal-status-according-to-eu-law/you-are-working-in-denmark" target="_blank" rel="noreferrer">Pravidla statusu pracovníka pro EU ↗</a></div></div></div></section>
    <section className="next-step-band"><div className="shell"><div><p className="eyebrow eyebrow-light"><span /> Ještě nemáš adresu a CPR?</p><h2>Zkontroluj kroky po příjezdu.</h2></div><Link className="button button-light" href="/stehovani#bydleni">Bydlení a první úřady →</Link></div></section>
  </main>;
}
