"use client";

import { useEffect, useMemo, useState } from "react";

const applicationItems = [
  "Jsem přijatý/á a aktivně zapsaný/á v programu s nárokem na SU",
  "Mám dánské CPR a MitID",
  "Kontroluji Digital Post",
  "Škola má moje CPR správně v systému",
  "Mám skutečnou placenou práci a smlouvu",
  "Uchovávám výplatní pásky a přesné rozpisy směn",
  "Podal/a jsem běžnou žádost v minSU",
  "Do tří týdnů jsem dokončil/a žádost o equal status",
  "Uložil/a jsem potvrzení a přečetl/a své rozhodnutí",
];

export function SuTools() {
  const [done, setDone] = useState<string[]>([]);
  const [hours, setHours] = useState<number[]>([12, 12, 12, 12, 12, 12, 12, 12, 12, 12]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try {
        setDone(JSON.parse(localStorage.getItem("dodanska-su-checklist") || "[]"));
        const saved = JSON.parse(localStorage.getItem("dodanska-su-hours") || "null");
        if (Array.isArray(saved) && saved.length === 10) setHours(saved);
      } catch { /* empty */ }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  function toggle(item: string) {
    const next = done.includes(item) ? done.filter((value) => value !== item) : [...done, item];
    setDone(next);
    localStorage.setItem("dodanska-su-checklist", JSON.stringify(next));
  }

  function updateWeek(index: number, value: string) {
    const next = hours.map((hoursValue, week) => week === index ? Math.max(0, Number(value) || 0) : hoursValue);
    setHours(next);
    localStorage.setItem("dodanska-su-hours", JSON.stringify(next));
  }

  const weakWeeks = useMemo(() => hours.map((value, index) => value < 10 ? index + 1 : null).filter(Boolean), [hours]);
  const total = hours.reduce((sum, value) => sum + value, 0);

  return <>
    <section id="co-potrebuji" className="content-section shell">
      <div className="tool-heading"><div><p className="eyebrow"><span /> Než otevřeš minSU</p><h2>Připrav podmínky, ne jen formulář.</h2></div><p>Typická worker cesta dává smysl teprve se skutečnou prací, CPR, MitID a aktivním zápisem. Odškrtni si, co už máš.</p></div>
      <div className="su-checklist-layout">
        <div className="interactive-checklist su-checklist">{applicationItems.map((item, index) => <label key={item} className={done.includes(item) ? "checked" : ""}><input type="checkbox" checked={done.includes(item)} onChange={() => toggle(item)} /><span aria-hidden="true">✓</span><b>{String(index + 1).padStart(2, "0")}</b>{item}</label>)}</div>
        <aside className="su-summary"><span>{done.length}/{applicationItems.length}</span><strong>připravených kroků</strong><p>Checklist je pomůcka, ne potvrzení nároku. Equal status posuzuje úřad individuálně.</p><a href="https://www.su.dk/foreign-citizen/gb-foreign-citizen/equal-status-according-to-eu-law/you-are-working-in-denmark" target="_blank" rel="noreferrer">Oficiální worker návod ↗</a></aside>
      </div>
    </section>

    <section id="hodiny" className="hours-section">
      <div className="shell">
        <div className="tool-heading"><div><p className="eyebrow eyebrow-light"><span /> Týden po týdnu</p><h2>43 hodin za měsíc tě neochrání.</h2></div><p>Oficiální obecný rámec mluví o 10–12 hodinách týdně, obvykle souvisle nejméně 10 týdnů. Rozhodující je tvé konkrétní rozhodnutí.</p></div>
        <div className="hours-tool">
          <div className="week-grid">{hours.map((value, index) => <label className={value < 10 ? "week-low" : ""} key={index}><span>Týden {index + 1}</span><input type="number" min="0" max="80" step="0.5" value={value} onChange={(event) => updateWeek(index, event.target.value)} /><small>hodin</small></label>)}</div>
          <div className={weakWeeks.length ? "hours-result hours-result-warning" : "hours-result hours-result-ok"}>
            <p>Celkem za 10 týdnů</p><strong>{total.toLocaleString("cs-CZ")} h</strong>
            {weakWeeks.length ? <p><b>Zkontroluj týden {weakWeeks.join(", ")}.</b> Měsíční součet nemusí napravit slabý týden. Zrušenou směnu řeš hned se zaměstnavatelem a SU office.</p> : <p><b>V každém týdnu máš alespoň 10 hodin.</b> To stále není záruka nároku — úřad posuzuje mzdu, délku a skutečný charakter práce a může vyžadovat 10–12 hodin podle situace.</p>}
          </div>
        </div>
      </div>
    </section>
  </>;
}
