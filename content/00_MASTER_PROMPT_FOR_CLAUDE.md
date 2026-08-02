# MASTER PROMPT — build the Czech guide to studying in Denmark

Copy everything below the divider into Claude. Attach this complete folder in the same conversation.

---

You are a senior product designer, Czech UX writer and full-stack web engineer. Build a production-quality, mobile-first website for an independent initiative that helps Czech and Slovak students choose a Danish university programme, apply correctly, move to Denmark and understand SU.

## 1. Mission

Turn a complicated international-study process into a calm, honest and extremely clear journey. A 17-year-old Czech student and their parent must both be able to understand what to do next without prior knowledge of Danish systems.

The emotional promise is:

> Dánsko je velký krok. Nemusí to ale být krok naslepo.

The practical promise is:

> Najdi si obor, připrav přihlášku, naplánuj stěhování a pochop SU — česky, krok za krokem a s odkazy na oficiální zdroje.

The site is independent and free. It is not an admissions agency and must never imply guaranteed admission, guaranteed housing, guaranteed SU or official affiliation.

## 2. Inputs and source of truth

Read the supplied files before coding:

1. `01_COPY_CS.md` is the approved base copy. Use it; do not replace it with generic marketing prose.
2. `02_INFORMATION_ARCHITECTURE_AND_UX.md` defines routes, sections, interactions and visual direction.
3. `03_PROGRAMME_MATCHER_SPEC.md` defines the no-cost programme matcher and its optional AI enhancement.
4. `04_CONTENT_MODEL.json` centralises volatile facts, labels, notices and placeholders.
5. `05_FACT_CHECK_AND_SOURCES.md` contains official sources and claim-level accuracy notes.
6. `06_SEO_AND_ANALYTICS.md` defines page metadata and respectful measurement.
7. `07_EDITORIAL_OPERATIONS.md` defines freshness and editorial controls.
8. `data/programmes.json` is the programme discovery catalogue; validate it against `data/programmes.schema.json`.

If files conflict, follow this priority:

`05_FACT_CHECK_AND_SOURCES.md` → `04_CONTENT_MODEL.json` → `01_COPY_CS.md` → the remaining briefs.

Do not silently “improve” a precise rule. If a factual statement appears uncertain or stale, show a neutral notice and link to the official source. Never invent a rate, deadline, admission requirement, housing guarantee, programme, URL or testimonial.

## 3. Replaceable project details

Create one configuration file for these values so the founders can update them without searching the codebase:

- brand name: `[DOPLNIT: NÁZEV PROJEKTU]`
- short brand name: `[DOPLNIT]`
- site URL: `[DOPLNIT]`
- contact email: `[DOPLNIT]`
- Tereza's approved bio and portrait: `[DOPLNIT]`
- team bios and portraits: `[DOPLNIT]`
- privacy/legal owner details: `[DOPLNIT]`
- optional social URLs: `[DOPLNIT]`

Render a visible development warning if any mandatory placeholder remains. Do not publish fabricated biographies or stock-photo identities.

## 4. Language and voice

Primary UI and content language: Czech. Preserve correct Czech diacritics. Mention the Slovak document name where this materially helps Slovak students. Programme titles and official institution names remain in English.

Voice:

- warm, energetic and reassuring;
- direct second-person singular (“ty”); gender-neutral sentence construction where practical;
- short sentences and concrete verbs;
- quietly witty, never childish;
- transparent about costs, winter, housing and conditions;
- aspirational without “free money,” “dream guaranteed,” or sales-agency pressure.

Prefer: “Tady je přesný další krok.”  
Avoid: “Embark on a life-changing journey,” “seamless,” “world-class,” “unlock your potential,” and unsupported superlatives.

## 5. Routes and navigation

Build these routes:

- `/` — landing page plus About section
- `/proc-dansko` — Why Denmark
- `/programy` — Find your programme and full catalogue
- `/jak-se-prihlasit` — Bachelor's and Master's application guides
- `/stehovani` — Moving to Denmark
- `/su` — SU guide
- `/zdroje` — official sources, update dates and corrections policy
- `/ochrana-soukromi` — privacy policy placeholder, not invented legal text
- friendly custom `404`

Header navigation labels:

- Proč Dánsko
- Najdi program
- Jak se přihlásit
- Stěhování
- SU

Primary sticky CTA: `Najít můj program`  
Mobile navigation must be fully keyboard and screen-reader accessible.

## 6. Landing page

Use the exact core copy from `01_COPY_CS.md`. Structure:

