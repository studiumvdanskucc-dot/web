"use client";

import { useEffect, useState } from "react";

type Path = "bachelor" | "master";

const steps: Record<Path, Array<{ title: string; when: string; body: string; items: string[]; warning?: string }>> = {
  bachelor: [
    {
      title: "Vyber program a otevři požadavky školy",
      when: "Podzim – leden",
      body: "Na webu programu najdi admission requirements pro uchazeče s nedánským středoškolským vzděláním. Zapiš si požadované předměty, úroveň angličtiny, intake a případné portfolio nebo přijímačky.",
      items: ["Ověřil/a jsem, že program přijímá pro příští intake", "Uložil/a jsem si přímý odkaz na požadavky", "Rozumím požadovaným předmětům a angličtině"],
    },
    {
      title: "Připrav dokumenty",
      when: "Ideálně do února",
      body: "Připrav vysvědčení a přehled předmětů. Pokud maturuješ až na jaře, nahraj dostupná ročníková vysvědčení a později doplň maturitní doklad podle pokynů školy. Názvy souborů drž krátké a srozumitelné.",
      items: ["Vysvědčení / výpis známek", "Maturitní vysvědčení, pokud už existuje", "Doklad totožnosti", "Doklad o angličtině, pokud ho škola vyžaduje", "Portfolio nebo další příloha, pokud je uvedena"],
      warning: "Překlad se řídí konkrétní školou. Nahrávej originál i požadovaný překlad; neobjednávej drahý úřední překlad dřív, než ověříš formu v požadavcích programu.",
    },
    {
      title: "Založ přihlášku na Optagelse.dk",
      when: "Po otevření portálu",
      body: "Otevři optagelse.dk, zvol angličtinu a přihlášení bez dánského MitID. Vyhledej program a přidej ho mezi priority. U jednoho programu zvol správný název školy, kampus a začátek studia.",
      items: ["Kontaktní údaje jsou bez překlepů", "Vybral/a jsem správný kampus a intake", "Programy jsou seřazené podle skutečné preference"],
      warning: "Pořadí je důležité: můžeš dostat nabídku jen na nejvýše umístěnou prioritu, pro kterou splníš podmínky. Nedávej na první místo obor jen proto, že působí snáz.",
    },
    {
      title: "Nahraj přílohy ke správným programům",
      when: "Před odesláním",
      body: "V části Attachments přidej každý dokument a zkontroluj, ke kterým prioritám se připojí. Škola musí soubor otevřít a pochopit bez hádání, co obsahuje.",
      items: ["Každý soubor je čitelný a správně otočený", "Dokument je připojen ke všem relevantním prioritám", "Originál a překlad jsou jasně označené", "Po nahrání jsem soubor znovu otevřel/a"],
    },
    {
      title: "Odešli a podepiš signature page",
      when: "Nejpozději 15. března ve 12:00 dánského času",
      body: "Uchazeč bez MitID obvykle po odeslání vytiskne podpisovou stránku pro každou přihlášku, podepíše ji a doručí podle instrukcí dané školy. Samotné kliknutí na odeslat nemusí přihlášku dokončit.",
      items: ["Přihláška je odeslaná", "Signature page je podepsaná", "Poslal/a jsem ji přesně způsobem, který uvádí škola", "Mám potvrzení nebo kopii odeslání"],
      warning: "Pro uchazeče s českým nebo slovenským středoškolským vzděláním je prakticky klíčový termín 15. března ve 12:00. Nespoléhej na termín 5. července určený pro jiné situace.",
    },
    {
      title: "Sleduj zprávy a doplň finální dokumenty",
      when: "Jaro – léto",
      body: "Kontroluj e-mail, spam i portál školy. Pokud letos maturuješ, škola řekne, kam a do kdy dodat finální maturitní vysvědčení. Nabídku přijetí potvrď v uvedené lhůtě.",
      items: ["Pravidelně kontroluji e-mail a spam", "Dodal/a jsem finální maturitní dokument", "Potvrdil/a jsem nabídku včas"],
    },
  ],
  master: [
    {
      title: "Najdi přihlášku na webu konkrétní univerzity",
      when: "Začni 9–12 měsíců předem",
      body: "Magisterské programy nemají jeden společný portál ani společný termín. Každá univerzita používá vlastní systém a stanoví termín podle občanství, předchozího titulu a intake.",
      items: ["Našel/a jsem oficiální stránku programu", "Zapsal/a jsem si deadline pro EU/EEA uchazeče", "Vím, v jakém portálu se podává přihláška"],
    },
    {
      title: "Porovnej svůj bakalářský obsah s požadavky",
      when: "Před objednáváním dokumentů",
      body: "Nestačí podobný název oboru. Škola často počítá ECTS v konkrétních oblastech. Udělej si tabulku: požadovaná oblast, tvůj předmět, ECTS, krátký sylabus a odkaz na course description.",
      items: ["Mám transcript of records", "Mám popisy relevantních předmětů", "Zkontroloval/a jsem požadované ECTS", "Vím, zda škola chce self-assessment form"],
      warning: "Náš matcher ECTS shodu neposuzuje. O akademické způsobilosti rozhoduje výhradně univerzita.",
    },
    {
      title: "Připrav akademické a jazykové doklady",
      when: "1–3 měsíce před termínem",
      body: "Běžně budeš potřebovat diplom nebo potvrzení o probíhajícím studiu, transcript, doklad o angličtině a případně sylaby, CV, motivační text či portfolio. Přesný seznam se liší program od programu.",
      items: ["Diplom / potvrzení o studiu", "Transcript s ECTS nebo kredity", "Oficiální popisy předmětů", "Doklad o angličtině", "CV, motivace či portfolio, pokud jsou vyžadované"],
    },
    {
      title: "Vyplň univerzitní portál a odešli včas",
      when: "Podle univerzity",
      body: "Vyplň předchozí vzdělání přesně podle dokladů, přilož čitelné soubory a před odesláním projdi souhrn. Ulož si potvrzení přihlášky a číslo případu.",
      items: ["Údaje odpovídají dokumentům", "Všechny povinné přílohy jsou nahrané", "Mám potvrzení a číslo přihlášky"],
    },
    {
      title: "Reaguj na žádosti a potvrď nabídku",
      when: "Po podání",
      body: "Univerzita může chtít doplnění nebo ověření dokumentů. Sleduj portál i e-mail a potvrď nabídku přijetí do data uvedeného v rozhodnutí.",
      items: ["Kontroluji portál, e-mail a spam", "Doplnil/a jsem požadované dokumenty", "Potvrdil/a jsem nabídku včas"],
    },
  ],
};

