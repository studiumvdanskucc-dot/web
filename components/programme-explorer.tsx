"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";

type Level = "bachelor" | "master";

type Programme = {
  id: string;
  title: string;
  level: Level;
  institution: string;
  city: string;
  duration: string | null;
  topics: string[];
  description: string;
  officialProgrammeUrl: string;
  sourceUrl: string;
  lastChecked: string;
};

type Catalogue = {
  meta: { includedTotal: number; counts: Record<Level, number>; generatedAt: string; warning: string };
  programmes: Programme[];
};

const topicLabels: Record<string, string> = {
  "business-management": "byznys a management",
  "it-data": "IT a data",
  "engineering-technology": "inženýrství a technologie",
  "design-architecture-arts": "design, architektura a umění",
  "health-life-science": "zdravotní a biologické obory",
  "natural-science": "přírodní vědy",
  "sustainability-climate": "udržitelnost a klima",
  "society-politics": "společnost a politika",
  "humanities-culture": "humanitní obory a kultura",
  "communication-media": "komunikace a média",
  "education-learning": "vzdělávání",
  law: "právo",
  other: "další obory",
};

const synonyms: Record<string, string[]> = {
  "business-management": ["business", "byznys", "firma", "podnik", "management", "rizeni", "strategie", "marketing", "brand", "znack", "finance", "ucetnict", "ekonom", "startup", "innovation", "biznis", "manazment"],
  "it-data": ["it", "pocitac", "program", "kod", "software", "aplikac", "web", "data", "analyt", "umela inteligence", "ai", "machine learning", "kyber", "robot", "computer"],
  "engineering-technology": ["techn", "inzenyr", "stroj", "mechan", "elektro", "energ", "vyrob", "material", "stavb", "mechatron", "engineering"],
  "design-architecture-arts": ["design", "navrh", "architekt", "mesto", "budov", "produkt", "grafik", "umen", "hudb", "film", "moda", "kreat", "art"],
  "health-life-science": ["zdrav", "medic", "nemoc", "telo", "vyziv", "farmac", "biomed", "sport", "mozek", "mozog", "health", "psycholog"],
  "natural-science": ["biolog", "chemi", "fyzik", "matemat", "labor", "vyzkum", "vyskum", "prirod", "molekul", "geolog", "neuro", "cognitive"],
  "sustainability-climate": ["klima", "udrzitel", "zivotni prostredi", "obnovitel", "green", "circular", "sustainability", "environment"],
  "society-politics": ["spolecnost", "polit", "mezinarodni vztah", "lidi", "nerovnost", "migrac", "bezpecnost", "sociolog", "behaviour", "behavior"],
  "humanities-culture": ["histor", "jazyk", "kultur", "literatur", "filozof", "humanit", "language"],
  "communication-media": ["komunik", "medi", "zurnal", "socialni site", "obsah", "pribeh", "psan", "journal"],
  "education-learning": ["ucit", "skol", "vzdel", "deti", "pedagog", "learning", "education"],
  law: ["pravo", "zakon", "soud", "regulac", "legal", "law"],
};

const workStyles = [
  { id: "people", label: "S lidmi", topics: ["society-politics", "health-life-science", "education-learning", "business-management"] },
  { id: "numbers-data", label: "S čísly a daty", topics: ["it-data", "business-management", "natural-science", "engineering-technology"] },
  { id: "ideas-stories", label: "S nápady a příběhy", topics: ["communication-media", "humanities-culture", "design-architecture-arts"] },
  { id: "technology", label: "S technologiemi", topics: ["it-data", "engineering-technology", "design-architecture-arts"] },
  { id: "nature-lab", label: "V přírodě nebo laboratoři", topics: ["natural-science", "health-life-science", "sustainability-climate"] },
  { id: "mixed", label: "Mix všeho", topics: [] },
];