1. Oversized editorial hero with two CTAs.
2. Three concise trust facts, each with a footnote or source link where necessary.
3. “Začni tam, kde právě jsi” journey cards:
   - Teprve vybírám → programme finder
   - Chystám přihlášku → application guide
   - Jsem přijatý/á → moving checklist
   - Už jsem v Dánsku → SU guide
4. Interactive three-question programme teaser using the same deterministic scoring as the full matcher.
5. Friendly “Dobré vědět předem” planning section.
6. Teri's approved story, project purpose and expert-community invitation.
7. Final CTA and compact independent-guide disclaimer.

Do not use a giant Danish flag as the hero. Do not create a corporate consulting aesthetic.

## 7. Why Denmark page

Turn the supplied copy into an editorial story, not a wall of icon cards. Cover:

- no tuition fees for qualifying EU/EEA/Swiss students at Danish public and most recognised institutions;
- many English-taught programmes;
- practical/project-based learning, teamwork and direct lecturer contact;
- the possibility of SU for EU workers, clearly marked as conditional and individually assessed;
- Danish-language education: commonly course-fee-free after referral/eligibility, but deposit and local rules can apply;
- international friendships, student organisations, parties, cycling, coast, design, calmness and hygge;
- the honest trade-offs: expensive housing, deposits, job search, wind, dark winters and responsibility.

Any “free” claim needs its condition in the same component, not hidden in a legal footer.

## 8. Programme finder

### Catalogue

Load `public/data/programmes.json`. It contains English-taught Bachelor, AP, Top-up and Master routes. Do not hardcode any count; calculate it at runtime from `meta.typeCounts` and show the dataset's `generatedAt` date.

Provide:

- keyword search;
- filters for study route (Bachelor, AP, Top-up or Master), topic, city and institution;
- active filter chips and clear-all action;
- sort by relevance, A–Z, city and institution;
- result count and an accessible no-results state;
- grouped or virtualised rendering so 352 accordions do not harm performance;
- shareable URL query parameters;
- programme cards with title, programme type, institution, city, duration/ECTS when present, topic chips, short description, “Proč se může hodit” matcher explanation, official institution link and Study in Denmark source link;
- for curated 2027/28 AP and Top-up records, a visible intake status and direct evidence link;
- visible copy: `Ověř si aktuální intake, požadavky a deadline přímo u školy.`

Never display a deadline from the discovery catalogue as authoritative. The source catalogue itself says it is being revised. If a date is displayed at all, label it `Neověřený údaj z katalogu` and send users to the official institution.

### Free matcher

Implement the deterministic, browser-side matcher in `03_PROGRAMME_MATCHER_SPEC.md`. It must work without an LLM, API key, login or server cost.

Input flow:

1. `Co tě baví nebo o čem pořád přemýšlíš?` — free text, Czech/Slovak/English accepted.
2. `Jak chceš pracovat?` — people / numbers / ideas / technology / nature / mixed.
3. `Co chceš po škole dělat?` — free text or suggested chips.
4. Degree: Bachelor's / Master's / unsure.
5. Optional city preference; default is no city preference.

Output exactly 5–8 ranked programmes. Each result needs:

- a transparent two-sentence Czech reason based only on matched terms/tags;
- visible fit indicators, not a fake scientific percentage;
- one “ověř si” note;
- official link;
- `Upravit odpovědi` and `Zobrazit celý katalog` actions.

No result may be created unless its ID exists in the supplied catalogue. If confidence is weak, say so and ask one useful follow-up question; do not fabricate a confident recommendation.

### Optional AI enhancement

Put any AI adapter behind a feature flag, disabled by default. The core site must remain complete without it. If later enabled, the model may only rerank provided catalogue IDs and return validated JSON. Do not expose API keys in client code. Do not call a paid API without explicit owner configuration. Do not market a vendor's temporary free tier as permanently free.

## 9. How to apply

Create two visually and semantically separate journeys:

### Bachelor's / professional Bachelor's

Explain Optagelse.dk in very small steps. Include:

- requirements check before portal work;
- Czech and Slovak school-document checklists;
- original plus institution-accepted certified English translation guidance;
- statement of teaching hours/course hours where the programme asks for it;
- language documentation and programme-specific subject levels;
- portal account/login route for applicants without Danish MitID;
- adding up to eight programme choices and why order matters;
- uploading documents;
- submitting every choice separately;
- generating, printing, hand-signing and sending a signature page separately to every institution when applying without MitID, using that institution's stated channel;
- saving receipts and monitoring email/portals;
- the general 15 March at 12:00 CET deadline for applicants with a non-Danish upper-secondary qualification;
- 5 July at 12:00 only as the general priority/reordering/final-document point, with a warning that institution document deadlines vary;
- the usual 28 July offer date;
- Quota 1 and Quota 2 in plain language.