export function ApplicationGuide() {
  const [path, setPath] = useState<Path>("bachelor");
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      try { setDone(JSON.parse(localStorage.getItem("dodanska-application-checklist") || "[]")); } catch { /* empty */ }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  function toggle(id: string) {
    const next = done.includes(id) ? done.filter((item) => item !== id) : [...done, id];
    setDone(next);
    localStorage.setItem("dodanska-application-checklist", JSON.stringify(next));
  }

  const total = steps[path].reduce((sum, step) => sum + step.items.length, 0);
  const completed = steps[path].flatMap((step, index) => step.items.map((_, itemIndex) => `${path}-${index}-${itemIndex}`)).filter((id) => done.includes(id)).length;

  return <>
    <div className="path-switcher" role="group" aria-label="Vyber typ přihlášky">
      <button type="button" className={path === "bachelor" ? "active" : ""} onClick={() => setPath("bachelor")}><span>Po maturitě</span>Bakalář</button>
      <button type="button" className={path === "master" ? "active" : ""} onClick={() => setPath("master")}><span>Po bakaláři</span>Master</button>
    </div>
    <div className="checklist-toolbar">
      <div><strong>{completed}/{total}</strong><span>hotovo v tomto prohlížeči</span></div>
      <div className="progress-track" aria-hidden="true"><span style={{ width: `${total ? (completed / total) * 100 : 0}%` }} /></div>
      <button type="button" onClick={() => window.print()}>Vytisknout postup ↗</button>
    </div>
    <div className="step-list">
      {steps[path].map((step, index) => <article className="guide-step" key={step.title}>
        <div className="step-marker"><span>{String(index + 1).padStart(2, "0")}</span><i /></div>
        <div className="step-content">
          <p className="step-when">{step.when}</p>
          <h2>{step.title}</h2>
          <p>{step.body}</p>
          {step.warning && <div className="callout callout-red"><strong>Pozor</strong><p>{step.warning}</p></div>}
          <div className="interactive-checklist">
            {step.items.map((item, itemIndex) => {
              const id = `${path}-${index}-${itemIndex}`;
              return <label key={item} className={done.includes(id) ? "checked" : ""}><input type="checkbox" checked={done.includes(id)} onChange={() => toggle(id)} /><span aria-hidden="true">✓</span>{item}</label>;
            })}
          </div>
        </div>
      </article>)}
    </div>
  </>;
}
