# Information architecture, UX and visual brief

## Product position

This should feel like a trusted older student built the guide they wished they had—not like a recruitment agency, government portal or generic university comparison marketplace.

The user has four recurring questions:

1. Is Denmark right for me?
2. What can I study?
3. What exactly do I do next?
4. Can I afford it and how does SU really work?

Every page should answer one of these before introducing secondary content.

## Sitemap

| Route | User question | Primary CTA | Secondary CTA |
|---|---|---|---|
| `/` | Where do I begin? | Najít můj program | Jak se přihlásit |
| `/proc-dansko` | Is Denmark worth it for me? | Najít program | Spočítat rozpočet |
| `/programy` | Which real programmes fit me? | Spustit doporučovač | Procházet katalog |
| `/jak-se-prihlasit` | What do I submit, where and when? | Začít checklist | Najít program |
| `/stehovani` | How do I move without a costly mistake? | Spočítat startovní rozpočet | Otevřít housing odkazy |
| `/su` | Can I get SU and how do I keep it? | Zkontrolovat kroky | Oficiální SU zdroj |
| `/zdroje` | Why should I trust this? | Nahlásit chybu | Otevřít zdroj |

## Main journeys

### Explorer

Landing → programme teaser → full matcher → save/share shortlist → official university page → application checklist.

### Applicant

Search/SEO landing on application page → choose Bachelor/Master → requirements checklist → document checklist → submission checklist → moving page.

### Accepted student

Moving page → budget calculator → city housing section → arrival checklist → SU guide.

### SU problem solver

Search/SEO landing on SU page → myth correction → weekly-hours rule → application steps → “circumstances changed” official link.

## Navigation behaviour

- Desktop: compact sticky header; wordmark left, five routes centred/right, primary CTA at end.
- Mobile: wordmark + CTA/icon; full-screen menu with large route labels and one-sentence descriptions.
- Indicate current route with more than colour alone.
- Do not add dropdowns until content volume genuinely requires them.
- On long guides, add a sticky local table of contents on desktop and an accessible “Na této stránce” disclosure on mobile.
- Use progress indication inside step-by-step guides, but never imply that checking a box means the authority has accepted a document.

## Landing page composition

1. Hero — 60–75% viewport height on desktop; editorial headline, short subhead, two CTAs, candid image.
2. Trust strip — three facts with short conditions and source links.
3. Journey chooser — four stages; one should visually dominate based on current season only if controlled by editable content.
4. Programme teaser — a single text input plus examples; no chatbot bubble.
5. Honest Denmark — two-column “what attracts / what demands preparation.”
6. Tereza story — portrait + first-person copy.
7. Principles/team — lighter rhythm; do not let unknown team details block the useful content.
8. Final CTA + independent disclaimer.

## Why Denmark composition

Use alternating editorial modules instead of ten identical cards:

- Opening manifesto with one large lifestyle image.
- Tuition and cost split panel.
- “How you learn” horizontal story with project examples.
- English programmes + programme CTA.
- SU conditional callout with link.
- Danish language note with deposit condition.
- City/lifestyle photo grid.
- “Without rose-coloured glasses” high-contrast section.
- Decision CTA.

## Programme finder composition

### Matcher mode

- Stepper with one decision per screen on mobile.
- Previous answers visible in a compact summary.
- Suggested chips are aids, never required.
- Submit key should not accidentally advance multiline answers.
- Save answers to `sessionStorage` or local state; clear action visible.
- Never transmit free text in v1.

### Results mode

- Begin with interpretation, not a score dashboard.
- Show 5–8 results and concise reasons.
- Fit labels: topic / work style / goal / location.
- Allow “show why” disclosure with matched terms.
- Save favourites locally; share a URL containing only programme IDs and filter state, not the user's free text.
- Add a broadening suggestion when all results cluster in one field.

### Catalogue mode

Desktop layout:

- left filter rail up to 280 px;
- results toolbar;
- result list, not a dense comparison table;
- sticky filters only within the catalogue boundary.

Mobile layout:

- search field;
- filter button opening a full-height accessible dialog;
- active chips scroll horizontally with a visible “Vymazat” action;
- 20–30 results per progressive batch or a virtualised list;
- programme detail in an inline disclosure or dedicated modal/drawer with focus trapping and URL state.

