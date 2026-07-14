import Link from "next/link";

const trustFacts = [
  {
    number: "0 DKK",
    title: "za školné",
    text: "Občané EU na kvalifikovaných veřejných programech školné zpravidla neplatí.",
    href: "/proc-dansko#skolne",
  },
  {
    number: "352",
    title: "programů v katalogu",
    text: "Anglicky vyučované bakalářské a magisterské možnosti s přímým odkazem na školu.",
    href: "/programy#katalog",
  },
  {
    number: "7 426",
    title: "DKK SU v roce 2026",
    text: "Měsíčně před zdaněním pro studenta mimo domov. Pro studenty z EU není automatická.",
    href: "/su",
  },
];

const journeys = [
  { step: "01", title: "Teprve vybírám", text: "Řekni nám, co tě baví. Dostaneš reálné programy, ne vymyšlenou odpověď robota.", href: "/programy#dotaznik", color: "blue" },
  { step: "02", title: "Chystám přihlášku", text: "Dokumenty, překlady, Optagelse.dk i podpisová stránka v jednom klidném postupu.", href: "/jak-se-prihlasit", color: "yellow" },
  { step: "03", title: "Už mě přijali", text: "Bydlení, depozit, CPR, MitID a banka — ve správném pořadí.", href: "/stehovani", color: "mint" },
  { step: "04", title: "Jsem v Dánsku", text: "Práce, žádost o SU a týdenní hodiny bez nebezpečných zkratek.", href: "/su", color: "red" },
];

export default function Home() {
  return (
    <main id="hlavni-obsah">
      <section className="hero shell">
        <div className="hero-copy">
          <p className="eyebrow"><span /> Studium v Dánsku pro Čechy a Slováky</p>
          <h1>Studium v Dánsku.<br /><em>Bez školného.</em><br />S plánem, který zvládneš.</h1>
          <p className="hero-lead">
            Najdi anglický program, připrav přihlášku a zjisti, jak doopravdy funguje SU.
            Česky, jednoduše a bez pohádek o „penězích zdarma“.
          </p>
          <div className="hero-actions">
            <Link className="button" href="/programy#dotaznik">Najít můj program <span aria-hidden="true">↗</span></Link>
            <Link className="text-link" href="/jak-se-prihlasit">Jak se přihlásit <span aria-hidden="true">→</span></Link>
          </div>
          <p className="hero-note">Pro občany Česka a Slovenska · nezávisle · bez provize</p>
        </div>
        <div className="hero-visual">
          <div className="hero-image-frame">
            <div className="hero-image-placeholder" role="img" aria-label="Studenti u dánské univerzity">
              <span className="shape shape-one" />
              <span className="shape shape-two" />
              <span className="shape shape-three" />
            </div>
            <div className="hero-sticker">Hej!<br />Dánsko<br />čeká.</div>
          </div>
          <div className="source-chip">Ověřeno · 14. 7. 2026</div>
        </div>
      </section>

      <section className="trust-strip shell" aria-label="Rychlá fakta">
        {trustFacts.map((fact) => (
          <Link key={fact.title} href={fact.href} className="trust-card">
            <p><strong>{fact.number}</strong> {fact.title}</p>
            <span>{fact.text}</span>
            <i aria-hidden="true">↗</i>
          </Link>
        ))}
      </section>

      <section className="section shell">
        <div className="section-heading split-heading">
          <div>
            <p className="eyebrow"><span /> Začni tam, kde právě jsi</p>
            <h2>Nemusíš přečíst celý internet.</h2>
          </div>
          <p>Stačí další správný krok. Vyber si svou situaci a my ti ukážeme, co má smysl řešit právě teď.</p>
        </div>
        <div className="journey-grid">
          {journeys.map((journey) => (
            <Link className={`journey-card journey-${journey.color}`} href={journey.href} key={journey.step}>
              <span className="journey-step">{journey.step}</span>
              <div>
                <h3>{journey.title}</h3>
                <p>{journey.text}</p>
              </div>
              <span className="circle-arrow" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="matcher-teaser">
        <div className="shell matcher-teaser-inner">
          <div>
            <p className="eyebrow eyebrow-light"><span /> Chytrý dotazník, žádná magie</p>
            <h2>Co tě baví natolik, že u toho ztrácíš pojem o čase?</h2>
          </div>
          <form action="/programy" className="teaser-form">
            <label htmlFor="interest">Napiš jednu větu</label>
            <div>
              <input id="interest" name="q" placeholder="Třeba technologie, práce s lidmi, klima, čísla…" />
              <button type="submit" aria-label="Pokračovat do dotazníku">→</button>
            </div>
            <p>Česky, slovensky nebo anglicky. Odpověď zůstane v prohlížeči.</p>
          </form>
        </div>
      </section>

      <section className="reality-section shell">
        <div className="reality-panel reality-good">
          <p className="eyebrow"><span /> Proč ano</p>
          <h2>Svoboda, praxe a mezinárodní život.</h2>
          <ul>
            <li>Výuka v angličtině a praktické projekty</li>
            <li>Studium bez školného pro občany EU</li>
            <li>Možnost SU při splnění podmínek</li>
            <li>Kolo, moře, design a studentské komunity</li>
          </ul>
          <Link className="text-link" href="/proc-dansko">Poznat dánské studium →</Link>
        </div>
        <div className="reality-panel reality-honest">
          <p className="eyebrow eyebrow-light"><span /> Bez růžových brýlí</p>
          <h2>Není to bezstarostná dovolená.</h2>
          <p>
            Dánsko je drahé, bydlení se hledá brzy a první práce nemusí přijít za týden. V zimě je tma,
            fouká a spoustu věcí si musíš zařídit sám nebo sama.
          </p>
          <Link className="text-link text-link-light" href="/stehovani">Kolik si připravit →</Link>
        </div>
      </section>

      <section id="o-projektu" className="about-section shell section">
        <div className="about-number">01</div>
        <div className="about-copy">
          <p className="eyebrow"><span /> Od studentů pro budoucí studenty</p>
          <h2>Ahoj, jsme Tereza a Patrik.</h2>
          <p className="large-copy">
            Dánskem jsme si prošli jako čeští a slovenští studenti — od prvního formuláře až po život,
            práci a studium v zahraničí. Informace existují, ale bývají schované na desítkách stránek.
          </p>
          <p>
            Proto vzniká doDánska: bezplatný průvodce, který ti pomůže udělat vlastní dobré rozhodnutí,
            ukáže podmínky i náklady a vždy tě pošle k oficiálnímu zdroji.
          </p>
          <div className="value-chips">
            <span>Zdarma</span><span>Lidsky</span><span>Ověřitelně</span><span>Bez provize</span>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="shell final-cta-inner">
          <p className="eyebrow eyebrow-light"><span /> Tvůj další krok</p>
          <h2>Začni programem.<br />Zbytek rozmotáme spolu.</h2>
          <Link className="button button-light" href="/programy#dotaznik">Najít můj program <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </main>
  );
}