const goals = [
  { label: "Vytvářet produkty", topics: ["design-architecture-arts", "engineering-technology", "it-data", "business-management"] },
  { label: "Pomáhat lidem", topics: ["health-life-science", "education-learning", "society-politics"] },
  { label: "Zlepšovat firmy", topics: ["business-management", "it-data", "communication-media"] },
  { label: "Pracovat s daty", topics: ["it-data", "natural-science", "business-management"] },
  { label: "Chránit klima", topics: ["sustainability-climate", "engineering-technology", "natural-science"] },
  { label: "Navrhovat města nebo věci", topics: ["design-architecture-arts", "engineering-technology"] },
  { label: "Dělat výzkum", topics: ["natural-science", "health-life-science", "society-politics", "engineering-technology"] },
  { label: "Ještě nevím", topics: [] },
];

const normalize = (value: string) => value.normalize("NFKD").replace(/[\u0300-\u036f]/g, "").toLowerCase().replace(/[^a-z0-9+#]+/g, " ").replace(/\s+/g, " ").trim();

function toggle<T>(values: T[], value: T) {
  return values.includes(value) ? values.filter((item) => item !== value) : [...values, value];
}

function reasonFor(programme: Programme, matchedTopics: string[], cityMatched: boolean, special: string | null) {
  if (special) return special;
  const labels = matchedTopics.slice(0, 2).map((topic) => topicLabels[topic]).join(" a ");
  if (labels && cityMatched) return `Program odpovídá tvému zájmu o ${labels} a nachází se ve městě ${programme.city}.`;
  if (labels) return `Název, zaměření nebo popis programu odpovídá tvému zájmu o ${labels}.`;
  if (cityMatched) return `Program se nachází ve městě ${programme.city}, které sis vybral/a.`;
  return "Program může odpovídat zvolenému způsobu práce a tvému cíli.";
}

export function ProgrammeExplorer() {
  const [catalogue, setCatalogue] = useState<Catalogue | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [interests, setInterests] = useState("");
  const [styles, setStyles] = useState<string[]>([]);
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [level, setLevel] = useState<"all" | Level>("all");
  const [city, setCity] = useState("all");
  const [results, setResults] = useState<Array<Programme & { reason: string }>>([]);
  const [hasMatched, setHasMatched] = useState(false);
  const [search, setSearch] = useState("");
  const [catalogueLevel, setCatalogueLevel] = useState("all");
  const [topic, setTopic] = useState("all");
  const [catalogueCity, setCatalogueCity] = useState("all");
  const [institution, setInstitution] = useState("all");
  const [visible, setVisible] = useState(18);
  const [favourites, setFavourites] = useState<string[]>([]);

  useEffect(() => {
    fetch("/data/programmes.json")
      .then((response) => {
        if (!response.ok) throw new Error("Catalogue unavailable");
        return response.json();
      })
      .then((data: Catalogue) => setCatalogue(data))
      .catch(() => setLoadError(true));
    const frame = requestAnimationFrame(() => {
      const params = new URLSearchParams(window.location.search);
      setInterests(params.get("q") || "");
      try { setFavourites(JSON.parse(localStorage.getItem("dodanska-favourites") || "[]")); } catch { /* empty */ }
    });
    return () => cancelAnimationFrame(frame);
  }, []);

  const cities = useMemo(() => catalogue ? [...new Set(catalogue.programmes.map((item) => item.city))].sort() : [], [catalogue]);
  const institutions = useMemo(() => catalogue ? [...new Set(catalogue.programmes.map((item) => item.institution))].sort() : [], [catalogue]);

  function match(event: FormEvent) {
    event.preventDefault();
    if (!catalogue) return;
    const input = normalize(interests);
    const topicSignals = Object.entries(synonyms).filter(([, words]) => words.some((word) => input.includes(normalize(word)))).map(([key]) => key);
    const styleTopics = workStyles.filter((item) => styles.includes(item.id)).flatMap((item) => item.topics);
    const goalTopics = goals.filter((item) => selectedGoals.includes(item.label)).flatMap((item) => item.topics);
    const cognitiveSignal = ["psycholog", "chovani", "spravani", "behavio", "mozek", "neuro", "cognitive", "computer", "pocitac", "rozhod", "decision", "business behaviour", "business behavior"].some((word) => input.includes(normalize(word)));
    const businessPsychSignal = ["psycholog", "chovani", "spravani", "behavio", "lidi ve firm", "people in business"].some((word) => input.includes(normalize(word))) && (topicSignals.includes("business-management") || selectedGoals.includes("Zlepšovat firmy"));

    const ranked = catalogue.programmes
      .filter((programme) => level === "all" || programme.level === level)
      .map((programme) => {
        const title = normalize(programme.title);
        const description = normalize(programme.description || "");
        const matchedTopics = programme.topics.filter((item) => topicSignals.includes(item));
        let score = matchedTopics.length * 12;
        score += programme.topics.filter((item) => styleTopics.includes(item)).length * 4;
        score += programme.topics.filter((item) => goalTopics.includes(item)).length * 5;
        score += city !== "all" && programme.city === city ? 2 : 0;
        Object.values(synonyms).flat().forEach((term) => {
          const normalized = normalize(term);
          if (input && input.includes(normalized) && title.includes(normalized)) score += 7;
          else if (input && input.includes(normalized) && description.includes(normalized)) score += 2;
        });
        let special: string | null = null;
        if (cognitiveSignal && title.includes("cognitive science")) {
          score += 250;
          special = "Silná mezioborová shoda: Cognitive Science propojuje psychologii, lidské chování, neurovědu, data a počítačové metody.";
        }
        if (businessPsychSignal && title.includes("business psychology")) {
          score += 220;
          special = "Silná shoda pro spojení byznysu, psychologie a chování lidí v organizacích.";
        }
        if (!topicSignals.length && !styleTopics.length && !goalTopics.length && city === "all") score = 0;
        return {
          programme,
          score,
          primary: programme.topics[0] || "other",
          matchedTopics,
          reason: reasonFor(programme, [...new Set([...matchedTopics, ...programme.topics.filter((item) => styleTopics.includes(item) || goalTopics.includes(item))])], city !== "all" && programme.city === city, special),
        };
      })
      .sort((a, b) => b.score - a.score || a.programme.title.localeCompare(b.programme.title));

    const pool = ranked.filter((item) => item.score > 0);
    const chosen: typeof pool = [];
    const institutionsCount = new Map<string, number>();
    const pairsCount = new Map<string, number>();
    for (const item of pool) {
      const pair = `${item.programme.institution}-${item.primary}`;
      if ((institutionsCount.get(item.programme.institution) || 0) >= 3) continue;
      if ((pairsCount.get(pair) || 0) >= 2) continue;
      chosen.push(item);
      institutionsCount.set(item.programme.institution, (institutionsCount.get(item.programme.institution) || 0) + 1);
      pairsCount.set(pair, (pairsCount.get(pair) || 0) + 1);
      if (chosen.length === 8) break;
    }
    setResults(chosen.map((item) => ({ ...item.programme, reason: item.reason })));
    setHasMatched(true);
    requestAnimationFrame(() => document.getElementById("vysledky")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  function saveFavourite(id: string) {
    const next = toggle(favourites, id);
    setFavourites(next);
    localStorage.setItem("dodanska-favourites", JSON.stringify(next));
  }

  const filtered = useMemo(() => {
    if (!catalogue) return [];
    const query = normalize(search);
    return catalogue.programmes.filter((programme) => {
      const haystack = normalize(`${programme.title} ${programme.institution} ${programme.city} ${programme.description}`);
      return (!query || haystack.includes(query))
        && (catalogueLevel === "all" || programme.level === catalogueLevel)
        && (topic === "all" || programme.topics.includes(topic))
        && (catalogueCity === "all" || programme.city === catalogueCity)
        && (institution === "all" || programme.institution === institution);
    });
  }, [catalogue, search, catalogueLevel, topic, catalogueCity, institution]);

  if (loadError) return <div className="callout callout-red"><strong>Katalog se nepodařilo načíst.</strong><p>Zkus stránku obnovit. Oficiální programy můžeš mezitím hledat na Study in Denmark.</p></div>;
  if (!catalogue) return <div className="catalogue-loading" aria-live="polite">Načítám katalog programů…</div>;

  return (
    <>
      <section id="dotaznik" className="matcher-app shell content-section">
        <div className="tool-heading">
          <div><p className="eyebrow"><span /> 2 minuty · bez registrace</p><h2>Vyplň krátký dotazník.</h2></div>
          <p>Dotazník používá pouze databázi skutečných programů. Tvoje volná odpověď zůstává v tomto prohlížeči.</p>
        </div>
        <form className="matcher-form" onSubmit={match}>
          <fieldset className="question-card question-featured">
            <legend><span>01</span> Co tě opravdu zajímá?</legend>
            <label htmlFor="matcher-interest" className="sr-only">Tvoje zájmy</label>
            <textarea id="matcher-interest" value={interests} onChange={(event) => setInterests(event.target.value)} placeholder="Například: baví mě psychologie, chování lidí ve firmách a zároveň počítače…" rows={4} />
            <p>Piš česky, slovensky nebo anglicky. Klidně konkrétně — „psychologie + byznys + počítače“ funguje lépe než „něco zajímavého“.</p>
          </fieldset>

          <fieldset className="question-card">
            <legend><span>02</span> Jak nejraději pracuješ?</legend>
            <div className="choice-grid">
              {workStyles.map((item) => <label className={styles.includes(item.id) ? "choice-chip choice-chip-active" : "choice-chip"} key={item.id}><input type="checkbox" checked={styles.includes(item.id)} onChange={() => setStyles(toggle(styles, item.id))} />{item.label}</label>)}
            </div>
          </fieldset>

          <fieldset className="question-card">
            <legend><span>03</span> Co bys chtěl/a jednou dělat?</legend>
            <div className="choice-grid">
              {goals.map((item) => <label className={selectedGoals.includes(item.label) ? "choice-chip choice-chip-active" : "choice-chip"} key={item.label}><input type="checkbox" checked={selectedGoals.includes(item.label)} onChange={() => setSelectedGoals(toggle(selectedGoals, item.label))} />{item.label}</label>)}
            </div>
          </fieldset>

          <fieldset className="question-card question-split">
            <legend><span>04</span> Co už víš o studiu?</legend>
            <label>Úroveň studia<select value={level} onChange={(event) => setLevel(event.target.value as "all" | Level)}><option value="all">Ještě nevím / obě</option><option value="bachelor">Bakalářské</option><option value="master">Magisterské</option></select></label>
            <label>Preferované město<select value={city} onChange={(event) => setCity(event.target.value)}><option value="all">Kdekoliv</option>{cities.map((item) => <option key={item}>{item}</option>)}</select></label>
          </fieldset>
          <button className="button matcher-submit" type="submit">Ukázat moje možnosti <span aria-hidden="true">→</span></button>
        </form>

        {hasMatched && <div id="vysledky" className="matcher-results" aria-live="polite">
          <div className="results-heading"><div><p className="eyebrow"><span /> Tvoje výsledky</p><h2>{results.length ? `${results.length} programů k porovnání` : "Upřesni svou odpověď"}</h2></div><p>{results.length ? "Pořadí není žebříček kvality. Ukazuje, jak programy odpovídají tomu, co jsi zadal/a." : "Přidej konkrétní zájem, způsob práce nebo budoucí cíl. Potom zkus dotazník odeslat znovu."}</p></div>
          <div className="programme-list">
            {results.map((programme, index) => <ProgrammeCard key={programme.id} programme={programme} index={index + 1} reason={programme.reason} favourite={favourites.includes(programme.id)} onFavourite={() => saveFavourite(programme.id)} />)}
          </div>
          {!!results.length && <div className="callout callout-blue"><strong>Co dotazník neumí ověřit</strong><p>Dotazník nekontroluje požadované předměty, známky, angličtinu ani ECTS. Dostupnost programu a podmínky vždy zkontroluj na webu školy.</p></div>}
        </div>}
      </section>

      <section id="katalog" className="catalogue-section">
        <div className="shell">
          <div className="tool-heading"><div><p className="eyebrow eyebrow-light"><span /> Kompletní katalog</p><h2>Všech {catalogue.meta.includedTotal} programů.</h2></div><p>{catalogue.meta.counts.bachelor} bakalářských a {catalogue.meta.counts.master} magisterských programů vyučovaných v angličtině. Katalog slouží k orientaci. O přijetí rozhoduje škola.</p></div>
          <div className="catalogue-filters">
            <label className="search-field">Hledat<input value={search} onChange={(event) => { setSearch(event.target.value); setVisible(18); }} placeholder="Název, škola, město…" /></label>
            <label>Úroveň<select value={catalogueLevel} onChange={(event) => { setCatalogueLevel(event.target.value); setVisible(18); }}><option value="all">Všechny</option><option value="bachelor">Bakalářské</option><option value="master">Magisterské</option></select></label>
            <label>Obor<select value={topic} onChange={(event) => { setTopic(event.target.value); setVisible(18); }}><option value="all">Všechny obory</option>{Object.entries(topicLabels).filter(([key]) => key !== "other").map(([key, label]) => <option value={key} key={key}>{label}</option>)}</select></label>
            <label>Město<select value={catalogueCity} onChange={(event) => { setCatalogueCity(event.target.value); setVisible(18); }}><option value="all">Všechna města</option>{cities.map((item) => <option key={item}>{item}</option>)}</select></label>
            <label>Škola<select value={institution} onChange={(event) => { setInstitution(event.target.value); setVisible(18); }}><option value="all">Všechny školy</option>{institutions.map((item) => <option key={item}>{item}</option>)}</select></label>
          </div>
          <div className="catalogue-status"><strong>{filtered.length}</strong> nalezených programů {favourites.length > 0 && <span>· {favourites.length} uložených</span>}</div>
          <div className="catalogue-grid">
            {filtered.slice(0, visible).map((programme) => <ProgrammeCard key={programme.id} programme={programme} favourite={favourites.includes(programme.id)} onFavourite={() => saveFavourite(programme.id)} />)}
          </div>
          {!filtered.length && <div className="empty-state"><strong>Nenalezli jsme žádný program.</strong><p>Zkus ubrat filtr nebo použít kratší hledané slovo.</p></div>}
          {visible < filtered.length && <button className="button button-light load-more" type="button" onClick={() => setVisible((value) => value + 18)}>Načíst dalších 18</button>}
          <p className="catalogue-disclaimer">Aktualizace databáze: 14. 7. 2026 · Zdroj: Study in Denmark a odkazy univerzit · Program může změnit název, termín nástupu nebo podmínky.</p>
        </div>
      </section>
    </>
  );
}

function ProgrammeCard({ programme, index, reason, favourite, onFavourite }: { programme: Programme; index?: number; reason?: string; favourite: boolean; onFavourite: () => void }) {
  return <article className="programme-card">
    <div className="programme-card-top">
      <span className="programme-level">{programme.level === "bachelor" ? "Bakalář" : "Magistr"}</span>
      <button type="button" className={favourite ? "favourite favourite-active" : "favourite"} aria-label={favourite ? "Odebrat z uložených" : "Uložit program"} aria-pressed={favourite} onClick={onFavourite}>{favourite ? "★" : "☆"}</button>
    </div>
    {index && <span className="result-number">0{index}</span>}
    <h3>{programme.title}</h3>
    <p className="programme-meta">{programme.institution} · {programme.city}{programme.duration ? ` · ${programme.duration}` : ""}</p>
    {reason && <p className="match-reason">{reason}</p>}
    <div className="topic-tags">{programme.topics.slice(0, 3).map((item) => <span key={item}>{topicLabels[item] || item}</span>)}</div>
    <details>
      <summary>Krátký popis a odkazy</summary>
      <p>{programme.description || "Krátký popis v katalogu chybí. Otevři stránku programu na webu školy."}</p>
      <div className="programme-links"><a href={programme.officialProgrammeUrl} target="_blank" rel="noreferrer">Web programu ↗</a><a href={programme.sourceUrl} target="_blank" rel="noreferrer">Katalogový zdroj ↗</a></div>
      <small>Doporučení neověřuje tvoje vstupní předměty ani přijetí. Otevři požadavky školy.</small>
    </details>
  </article>;
}
