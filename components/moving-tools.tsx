"use client";

import { useEffect, useMemo, useState } from "react";

const fields = [
  { key: "rent", label: "Měsíční nájem", default: 5500 },
  { key: "depositMonths", label: "Depozit (počet nájmů)", default: 3 },
  { key: "prepaidMonths", label: "Předplacený nájem (měsíce)", default: 1 },
  { key: "food", label: "Jídlo na měsíc", default: 2800 },
  { key: "transport", label: "Doprava na měsíc", default: 400 },
  { key: "personal", label: "Telefon, pojištění a osobní výdaje", default: 1800 },
  { key: "travel", label: "Cesta do Dánska", default: 1000 },
  { key: "room", label: "Základní vybavení pokoje", default: 1500 },
  { key: "months", label: "Měsíce bez práce / SU", default: 2 },
  { key: "emergency", label: "Nouzová rezerva", default: 5000 },
] as const;

type FieldKey = typeof fields[number]["key"];

const cities = [
  {
    id: "copenhagen", name: "Kodaň", headline: "Největší výběr. Také největší konkurence.",
    text: "Začni stránkou o bydlení na webu své školy. s.dk a KKIK sdružují mnoho kolejí a studentských možností. Počítej také s bydlením mimo centrum a dojížděním.",
    links: [{ label: "s.dk / mit.s.dk", href: "https://mit.s.dk" }, { label: "KKIK", href: "https://www.kollegierneskontor.dk" }, { label: "Housing guide UCPH", href: "https://www.ku.dk/studies/student-life/housing" }],
    note: "Orientační kodaňský nájem publikovaný UCPH je přibližně 4 000–10 000+ DKK měsíčně.",
  },
  {
    id: "aarhus", name: "Aarhus", headline: "Seniorita se počítá. Registruj se včas.",
    text: "StudentHousingAarhus je hlavní portál pro studentské bydlení. Podle návodu AU se můžeš registrovat od 17 let i bez potvrzení o přijetí. Přibližně tři měsíce před nastěhováním žádost aktivuj.",
    links: [{ label: "StudentHousingAarhus", href: "https://studenthousingaarhus.com" }, { label: "Housing guide AU", href: "https://international.au.dk/life/locations/housing/auhousing/student-housing-aarhus" }],
    note: "U některých nabídek může počáteční platba odpovídat zhruba 4–6 nájmům. Podmínky pro studenty si ověř přímo u nabídky.",
  },
  {
    id: "odense", name: "Odense", headline: "SDU má vlastní proces a podmíněnou garanci.",
    text: "Způsobilí zahraniční studenti mohou žádat přes SDU Housing. Škola umožňuje podat žádost ještě před konečným přijetím. Garance platí jen při splnění všech podmínek a termínu.",
    links: [{ label: "SDU Housing portal", href: "https://sduhousing.sdu.dk" }, { label: "Housing guide SDU", href: "https://www.sdu.dk/en/uddannelse/studenthousing/odense" }],
    note: "Pro nástup v roce 2026 SDU uvádí termín 1. května ve 23:59 pro září a 1. listopadu pro únor. Pro další rok si termín ověř znovu.",
  },
  {
    id: "aalborg", name: "Aalborg", headline: "Začni u AAU Accommodation Office.",
    text: "AAU nabízí mezinárodním studentům různé typy pokojů a bytů. Přesné ceny zkontroluj přímo v aktuální nabídce.",
    links: [{ label: "AAU Accommodation", href: "https://www.en.aau.dk/living-in-denmark/accommodation/international-students-in-aalborg" }],
    note: "AAU uvádí, že se u tohoto typu bydlení může nájem platit po třech měsících. Zahrň tuto částku do svého rozpočtu.",
  },
];

const arrivalItems = [
  "EU pobytový dokument, pokud zůstávám déle než tři měsíce",
  "Registrace adresy a CPR",
  "MitID a Digital Post",
  "Bankovní účet a NemKonto",
  "Daňová karta",
  "Studentská práce",
  "Žádost o SU a rovnocenné postavení (equal status), pokud splňuji podmínky",
];

