"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  { href: "/proc-dansko", label: "Proč Dánsko" },
  { href: "/programy", label: "Najdi program" },
  { href: "/jak-se-prihlasit", label: "Jak se přihlásit" },
  { href: "/stehovani", label: "Stěhování" },
  { href: "/su", label: "SU" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link className="brand" href="/" aria-label="Do Dánska — úvod">
          <span className="brand-dot" aria-hidden="true" />
          <span>do</span>Dánska
        </Link>

        <nav className="desktop-nav" aria-label="Hlavní navigace">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link className="button button-small header-cta" href="/programy#dotaznik">
          Najít můj program <span aria-hidden="true">↗</span>
        </Link>

        <button
          className="menu-button"
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Zavřít menu" : "Otevřít menu"}</span>
          <span className={open ? "menu-lines menu-lines-open" : "menu-lines"} aria-hidden="true">
            <i />
            <i />
          </span>
        </button>
      </div>

      <div id="mobile-menu" className={open ? "mobile-menu mobile-menu-open" : "mobile-menu"}>
        <nav aria-label="Mobilní navigace">
          {navItems.map((item, index) => (
            <Link key={item.href} href={item.href} onClick={() => setOpen(false)} aria-current={pathname === item.href ? "page" : undefined}>
              <span>0{index + 1}</span>
              {item.label}
            </Link>
          ))}
          <Link className="button" href="/programy#dotaznik" onClick={() => setOpen(false)}>Najít můj program</Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div>
          <Link className="brand brand-footer" href="/">
            <span className="brand-dot" aria-hidden="true" />
            <span>do</span>Dánska
          </Link>
          <p>Dánsko krok za krokem. Česky, upřímně a s oficiálními odkazy.</p>
        </div>
        <div className="footer-links">
          <div>
            <h2>Studovat</h2>
            <Link href="/proc-dansko">Proč Dánsko</Link>
            <Link href="/programy">Najdi program</Link>
            <Link href="/jak-se-prihlasit">Jak se přihlásit</Link>
          </div>
          <div>
            <h2>Přestěhovat se</h2>
            <Link href="/stehovani">Bydlení a rozpočet</Link>
            <Link href="/su">SU bez mýtů</Link>
          </div>
          <div>
            <h2>Projekt</h2>
            <Link href="/#o-projektu">O nás</Link>
            <Link href="/zdroje">Zdroje a aktualizace</Link>
            <Link href="/ochrana-soukromi">Ochrana soukromí</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          Nezávislý průvodce. Nejsme dánský úřad ani univerzita. Aktuální pravidla vždy ověř u instituce,
          která o tvé situaci rozhoduje.
        </p>
        <p>© {new Date().getFullYear()} doDánska</p>
      </div>
    </footer>
  );
}
