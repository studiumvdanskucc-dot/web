import Image from "next/image";
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
  { step: "01", title: "Teprve vybírám", text: "Řekni nám, co tě baví. Ukážeme ti skutečné programy z ověřeného katalogu.", href: "/programy#dotaznik", color: "blue" },
  { step: "02", title: "Chystám přihlášku", text: "Dokumenty, překlady, Optagelse.dk i podpisová stránka jasně krok za krokem.", href: "/jak-se-prihlasit", color: "yellow" },
  { step: "03", title: "Už mě přijali", text: "Bydlení, depozit, CPR, MitID a banka — ve správném pořadí.", href: "/stehovani", color: "mint" },
  { step: "04", title: "Jsem v Dánsku", text: "Zjisti, jak funguje práce, žádost o SU a podmínky pro studenty z EU.", href: "/su", color: "red" },
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
            Vše přehledně česky a s odkazy na oficiální zdroje.
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
            <div className="hero-sticker">Začni<br />právě<br />tady.</div>
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
            <h2>Vše důležité na jednom místě.</h2>
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
            <p className="eyebrow eyebrow-light"><span /> Krátký dotazník</p>
            <h2>Co bys chtěl/a studovat?</h2>
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
          <p className="eyebrow"><span /> Výhody</p>
          <h2>Praktická výuka a mezinárodní prostředí.</h2>
          <ul>
            <li>Výuka v angličtině a praktické projekty</li>
            <li>Studium bez školného pro občany EU</li>
            <li>Možnost SU při splnění podmínek</li>
            <li>Kolo, moře, design a studentské komunity</li>
          </ul>
          <Link className="text-link" href="/proc-dansko">Proč studovat v Dánsku →</Link>
        </div>
        <div className="reality-panel reality-honest">
          <p className="eyebrow eyebrow-light"><span /> S čím počítat</p>
          <h2>Začátek může být náročný.</h2>
          <p>
            Dánsko je drahé, bydlení se hledá brzy a první práce nemusí přijít za týden. V zimě je tma,
            fouká a spoustu věcí si musíš zařídit sám nebo sama.
          </p>
          <Link className="text-link text-link-light" href="/stehovani">Kolik si připravit →</Link>
        </div>
      </section>

      <section id="o-projektu" className="about-section shell section">
        <div className="about-profile">
          <div className="about-photo">
            <Image
              src="/images/teri-molnar.webp"
              alt="Teri Molnár, zakladatelka projektu doDánska"
              width={1200}
              height={1600}
              sizes="(max-width: 1050px) 100vw, 38vw"
              unoptimized
            />
          </div>
          <div className="about-caption">
            <strong>Teri Molnár</strong>
            <span>Zakladatelka projektu doDánska</span>
          </div>
        </div>
        <div className="about-copy">
          <p className="eyebrow"><span /> O projektu</p>
          <h2>Ahoj, jsem Teri.</h2>
          <p className="large-copy">
            Do Dánska jsem přijela studovat. Začínala jsem programem AP Digital Communication and
            Media/Multimedia na IBA v Koldingu a pokračovala bakalářským studiem Fashion Branding
            and Marketing na VIA University College.
          </p>
          <p>
            Studium v Dánsku změnilo můj osobní i pracovní život. Potkala jsem tam svého manžela,
            kamarádku, která mi později šla za svědkyni, a mnoho dalších skvělých lidí. Díky
            zkušenostem z Dánska jsem také mohla cestovat a pracovat v různých zemích.
          </p>
          <p>
            Dánské školy mě podporovaly v tom, abych studium propojila s praxí. Postupně jsem prošla
            praxemi, stážemi a studentskými pracemi až k výzkumu, vedení kreativních projektů a
            vlastním startupům. Vím, kolik možností může Dánsko otevřít, ale také kolik otázek člověk
            řeší před odjezdem.
          </p>
          <p>
            Proto vzniklo doDánska. Chci na jednom místě nabídnout jasné a ověřitelné informace,
            které bych sama na začátku potřebovala.
          </p>
          <div className="value-chips">
            <span>AP a bakalář v Dánsku</span>
            <span>Stáže a studentské práce</span>
            <span>Výzkum a startupy</span>
            <span>Mezinárodní zkušenosti</span>
          </div>
          <div className="about-support">
            <div>
              <h3>Zůstaly ti otázky?</h3>
              <p>
                Nejprve projdi jednotlivé části webu. Pokud odpověď nenajdeš, ozvi se. K projektu se
                už přidávají další studenti a absolventi, kteří s tebou mohou probrat cíle v
                inženýrství, psychologii, medicíně nebo byznysu.
              </p>
            </div>
            <a
              className="button"
              href="https://www.linkedin.com/in/teri-molnar"
              target="_blank"
              rel="noreferrer"
            >
              Napsat Teri <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>

      <section className="final-cta">
        <div className="shell final-cta-inner">
          <p className="eyebrow eyebrow-light"><span /> Tvůj další krok</p>
          <h2>Začni výběrem programu.<br />Pak pokračuj krok za krokem.</h2>
          <Link className="button button-light" href="/programy#dotaznik">Najít můj program <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </main>
  );
}