export function MovingTools() {
  const [values, setValues] = useState<Record<FieldKey, number>>(() => Object.fromEntries(fields.map((item) => [item.key, item.default])) as Record<FieldKey, number>);
  const [activeCity, setActiveCity] = useState("copenhagen");
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try { setDone(JSON.parse(localStorage.getItem("dodanska-arrival-checklist") || "[]")); } catch { /* empty */ }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const total = useMemo(() => {
    const housing = values.rent * (1 + values.depositMonths + values.prepaidMonths);
    const living = (values.food + values.transport + values.personal) * values.months;
    return housing + living + values.travel + values.room + values.emergency;
  }, [values]);

  const city = cities.find((item) => item.id === activeCity)!;

  function update(key: FieldKey, raw: string) {
    setValues((current) => ({ ...current, [key]: Math.max(0, Number(raw) || 0) }));
  }

  function toggle(item: string) {
    const next = done.includes(item) ? done.filter((value) => value !== item) : [...done, item];
    setDone(next);
    localStorage.setItem("dodanska-arrival-checklist", JSON.stringify(next));
  }

  return <>
    <section id="rozpocet" className="content-section shell">
      <div className="tool-heading"><div><p className="eyebrow"><span /> Vlastní čísla</p><h2>Kolik peněz potřebuji při příjezdu?</h2></div><p>Zadej nájemní podmínky a počet měsíců, na které si chceš připravit rezervu bez příjmu z práce nebo SU.</p></div>
      <div className="budget-tool">
        <div className="budget-fields">
          {fields.map((field) => <label key={field.key}>{field.label}<span><input type="number" min="0" step={field.key.includes("Months") || field.key === "months" ? "1" : "100"} value={values[field.key]} onChange={(event) => update(field.key, event.target.value)} />{field.key.includes("Months") || field.key === "months" ? "×" : "DKK"}</span></label>)}
        </div>
        <div className="budget-result">
          <p>Tvůj plánovací startovní rozpočet</p>
          <strong>{new Intl.NumberFormat("cs-CZ").format(total)} <small>DKK</small></strong>
          <div className="budget-breakdown">
            <span><b>{new Intl.NumberFormat("cs-CZ").format(values.rent * (1 + values.depositMonths + values.prepaidMonths))} DKK</b> bydlení při podpisu</span>
            <span><b>{new Intl.NumberFormat("cs-CZ").format((values.food + values.transport + values.personal) * values.months)} DKK</b> běžný život bez příjmu</span>
            <span><b>{new Intl.NumberFormat("cs-CZ").format(values.travel + values.room + values.emergency)} DKK</b> cesta, vybavení a rezerva</span>
          </div>
          <p className="budget-note">Není to cenová nabídka ani oficiální minimum. Dosaď přesná čísla z nájemní smlouvy a nespoléhej, že práce nebo SU začnou první měsíc.</p>
        </div>
      </div>
    </section>

    <section id="bydleni" className="housing-section">
      <div className="shell">
        <div className="tool-heading"><div><p className="eyebrow eyebrow-light"><span /> Bydlení podle města</p><h2>Začni u školy a potom hledej i jinde.</h2></div><p>Každé město má jiný systém. Některé portály zohledňují délku registrace a někde můžeš požádat ještě před konečným přijetím.</p></div>
        <div className="city-tabs" role="tablist" aria-label="Vyber město">{cities.map((item) => <button key={item.id} role="tab" aria-selected={activeCity === item.id} onClick={() => setActiveCity(item.id)}>{item.name}</button>)}</div>
        <article className="city-panel" role="tabpanel">
          <div><p className="eyebrow"><span /> {city.name}</p><h3>{city.headline}</h3><p>{city.text}</p><div className="portal-links">{city.links.map((link) => <a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label} ↗</a>)}</div></div>
          <div className="city-note"><strong>Co vědět</strong><p>{city.note}</p></div>
        </article>
        <div className="commercial-portals"><strong>Další komerční portály</strong><div>{[["BoligPortal", "https://www.boligportal.dk"], ["Lejebolig", "https://www.lejebolig.dk"], ["BoligHub", "https://www.bolighub.dk"], ["BoligZonen", "https://boligzonen.dk"], ["DBA", "https://www.dba.dk"]].map(([label, href]) => <a key={href} href={href} target="_blank" rel="noreferrer">{label} ↗</a>)}</div><p>Některé vyžadují předplatné a nabídka není automaticky ověřená. Nikdy neposílej peníze jen na základě chatu.</p></div>
      </div>
    </section>

    <section className="content-section shell"><div className="content-grid"><div><p className="eyebrow"><span /> První týdny</p><h2>Úřady ve správném pořadí.</h2><p className="section-side-note">Konkrétní dokumenty a objednávání termínu se liší podle obce. Začni oficiálním International Citizen Service.</p></div><div><div className="interactive-checklist arrival-checklist">{arrivalItems.map((item, index) => <label className={done.includes(item) ? "checked" : ""} key={item}><input type="checkbox" checked={done.includes(item)} onChange={() => toggle(item)} /><span aria-hidden="true">✓</span><b>0{index + 1}</b>{item}</label>)}</div><div className="callout callout-blue"><strong>Proč toto pořadí?</strong><p>Další krok často potřebuje výsledek předchozího: adresa pro CPR, CPR pro MitID a účet, práce a dokumenty pro případnou žádost o SU.</p></div></div></div></section>

    <section className="content-section shell"><div className="content-grid"><div><p className="eyebrow"><span /> Bezpečný pronájem</p><h2>Neplať pod tlakem.</h2></div><div className="cards-grid"><div className="info-card"><h3>Než zaplatíš</h3><ul><li>Smlouva uvádí jméno, adresu, cenu a podmínky.</li><li>Víš, kdo smí byt pronajmout.</li><li>Ověřil/a jsi možnost registrace CPR.</li><li>Účet a jméno příjemce dávají smysl.</li></ul></div><div className="info-card"><h3>Červené vlajky</h3><ul><li>Cena je nápadně pod trhem.</li><li>Pronajímatel odmítá prohlídku i videohovor.</li><li>Chce platbu „do hodiny“.</li><li>Požaduje anonymní nebo nestandardní převod.</li></ul></div></div></div></section>
  </>;
}
