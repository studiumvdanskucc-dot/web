# SEO, discoverability and privacy-friendly measurement

## SEO principle

Win by answering high-intent Czech questions more clearly than forums, not by producing dozens of thin AI articles. The strongest pages are the five core guides, each kept current and linked to official sources.

## Page metadata

Replace `[ZNAČKA]` after the brand is chosen. Keep titles around 50–60 visible characters where practical; Czech search displays vary.

| Route | Title | Meta description |
|---|---|---|
| `/` | Studium v Dánsku pro Čechy a Slováky | [ZNAČKA] | Najdi anglický program, připrav přihlášku, naplánuj stěhování a pochop SU. Praktický průvodce studiem v Dánsku krok za krokem. |
| `/proc-dansko` | Proč studovat v Dánsku: výhody i realita | [ZNAČKA] | Studium bez školného pro občany EU, programy v angličtině, SU, dánština i náklady. Dánsko bez růžových brýlí. |
| `/programy` | Anglické bakalářské a magisterské programy v Dánsku | Prohledej anglické programy v Dánsku a získej transparentní doporučení podle svých zájmů. Vždy s odkazem na oficiální web školy. |
| `/jak-se-prihlasit` | Jak se přihlásit na školu v Dánsku: návod | Bakalář přes Optagelse.dk i magistr přes univerzitní portál. Dokumenty, překlady, termíny a podpisová stránka vysvětlené jednoduše. |
| `/stehovani` | Stěhování do Dánska: bydlení, rozpočet a CPR | Kolik si připravit, kde hledat bydlení v Kodani, Aarhusu, Odense a Aalborgu a co zařídit po příjezdu ve správném pořadí. |
| `/su` | SU v Dánsku pro české a slovenské studenty | Co je SU, kolik činí v roce 2026, jak podat žádost a proč 43 hodin měsíčně není bezpečné pravidlo. Prakticky a s oficiálními zdroji. |
| `/zdroje` | Oficiální zdroje a aktualizace | [ZNAČKA] | Z čeho vychází náš průvodce, kdy jsme pravidla naposledy kontrolovali a jak nahlásit nepřesnost. |

## Search-intent map

### Why Denmark

- studium v Dánsku
- vysoká škola Dánsko
- studium v Dánsku zdarma
- studium v Dánsku v angličtině
- výhody studia v Dánsku

### Programmes

- bakalářské programy Dánsko anglicky
- magisterské programy Dánsko
- university Denmark programmes English
- co studovat v Dánsku

### Applications

- jak se přihlásit na vysokou školu v Dánsku
- Optagelse návod česky
- Optagelse signature page
- maturita Dánsko překlad
- Dánsko přihláška 15 března
- magistr Dánsko přihláška

### Moving

- bydlení pro studenty Dánsko
- kolej Kodaň student
- StudentHousingAarhus
- stěhování do Dánska CPR
- kolik stojí život v Dánsku student
- depozit nájem Dánsko

### SU

- SU Dánsko
- SU 43 hodin
- SU Denmark EU student work hours
- jak získat SU v Dánsku
- SU 2026 částka
- SU vrácení peněz

Use natural variants. Do not repeat exact phrases mechanically.

## On-page structure

- One descriptive H1 per page.
- H2s should answer real questions (`Kolik si připravit?`, `Co když hodiny nesplním?`).
- Put a short direct answer before long explanation.
- Use tables only for real comparisons/checklists.
- Link related steps with descriptive anchors.
- Source/date blocks should be indexable, but development warnings and duplicate modal content should not pollute the page.
- Programme cards need stable URLs only if a unique useful detail page is built; do not generate 352 thin SEO pages from one-paragraph catalogue excerpts.

## Recommended indexation

Index:

- the seven main routes;
- future original student stories if substantial and approved;
- substantial city guides only when they add verified local content.

Do not index:

- query/filter combinations;
- matcher-result URLs;
- empty placeholder bios;
- client-only modal states;
- hundreds of thin programme copies when the official school page is the useful destination;
- internal correction/admin pages.

Use canonical `/programy` for filter states and prevent crawl traps.

## Structured data

Use only when visible content supports it:

- `WebSite` with `SearchAction` only if catalogue URL search genuinely works.
- `BreadcrumbList` on internal pages.
- `Organization` after legal name, URL and real logo are supplied.
- `Person` for Tereza only after approved public bio/image.
- `FAQPage` for visible application/SU FAQs; do not duplicate hidden keyword-stuffed questions.
- `Article` is optional for future editorial stories, not the core programme catalogue.