Do not place 352 expanded descriptions in the initial DOM.

## Application guide composition

At the top, force the key choice: Bachelor vs Master. Use two large side-by-side buttons, not tabs that can be missed.

Each journey includes:

- “what you need before starting” summary;
- date timeline;
- 8–10 numbered steps;
- local checklist;
- document examples;
- common mistakes;
- next-stage CTA.

Fact alerts:

- Blue = useful context.
- Yellow = deadline/condition.
- Red = high-cost or eligibility risk.
- Green = completed user checklist only, never legal approval.

The signature-page warning must appear twice: once beside submission and once in final review.

## Moving guide composition

- Timeline from four months before arrival to first month.
- Budget scenario cards followed by interactive calculator.
- City switcher: Copenhagen / Aarhus / Odense / Aalborg / other.
- Official/student sources before commercial portals.
- Anti-scam checklist adjacent to payment content.
- Arrival steps as a dependency sequence: EU document → CPR → MitID/Digital Post → bank/NemKonto/tax → work → SU.
- Print-friendly “first week folder” checklist.

## SU guide composition

The first screen must answer three questions: what, how much this year, automatic or conditional.

Recommended order:

1. Definition and current amount.
2. SU vs SU-lån.
3. Eligibility pre-check, with “not an official assessment” label.
4. Step-by-step application.
5. Prominent 43-hours myth correction.
6. First 10 weeks and holiday.
7. Evidence vault checklist.
8. Changed circumstances.
9. Income limit.
10. 2027 reform.
11. FAQ and official escalation.

Do not make the current SU amount the largest marketing element. The condition belongs visually beside it.

## Core component inventory

| Component | Purpose | Notes |
|---|---|---|
| `FactBadge` | Shows year/date and source | Must accept `asOf`, `sourceUrl`, `scope` |
| `ConditionCallout` | Keeps a condition beside a benefit | Never collapse by default for high-risk facts |
| `JourneyCard` | Routes by student stage | One clear verb-led CTA |
| `ProgrammeCard` | Displays catalogue item | Official link, source link, stale warning |
| `MatcherStepper` | Collects preferences | Local only in v1 |
| `MatchReason` | Explains deterministic score | Show matched concepts; no fake precision |
| `FilterDrawer` | Mobile catalogue filters | Dialog semantics and focus return |
| `GuideStep` | Numbered instruction | Supports local checklist state |
| `DocumentChecklist` | Application preparation | “Prepared,” not “accepted” |
| `DeadlineTimeline` | Shows dated sequence | All dates carry year and source |
| `BudgetCalculator` | Estimates cash on arrival | DKK, scenario caveat, no live FX by default |
| `CityHousingPanel` | City-specific official links | Editable source/date metadata |
| `ScamChecklist` | Prevents risky transfers | Visually close to deposits/portals |
| `MythFact` | Corrects viral shortcuts | Use sparingly; SU 43-hour rule is primary |
| `SourceRegister` | Makes evidence inspectable | Group by authority/topic |
| `PlaceholderGuard` | Prevents unknown bios going live | Development warning + build check |

## Visual identity

### Creative idea

“Danish clarity with Czech warmth.” The grid and typography feel Nordic; the voice and small details feel personal.

### Inspiration handling

Study in Sweden is useful for:

- a confident short hero line;
- large editorial type;
- a playful but mature palette;
- modular student-led stories;
- programme search as a primary action;
- a sense of country and culture beyond admissions.

Do not reproduce its exact header, cards, colour values, illustrations, wording or page order. Build an original system.

### Suggested palette

These are starting tokens, not fixed brand assets:

| Token | Hex | Use |
|---|---|---|
| Ink | `#111827` | Primary text |
| Warm paper | `#F7F3EA` | Main background |
| White | `#FFFFFF` | High-clarity surfaces |
| Cobalt | `#185ADB` | Primary action/link |
| Deep cobalt | `#103B8F` | Hover/dark section |
| Tomato | `#F04E3E` | Urgency and editorial accent |
| Butter | `#F5D76E` | Condition/background accent |
| Mint | `#BCE3D2` | Calm/supporting sections |
| Border | `#D8D4CA` | Dividers |