Use a progress checklist that saves only locally in the browser. Include print and `Exportovat checklist jako PDF` if the chosen stack supports a stable accessible implementation.

### Master's

State prominently: `Na magistra se zpravidla nepřihlašuje přes Optagelse.dk.` Explain that the applicant uses each university's own application portal and that deadlines and required documentation differ by institution/programme. Provide a reusable checklist: eligible Bachelor's, course match, transcript, degree/diploma or current-enrolment statement, grading scale, English proof, translations, course descriptions, CV/motivation only if asked, application receipt and portal monitoring.

Never generalise one university's deadline to all Danish universities.

## 10. Moving to Denmark

Create a timeline from admission to the first month:

1. Financial buffer and budget.
2. Housing search.
3. Signed lease and scam check.
4. Travel and temporary plan.
5. EU residence document through SIRI if staying more than three months.
6. CPR registration.
7. MitID and Digital Post.
8. Bank account/NemKonto and tax card.
9. Student job.
10. SU application if eligible.

Housing must be city-aware:

- Copenhagen: university links first; `s.dk` and `KKIK`; then clearly labelled commercial portals.
- Aarhus: `StudentHousingAarhus.com`; explain free registration, seniority and early activation.
- Odense: SDU Housing for eligible international students; show current application deadlines only from editable fact data and say it can be applied for before final admission where SDU currently permits it.
- Aalborg: AAU Accommodation Office for relevant international students; link to AAU's current page.
- Everywhere: university housing pages first, then BoligPortal, Lejebolig, BoligHub, BoligZonen and DBA as commercial/marketplace options with scam precautions.

Include a budget calculator with DKK only by default. Do not hardcode exchange rates. Inputs: rent, deposit, prepaid rent, first rent, food, transport, setup, travel, emergency buffer and months before expected job/SU. Show scenarios, not promises:

- outside Copenhagen with confirmed student housing: roughly DKK 25,000–35,000;
- safer general buffer: roughly DKK 35,000–50,000;
- Copenhagen/private rental: roughly DKK 45,000–75,000+.

Label these as planning estimates derived from cited rents/upfront-payment rules, not official minimums. Explain that a Danish landlord may in some cases ask for up to three months' deposit plus three months' prepaid rent, in addition to the first month. Put the anti-scam warning next to any deposit action: never transfer money before identity, address and signed contract checks.

## 11. SU page

This page carries the highest misinformation risk. Use the supplied text and centralised facts exactly.

At the top:

> SU je dánský státní příspěvek na studium. Běžná SU není půjčka a při oprávněném čerpání se nevrací. Pro zahraničního studenta z EU ale není automatická: nejčastěji musí získat status pracovníka podle práva EU.

Then show:

- current 2026 away-from-parents higher-education rate: DKK 7,426/month before tax, with `Platné pro rok 2026` and official link;
- ordinary SU vs optional `SU-lån` comparison;
- step-by-step application from admission and CPR through minSU and the foreign-citizen equal-status form;
- three-week deadline to complete the equal-status form after the SU application;
- no retroactive SU before the month of application;
- Digital Post and document checklist;
- work requirement warning: generally 10–12 paid hours **each week**, normally for at least 10 consecutive weeks, continuing while SU is received; individual assessment and approval-letter rule;
- explicit myth card: `43 hodin měsíčně není bezpečné pravidlo.` Explain that exactly 40 hours in most months is generally insufficient and 43 is only a rough monthly average, while official monitoring focuses on weekly genuine work and the individual decision;
- first-ten-weeks/holiday warning;
- continuous monitoring and record-keeping: contracts, payslips, signed timesheets/rosters and holiday documentation;
- immediate reporting if work stops or drops;
- potential stopping and recovery of overpaid SU;
- 2026 higher-education income allowance of DKK 20,749 for an SU month, before tax but after the 8% labour-market contribution, with an annual-calculation warning;
- 2027 SU reform note for students who start a new higher education on/after 1 July 2025, with official link and neutral wording.

Do not use a penalty number unless the official source supports it. Do not say missing one week automatically causes a fixed fine. Explain the actual risk: loss of equal status, stopped payments and repayment of SU received without entitlement, assessed from the circumstances.

## 12. About section

