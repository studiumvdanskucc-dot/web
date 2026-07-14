import type { Metadata } from "next";
import Link from "next/link";
import { ApplicationGuide } from "@/components/application-guide";

export const metadata: Metadata = {
  title: "Jak se přihlásit na univerzitu v Dánsku",
  description: "Jednoduchý postup přihlášky z Česka a Slovenska: dokumenty, Optagelse.dk, podpisová stránka a magisterské portály.",
};

export default function ApplicationPage() {
  return <main id="hlavni-obsah">
    <section className="page-hero shell"><div className="page-hero-grid"><div><p className="eyebrow"><span /> Přihláška bez chaosu</p><h1>Jeden krok.<br />Potom další.</h1></div><p className="lead">Vyber, jestli míříš na bakaláře nebo master. Dostaneš samostatný postup, checklist a místa, kde se nejčastěji chybuje.</p></div></section>
    <div className="page-band"><div className="shell page-band-inner"><strong>Bakalář ≠ master</strong><p>Bakalářské přihlášky obvykle vedou přes Optagelse.dk. Magisterské přihlášky podáváš přímo v systému konkrétní univerzity.</p></div></div>
    <section className="shell content-section application-app"><ApplicationGuide /></section>
    <section className="content-section shell"><div className="content-grid"><div><p className="eyebrow"><span /> Rychlá kontrola</p><h2>Co musí sedět před odesláním.</h2></div><div className="cards-grid"><div className="info-card"><h3>Čitelnost</h3><p>Každou přílohu po nahrání otevři. Otočení, useknutá stránka nebo rozmazaný scan jsou zbytečný problém.</p></div><div className="info-card"><h3>Termín</h3><p>Nehleď jen na datum. U bakalářů je deadline 15. března ve 12:00 dánského času. Master má vlastní termíny.</p></div><div className="info-card"><h3>Překlad</h3><p>Požadavky se liší. Ověř si jazyk, formu a certifikaci překladu přímo u školy.</p></div><div className="info-card"><h3>Důkaz</h3><p>Ulož potvrzení, podpisovou stránku, e-maily i verzi odeslaných dokumentů.</p></div></div></div></section>
    <section className="next-step-band"><div className="shell"><div><p className="eyebrow eyebrow-light"><span /> Přijali tě?</p><h2>Teď bydlení, rozpočet a první dny.</h2></div><Link className="button button-light" href="/stehovani">Průvodce stěhováním →</Link></div></section>
  </main>;
}
