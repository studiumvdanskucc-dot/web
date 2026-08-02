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
    number: "360",
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
          <p className="eyebrow eyebrow-light"><span /> Dobré vědět předem</p>
          <h2>S plánem se začíná mnohem klidněji.</h2>
          <p>
            Život v Dánsku bývá dražší a bydlení je dobré začít hledat včas. První týdny mohou chtít
            trochu trpělivosti, ale s finanční rezervou a jasným plánem se dají zvládnout bez
            zbytečného stresu.
          </p>
          <Link className="text-link text-link-light" href="/stehovani">Jak si připravit rozpočet →</Link>
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
          <a
            className="creator-link"
            href="https://www.tiktok.com/@grafickavdansku"
            target="_blank"
            rel="noreferrer"
          >
            Sleduj Teri na TikToku <strong>@grafickavdansku</strong> <span aria-hidden="true">↗</span>
          </a>
          <p className="large-copy">
            Do Dánska jsem se přestěhovala za studiem. Netušila jsem, že mi otevře cestu od AP
            programu až k dvojitému magisterskému titulu, výzkumu, startupům — a také k lidem, kteří
            změnili můj život.
          </p>
          <p>
            Začala jsem programem Multimedia Design na IBA Kolding, pokračovala profesním
            bakalářským studiem Branding &amp; Marketing na VIA University College a navázala
            magisterským studiem na Aalborg University. V roce 2026 jsem pak dokončila také
            mezinárodní dvojitý magisterský program zaměřený na Innovation Management a Management
            Science &amp; Engineering.
          </p>
          <p>
            Dánsko mi ale dalo mnohem víc než vzdělání. Potkala jsem tam svého manžela, svou budoucí
            svědkyni a mnoho úžasných lidí, kteří se stali důležitou součástí mého života. Studium
            a mezinárodní komunita mi zároveň otevřely cestu do světa — k cestování, práci i
            zkušenostem v dalších zemích a kulturách.
          </p>
          <p>
            Během studia jsem nezůstala jen ve školní lavici. Začínala jsem stážemi a studentskými
            pracemi, později působila jako výzkumná asistentka na Aarhus University, pomáhala
            studentským podnikatelům jako Startup Buddy a Marketing Specialist, vedla kreativní
            projekty jako Art Director a sama spolubudovala startupy.
          </p>
          <p>
            Právě to mám na Dánsku ráda: školy ti dávají důvěru, prostor zkoušet vlastní nápady
            a podporu, když chceš studium propojit s praxí. Proto vzniklo doDánska — abych ti předala
            jasné a ověřitelné informace, které bych sama na začátku potřebovala.
          </p>
          <div className="value-chips">
            <span>Od AP po dvojitý magisterský titul</span>
            <span>Výzkum na Aarhus University</span>
            <span>Art direction a startupy</span>
            <span>Mezinárodní zkušenosti</span>
          </div>
          <div className="about-support">
            <div>
              <h3>Zůstaly ti otázky?</h3>
              <p>
                Nejdřív projdi všechny části webu. Pokud odpověď nenajdeš, napiš nám. K projektu se
                už přislíbili přidat lidé z technických oborů, psychologie, medicíny i byznysu,
                kteří si s tebou mohou krátce promluvit o tvých cílech a podělit se o zkušenosti
                ze svého oboru.
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
          <h2>Začni teď, ale nespěchej!<br />Krůček po krůčku. <span className="cta-smile" aria-hidden="true">☺️</span></h2>
          <Link className="button button-light" href="/programy#dotaznik">Najít můj program <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </main>
  );
}
