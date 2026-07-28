import type { Metadata } from "next";
import Link from "next/link";
import { ApplicationGuide } from "@/components/application-guide";

export const metadata: Metadata = {
  title: "Jak se přihlásit na univerzitu v Dánsku",
  description: "Jednoduchý postup přihlášky z Česka a Slovenska: dokumenty, Optagelse.dk, podpisová stránka a magisterské portály.",
};

export default function ApplicationPage() {
  return <main id="hlavni-obsah">
    <section className="page-hero shell"><div className="page-hero-grid"><div><p className="eyebrow"><span /> Přihláška krok za krokem</p><h1>Jak podat přihlášku.</h1></div><p className="lead">Vyber si bakalářské nebo magisterské studium. Dostaneš samostatný postup, kontrolní seznam a přehled nejčastějších chyb.</p></div></section>
    <div className="page-band"><div className="shell page-band-inner"><strong>Bakalář a magistr mají jiný postup.</strong><p>Bakalářské přihlášky obvykle vedou přes Optagelse.dk. Magisterské přihlášky podáváš přímo v systému konkrétní univerzity.</p></div></div>
    <section className="shell content-section application-app"><ApplicationGuide /></section>
    <section className="content-section shell"><div className="content-grid"><div><p className="eyebrow"><span /> Rychlá kontrola</p><h2>Co zkontrolovat před odesláním.</h2></div><div className="cards-grid"><div className="info-card"><h3>Čitelnost</h3><p>Každou přílohu po nahrání otevři. Otočená, neúplná nebo rozmazaná stránka může způsobit problém.</p></div><div className="info-card"><h3>Termín</h3><p>U bakalářských přihlášek bývá pro zahraniční uchazeče důležitý termín 15. března ve 12:00 dánského času. Magisterské programy mají vlastní termíny.</p></div><div className="info-card"><h3>Překlad</h3><p>Požadavky se liší. Ověř si jazyk, formu a certifikaci překladu přímo u školy.</p></div><div className="info-card"><h3>Potvrzení</h3><p>Ulož si potvrzení, podpisovou stránku, e-maily i kopii odeslaných dokumentů.</p></div></div></div></section>
    <section className="next-step-band"><div className="shell"><div><p className="eyebrow eyebrow-light"><span /> Přijali tě?</p><h2>Teď bydlení, rozpočet a první dny.</h2></div><Link className="button button-light" href="/stehovani">Průvodce stěhováním →</Link></div></section>
  </main>;
}
