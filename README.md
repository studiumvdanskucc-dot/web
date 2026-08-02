# doDánska

Český a slovenský průvodce studiem v Dánsku. Web obsahuje:

- obsahové stránky o studiu, přihlášce, stěhování a SU;
- lokální programový matcher bez placeného LLM a bez odesílání volného textu;
- filtrovatelný katalog 360 anglicky vyučovaných programů, včetně AP a Top-up cest pro 2027/28;
- checklisty uložené pouze v prohlížeči;
- kalkulačku startovního rozpočtu a deset-týdenní SU plánovač hodin.

## Lokální spuštění

Požadavky: Node.js 22.13 nebo novější a npm.

```bash
npm ci
npm run dev
```

Kontrola před publikací:

```bash
npm run lint
npm test
```

Produkční sestavení vznikne v adresáři `dist/`:

```bash
npm run build
```

## Struktura

- `app/` — jednotlivé trasy a globální styly;
- `components/` — matcher, checklisty, kalkulačky a společná navigace;
- `public/data/programmes.json` — databáze pro katalog a doporučení;
- `public/images/` — původní obrazové materiály webu;
- `content/` — redakční zadání, zdroje, datový model a metodika;
- `scripts/update_programmes.mjs` — nástroj pro obnovu katalogu a zachování ručně ověřených AP/Top-up programů pro 2027/28.

## Aktualizace programů

Databáze je discovery katalog, nikoli rozhodnutí o přijetí. Před radou studentovi vždy otevři oficiální stránku programu. AP a Top-up záznamy obsahují navíc stav dostupnosti pro 2027/28; i ten je nutné před přihláškou znovu ověřit. Doporučená frekvence obnovy je měsíčně od listopadu do března a mimo sezonu čtvrtletně.

```bash
node scripts/update_programmes.mjs
```

Po aktualizaci zkontroluj počet záznamů, změny názvů, mrtvé odkazy a znovu spusť testy.

## GitHub Pages

Repozitář obsahuje automatický workflow v `.github/workflows/deploy-pages.yml`.
Každý push do větve `main` vytvoří statický export v `out/` a publikuje jej přes
GitHub Pages. V nastavení repozitáře musí být v **Settings → Pages → Source**
vybráno **GitHub Actions**.

Lokální kontrola stejného exportu:

```bash
GITHUB_PAGES=true npm run build:pages
```

Soubor `public/CNAME` zachovává vlastní doménu `studiumvdansku.cc`.

## Obsahová bezpečnost

- Částky a termíny uváděj vždy s rokem a rozsahem platnosti.
- SU není automatická pro občana EU a „43 hodin měsíčně“ není bezpečné pravidlo.
- Matcher nesmí tvrdit, že ověřil předměty, ECTS, angličtinu ani přijetí.
- Housing garance, deadlines a programové intake se kontrolují před každou sezonou.
- Kritická tvrzení mají vést na oficiální zdroj v sekci `/zdroje`.