Do not mark independent programme cards as official `Course` objects unless fields are accurate, current and licensing/ownership semantics are clear.

## Social metadata

Create original OpenGraph images with:

- route-specific short headline;
- brand mark;
- strong colour block and one simple geometric element;
- no unsourced student portrait;
- 1200 × 630 output;
- Czech diacritics checked at actual render size.

Suggested headlines:

- Úvod: `Dánsko. S plánem, který zvládneš.`
- Programy: `Co bys mohl/a studovat v Dánsku?`
- Přihláška: `Optagelse bez paniky.`
- Stěhování: `Od přijetí k prvnímu týdnu.`
- SU: `SU bez mýtů.`

## Internal linking

- Every programme result links to application guide.
- Application completion links to moving.
- Moving arrival sequence links to SU.
- SU eligibility boundary links back to moving/CPR and official worker source.
- Why Denmark links to both programme finder and budget.
- Each high-risk claim links to sources page plus the direct external authority.

## Helpful future content, in priority order

1. Real Tereza story with timeline and costs from a specified year.
2. A document example: how a Czech school can state teaching hours.
3. “Bachelor vs professional Bachelor vs academy degree” explainer.
4. City-by-city first-month checklists, maintained by real local contributors.
5. Job-search guide focused on genuine employment, contracts and weekly hours.
6. Real student interviews with programme/year explicitly stated.

Avoid generic “10 reasons Denmark is amazing” posts unless they add firsthand evidence.

## Analytics objective

Measure whether users move from uncertainty to an official next step. Do not optimise only for time-on-page.

Primary outcomes:

- official programme link opened;
- application checklist started/completed locally;
- city housing official link opened;
- official SU worker/application link opened;
- correction submitted.

## Event plan

| Event | Properties allowed | Purpose |
|---|---|---|
| `journey_selected` | stage enum | Which entry path helps |
| `matcher_started` | none | Funnel start |
| `matcher_completed` | degree enum, result count, controlled topic enums | Does the flow reach results |
| `matcher_followup_shown` | reason enum | Where vocabulary is weak |
| `programme_opened` | programme ID, rank bucket | Discovery usefulness |
| `official_programme_clicked` | programme ID | High-value outcome |
| `catalogue_filter_used` | filter type, option enum | Improve filter IA |
| `application_path_selected` | bachelor/master | Guide split |
| `guide_step_toggled` | guide ID, step ID, state | Step friction; avoid cross-device identity |
| `budget_calculated` | scenario bucket only | Calculator use; do not send exact finances |
| `housing_link_clicked` | city, source type, destination ID | Housing usefulness |
| `su_official_link_clicked` | topic enum | Critical handoff |
| `fact_source_opened` | source ID | Trust behaviour |
| `correction_started` | page ID | Editorial quality |

Never capture:

- raw matcher text;
- exact user budget/rent/deposit values;
- uploaded documents;
- CPR, application IDs or personal identifiers;
- session replay on forms containing free text;
- keystroke-level tracking;
- cross-site advertising IDs by default.

## Analytics implementation choice

Prefer a lightweight privacy-oriented product that can run without cross-site advertising cookies. The final legal/consent configuration depends on the chosen provider, hosting and actual data flows. Do not paste a generic cookie banner and call it compliance.

For v1, server logs plus a small set of aggregate consent-aware events may be sufficient. The product remains fully usable if analytics is blocked.

## Conversion ethics

- Do not gate programme results behind email.
- Do not add countdown timers to public admissions deadlines.
- Do not imply founder review unless a human actually reviews.
- Do not sell or promote a university based on commission without prominent disclosure.
- Do not label an affiliate link as an official housing source.
- Let users reach authorities in one click; external exits are successful outcomes.

## Technical SEO checklist

- [ ] Canonical URL per indexable page.
- [ ] XML sitemap excludes filters/results.
- [ ] `robots.txt` references sitemap.
- [ ] Unique title/H1/description.
- [ ] OpenGraph/Twitter metadata.
- [ ] `lang="cs"`; mark English programme names only where useful, not every token.
- [ ] Clean status codes, custom 404.
- [ ] Fast server/static HTML for core copy.
- [ ] No content hidden until JavaScript except interactive catalogue.
- [ ] Images sized/compressed; no layout shift.
- [ ] External links are crawlable anchors.
- [ ] DateModified changes only after meaningful editorial update.
- [ ] Source URLs tested.
- [ ] No placeholder/test environment indexed.

