import Link from "next/link";

export default function NotFound() {
  return <main id="hlavni-obsah" className="not-found shell"><span>404</span><p className="eyebrow"><i /> Tudy cesta nevede</p><h1>Stránka se odstěhovala bez CPR.</h1><p>Zkus se vrátit na začátek nebo rovnou najít svůj studijní program.</p><div><Link className="button" href="/">Zpět na úvod</Link><Link className="text-link" href="/programy">Najít program →</Link></div></main>;
}
