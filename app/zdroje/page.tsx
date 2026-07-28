import type { Metadata } from "next";

export const metadata: Metadata = { title: "Zdroje a aktualizace", description: "Oficiální zdroje pro přijímání, pobyt, bydlení a SU v Dánsku a informace o aktualizaci průvodce." };

const sourceGroups = [
  { title: "Programy a přijímání", links: [
    ["Study in Denmark — programový katalog", "https://studyindenmark.dk/portal"],
    ["Optagelse.dk — bakalářské přihlášky", "https://www.optagelse.dk"],
    ["Study in Denmark — how to apply", "https://studyindenmark.dk/study-options/how-to-apply"],
  ]},
  { title: "Pobyt a první úřady", links: [
    ["SIRI — EU residence as a student", "https://www.nyidanmark.dk/en-GB/You-want-to-apply/Residence-as-a-Nordic-citizen-or-EU-or-EEA-citizen/Union-citizen-student"],
    ["Life in Denmark — CPR registration", "https://lifeindenmark.borger.dk/theme/when-you-arrive"],
    ["International Citizen Service", "https://lifeindenmark.borger.dk/settle-in-denmark/ics-international-citizen-service"],
  ]},
  { title: "SU a práce", links: [
    ["SU — worker status for EU citizens", "https://www.su.dk/foreign-citizen/gb-foreign-citizen/equal-status-according-to-eu-law/you-are-working-in-denmark"],
    ["SU — sazba vysokoškoláka mimo domov", "https://www.su.dk/satser/videregaaende-uddannelser-satser-for-su-til-udeboende"],
    ["SU — fribeløb", "https://www.su.dk/satser/saa-meget-maa-du-tjene/fribeloeb"],
    ["Workindenmark", "https://workindenmark.dk"],
  ]},
  { title: "Bydlení a rozpočet", links: [
    ["Study in Denmark — bank & budget", "https://studyindenmark.dk/live-in-denmark/bank-budget"],
    ["Life in Denmark — renting a home", "https://lifeindenmark.borger.dk/housing-and-moving/rental-property/renting-a-home"],
    ["UCPH — housing", "https://www.ku.dk/studies/student-life/housing"],
    ["Aarhus University — student housing", "https://international.au.dk/life/locations/housing/auhousing/student-housing-aarhus"],
    ["SDU — housing in Odense", "https://www.sdu.dk/en/uddannelse/studenthousing/odense"],
    ["AAU — accommodation", "https://www.en.aau.dk/living-in-denmark/accommodation/international-students-in-aalborg"],
  ]},
];

export default function SourcesPage() {
  return <main id="hlavni-obsah">
    <section className="page-hero shell"><div className="page-hero-grid"><div><p className="eyebrow"><span /> Zdroje a opravy</p><h1>Ověřuj informace u původního zdroje.</h1></div><p className="lead">Pravidla se mění. Proto rozlišujeme oficiální informace, praktické odhady a osobní zkušenosti. U důležitých údajů uvádíme také datum kontroly.</p></div></section>
    <div className="page-band"><div className="shell page-band-inner"><strong>Poslední velká kontrola: 14. 7. 2026</strong><p>Programový katalog doporučujeme obnovovat měsíčně od listopadu do března a mimo sezónu alespoň čtvrtletně.</p></div></div>
    <section className="content-section shell"><div className="content-grid"><div><p className="eyebrow"><span /> Jak pracujeme</p><h2>Jak informace rozlišujeme.</h2></div><div className="source-methods"><article><span>01</span><h3>Oficiální informace</h3><p>Částka, termín nebo právní podmínka. Odkazujeme přímo na úřad, školu nebo veřejnou službu.</p></article><article><span>02</span><h3>Praktický odhad</h3><p>Například doporučený počáteční rozpočet. Vysvětlujeme, z čeho odhad vychází, a neoznačujeme ho za zákonné minimum.</p></article><article><span>03</span><h3>Osobní zkušenost</h3><p>Co nám fungovalo nebo co bývá obtížné. Pomáhá s orientací, ale nenahrazuje požadavky konkrétní instituce.</p></article></div></div></section>
    <section className="sources-directory"><div className="shell"><div className="tool-heading"><div><p className="eyebrow eyebrow-light"><span /> Přímé odkazy</p><h2>Kde ověřovat pravidla.</h2></div><p>U každého programu otevři také web konkrétní školy. Náš katalog slouží k orientaci, ale nerozhoduje o přijetí.</p></div><div className="source-group-grid">{sourceGroups.map((group) => <article key={group.title}><h3>{group.title}</h3>{group.links.map(([label, href]) => <a key={href} href={href} target="_blank" rel="noreferrer">{label}<span>↗</span></a>)}</article>)}</div></div></section>
    <section className="content-section shell"><div className="content-grid"><div><p className="eyebrow"><span /> Našel/a jsi chybu?</p><h2>Chyby opravujeme.</h2></div><div className="content-body"><p>Pokud je odkaz nefunkční nebo se pravidlo změnilo, pošli nám stránku zdroje, datum kontroly a krátký popis. Důležité informace si vždy ověř také přímo u školy nebo úřadu.</p><div className="callout callout-yellow"><strong>Co pravidelně kontrolovat</strong><p>Termíny přihlášek, otevřené nástupy, sazby SU, podmínky statusu pracovníka, záruky bydlení, depozity u jazykových kurzů a odkazy univerzit.</p></div></div></div></section>
  </main>;
}
