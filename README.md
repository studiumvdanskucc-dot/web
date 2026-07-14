# doDánska

Český a slovenský průvodce studiem v Dánsku. Web obsahuje:

- obsahové stránky o studiu, přihlášce, stěhování a SU;
- lokální programový matcher bez placeného LLM a bez odesílání volného textu;
- filtrovatelný katalog 352 anglicky vyučovaných programů;
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
- `scripts/update_programmes.mjs` — nástroj pro obnovu programu z veřejného katalogu.

## Aktualizace programů

Databáze je discovery katalog, nikoli rozhodnutí o přijetí. Před radou studentovi vždy otevři oficiální stránku programu. Doporučená frekvence obnovy je měsíčně od listopadu do března a mimo sezonu čtvrtletně.

```bash
node scripts/update_programmes.mjs
```

Po aktualizaci zkontroluj počet záznamů, změny názvů, mrtvé odkazy a znovu spusť testy.

## GitHub a hosting

Projekt lze vložit do nového GitHub repozitáře běžným postupem:

```bash
git init
git add .
git commit -m "Initial doDánska website"
git branch -M main
git remote add origin https://github.com/UZIVATEL/REPO.git
git push -u origin main
```

GitHub zde slouží jako úložiště zdrojového kódu. Aplikace používá Vinext a serverový Cloudflare Worker, proto není bez úprav určena pro čistě statické GitHub Pages. Pro vlastní Cloudflare Workers hosting nejdříve spusť `npm run build` a potom nasaď konfiguraci v `dist/server/wrangler.json`, nebo připoj repozitář k hostingu, který umí Cloudflare Workers/Vinext.

## Obsahová bezpečnost

- Částky a termíny uváděj vždy s rokem a rozsahem platnosti.
- SU není automatická pro občana EU a „43 hodin měsíčně“ není bezpečné pravidlo.
- Matcher nesmí tvrdit, že ověřil předměty, ECTS, angličtinu ani přijetí.
- Housing garance, deadlines a programové intake se kontrolují před každou sezonou.
- Kritická tvrzení mají vést na oficiální zdroj v sekci `/zdroje`.