Check all pairings for WCAG AA; never place white normal-size text on butter or mint.

### Typography

- Display: one open-source geometric/humanist sans with Czech/Slovak glyphs, e.g. `Manrope` or `Sora`.
- Body/UI: a very legible sans, e.g. `Inter` or `Source Sans 3`.
- Use no more than two families and four weights.
- Headline clamp target: 44–84 px desktop, 38–54 px mobile depending length.
- Body: 17–19 px on content pages; line length 60–72 characters.
- Use Czech non-breaking spaces or typographic handling around short prepositions where the stack supports it without corrupting search.

### Shape and rhythm

- Border radius: 0, 8 and 20 px only.
- Use 1 px borders more than shadows.
- Full-bleed colour blocks can separate major narrative shifts.
- Avoid three equal cards in every section; vary text/image proportions.
- Use a consistent 8 px spacing base with generous 64–128 px section gaps on desktop.

### Photography

Prioritise real project-owned imagery. Shot list:

- Tereza in a natural environment, looking at or just away from camera;
- students collaborating around a real table;
- workshop/lab/studio activity;
- cycling in ordinary weather;
- beach/harbour/winter swimming;
- student housing kitchen or dinner;
- Copenhagen, Aarhus, Odense and Aalborg shown through everyday scale, not tourist monuments only.

Rules:

- No staged “pointing at laptop” stock photos.
- Obtain written consent and record licence/credit.
- Provide meaningful alt text when the image carries information; empty alt for decoration.
- Never imply an unidentified model is Tereza or a real advisee.

## Motion

- Use motion to show step changes, filter updates and disclosure, not as decoration.
- 150–250 ms standard transitions.
- Honour `prefers-reduced-motion` and remove parallax/autoplay.
- Result-count updates should be announced to assistive technology without stealing focus.

## Accessibility content rules

- Never use “click here.” Link text states destination.
- Accordions are real buttons with `aria-expanded` and stable relationships.
- Error copy names the problem and next action.
- Date format in Czech display: `15. 3. 2027, 12:00 CET`; machine values use ISO.
- Currency display: `7 426 DKK`, never ambiguous `7.426`.
- Programme names remain English; surrounding labels are Czech.
- Quiz choices are native radio/checkbox controls styled accessibly.
- Checklist state must not be encoded only by colour or strikethrough.
- Print styles retain warnings, source URLs and unchecked items.

## Content performance

- Static-render core guides for search and reliability.
- Keep the catalogue JSON separate and cacheable.
- Search client-side after lazy-loading the catalogue on `/programy` only.
- Index normalised search text once, not on every keystroke.
- Debounce text search around 100–200 ms.
- Do not load any model weights in the core v1.
- Do not ship all team portraits or city photography at original resolution.

## Trust details

- A small `Platné k` label is part of every factual card.
- External official links use an external-link icon plus visible source name.
- Source links open normally; do not force a new tab on every link without warning.
- The footer always includes independent status.
- A “Našli jste chybu?” link sits on all long factual pages.
- Do not collect an email address merely to reveal results.

## Empty, error and stale states

### Catalogue fails to load

`Katalog se teď nepodařilo načíst. Můžeš pokračovat na oficiální vyhledávání Study in Denmark nebo to zkusit znovu.`

Actions: `Zkusit znovu` / `Otevřít Study in Denmark`

### Data are older than refresh policy

`Tento katalog nebyl v poslední době aktualizován. Ber výsledky jen jako inspiraci a vše ověř přímo u školy.`

### Matcher has weak evidence

`Na přesný výběr zatím nemáme dost signálů. Odpověz ještě na jednu otázku nebo si projdi širší témata.`

### Placeholder remains

Development-only banner: `Chybí schválený obsah: [field]. Produkční build musí být zastaven nebo prvek skryt.`

## Acceptance review

Before release, test with:

- Czech secondary-school student on a phone;
- Slovak secondary-school student;
- Czech parent on a laptop;
- current Bachelor's student searching for a Master's;
- keyboard-only user;
- screen-reader smoke test;
- slow 4G and a 360 px viewport.

Success is not “they liked the colours.” Success is that each person can state their next action and identify which fact must still be verified officially.