Use real people only. Until biographies and portraits are approved, render polished placeholder cards in development but hide them in production or display only a general project-purpose section.

Suggested structure:

- Teri — founder story and lived experience;
- why the project exists;
- invitation to contact the wider expert community after reading the site;
- principles: zdarma, lidsky, ověřitelně, bez provize za volbu školy.

Do not claim a team member studied at, worked at or received SU from an institution unless supplied and approved.

## 13. Visual direction

Take inspiration from the confidence and editorial rhythm of Study in Sweden, but create an original identity. Do not copy its layouts, wording or assets.

Aim for “Scandinavian editorial magazine meets a helpful older student”:

- generous whitespace;
- oversized expressive headings;
- strong grid, asymmetry used carefully;
- warm off-white background and dark ink text;
- cobalt/royal blue primary; tomato red, butter yellow and soft mint as accents;
- one restrained border radius system; avoid endless floating SaaS cards;
- candid, real student photography: people studying, cycling, swimming/coast, studios, workshops and ordinary city life;
- a few abstract geometric illustrations inspired by paper cut-outs, not Danish stereotypes;
- no Viking helmets, mermaids, repeated flags or stock-photo handshakes;
- clear source/date labels as part of the design, not footnote clutter.

Use open-source fonts with Czech/Slovak glyph coverage. A good direction is a characterful display sans plus a highly legible UI sans. Self-host fonts if practical and performance-compliant.

## 14. Engineering defaults

If no stack is specified, use a current stable Next.js release with TypeScript, App Router, static generation where possible and content/data separated from components. A no-framework static implementation is also acceptable if it better matches the owner's hosting constraints. Explain your choice before coding.

Requirements:

- no database or authentication for v1;
- programme matching runs in the browser;
- no secret keys in the repository or browser bundle;
- content and volatile facts live in editable data files;
- all external links use safe attributes and descriptive labels;
- image optimisation, lazy-loading and explicit dimensions;
- canonical URLs, sitemap, robots.txt and OpenGraph metadata;
- schema.org `WebSite`, `Organization` (only after owner details), `BreadcrumbList` and `FAQPage` where content is visible on-page;
- privacy-friendly analytics only after configuration and consent analysis; no dark-pattern cookie banner;
- no personal data collection in the matcher; answers stay local unless the user explicitly opts into a future server feature;
- error boundaries and useful empty/loading states;
- unit tests for scorer, filters, URL state and volatile-fact rendering;
- one end-to-end smoke test for each core route and the full matcher journey.

Performance and accessibility acceptance:

- WCAG 2.2 AA target;
- keyboard-operable menus, filters, accordions, quiz, dialogs and calculators;
- semantic headings, visible focus and meaningful link text;
- correct accessible names and announced result counts;
- reduced-motion support;
- no colour-only meaning;
- mobile first from 320 px;
- aim for Lighthouse 90+ in performance, accessibility, best practices and SEO on representative pages;
- do not render hundreds of hidden accordion bodies into the initial DOM.

## 15. Trust and freshness system

Every volatile-fact component must show:

- concise fact;
- `Platné k: DD. MM. YYYY` or `Pro rok YYYY`;
- direct official-source link;
- optional warning when personal/institutional assessment applies.

Build a sources page from the supplied source register. Add a visible corrections link: `Našli jste nepřesnost? Napište nám.` The footer must state that the site is independent and that official institutions decide admission, residence and SU matters.

## 16. Required deliverables from you

Before implementation, reply with:

1. a short list of assumptions;
2. the proposed stack and why;
3. the route/component/data architecture;
4. any blockers that truly require founder input.

Then implement the site. Deliver:

- complete source code;
- README with setup, development, test and deployment commands;
- `.env.example` containing no secrets;
- content update guide;
- passing tests;
- a report of any supplied copy or fact you did not use and why;
- a launch checklist naming all remaining `[DOPLNIT]` items;
- no invented data to make screenshots look finished.

## 17. Definition of done

The work is done only when:

- all required routes work on mobile and desktop;
- a user can find and filter the supplied catalogue;
- the deterministic matcher returns only real supplied programme IDs;
- Bachelor's and Master's application flows are clearly separated;
- SU never says “43 hours/month is enough” and never implies automatic entitlement;
- housing content shows realistic upfront costs and scam warnings;
- official links and review dates are visible;
- placeholders cannot accidentally reach production unnoticed;
- accessibility, type checking, linting and tests pass;
- the finished result feels human, editorial and distinctly original.

Start by summarising your understanding and naming any essential missing founder inputs. Do not ask about decisions already answered in the supplied files.
