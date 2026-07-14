# Programme matcher specification

## Recommendation

Launch without a hosted LLM.

The best zero-cost v1 is a transparent local matcher over the supplied programme data. It understands a controlled Czech/Slovak/English vocabulary, scores real catalogue entries and explains the overlaps. It has no token bill, API key, quota failure, privacy transfer or hallucinated degree names.

An LLM can later improve interpretation or wording, but it must never be the programme database or eligibility authority.

## Why “free LLM API” is the wrong foundation

- Hosted free tiers can change, throttle, require billing setup or disappear.
- A browser-visible API key will be copied and abused.
- A generic model does not know whether a programme is open this year.
- Even a strong model can invent a plausible Danish programme, deadline or requirement.
- The user's need is mostly constrained retrieval and ranking, not open-ended generation.

The product requirement should therefore be “no marginal cost and no invented programmes,” not “must contain a chatbot.”

## V1 architecture

```text
User answers
  → normalise Czech/Slovak/English text
  → expand controlled synonyms
  → infer topic and work-style signals
  → pre-filter by degree and optional location
  → score only supplied catalogue entries
  → diversity pass
  → render 5–8 programme IDs with templated reasons
```

Everything runs in the browser. No free-text answer leaves the device.

## Input contract

```ts
type MatcherInput = {
  interestsText: string;
  workStyles: Array<
    | "people"
    | "numbers-data"
    | "ideas-stories"
    | "technology"
    | "nature-lab"
    | "mixed"
  >;
  goalsText: string;
  goalChips: string[];
  level: "bachelor" | "master" | "unsure";
  preferredCities: string[];
};
```

Do not store `interestsText` or `goalsText` in analytics, URL parameters or server logs.

## Programme contract

Use `data/programmes.schema.json`. The matcher may only return an `id` that exists in `data/programmes.json`.

Important fields:

- `id` — stable result identifier;
- `title`, `description` — English discovery text;
- `level` — Bachelor or Master;
- `topics` — controlled derived categories;
- `institution`, `city` — context/preferences;
- `officialProgrammeUrl`, `sourceUrl` — mandatory verification paths;
- `verificationStatus` — always discovery-only in the current dataset.

## Controlled topic taxonomy

Current dataset topics:

- `business-management`
- `it-data`
- `engineering-technology`
- `design-architecture-arts`
- `health-life-science`
- `natural-science`
- `sustainability-climate`
- `society-politics`
- `humanities-culture`
- `communication-media`
- `education-learning`
- `law`
- `other`

Programmes can carry several topics.

## Starter synonym dictionary

Keep this in an editable JSON/TypeScript data file. Match stems and phrases, not only exact whole sentences.

```json
{
  "business-management": [
    "business", "firma", "firmy", "podnikání", "podnikat", "management",
    "řízení", "strategie", "marketing", "značka", "brand", "finance",
    "účetnictví", "ekonomie", "ekonomika", "startup", "innovation",
    "biznis", "podnikanie", "manažment", "účtovníctvo"
  ],
  "it-data": [
    "it", "počítač", "programování", "kód", "software", "aplikace", "web",
    "data", "analytika", "umělá inteligence", "ai", "machine learning",
    "kyberbezpečnost", "hry", "robot", "programovanie", "aplikácia"
  ],
  "engineering-technology": [
    "technika", "inženýrství", "stroje", "mechanika", "elektro", "elektronika",
    "energetika", "výroba", "materiály", "stavby", "mechatronika", "offshore",
    "technológia", "inžinierstvo"
  ],
  "design-architecture-arts": [
    "design", "navrhování", "architektura", "město", "budovy", "produkt",
    "grafika", "umění", "hudba", "film", "móda", "kreativita", "tvorba",
    "architektúra", "umenie"
  ],
  "health-life-science": [
    "zdraví", "medicína", "nemoc", "člověk", "tělo", "výživa", "farmacie",
    "biomedicína", "veřejné zdraví", "sport", "mozog", "zdravie", "výživa"
  ],
  "natural-science": [
    "biologie", "chemie", "fyzika", "matematika", "laboratoř", "výzkum",
    "příroda", "molekuly", "geologie", "zemědělství", "biológia", "chémia",
    "laboratórium", "výskum"
  ],
  "sustainability-climate": [
    "klima", "udržitelnost", "životní prostředí", "obnovitelné zdroje", "energie",
    "green", "circular", "sustainability", "příroda", "klíma", "udržateľnosť",
    "životné prostredie"
  ],
  "society-politics": [
    "společnost", "politika", "mezinárodní vztahy", "lidé", "nerovnost",
    "migrace", "bezpečnost", "rozvoj", "veřejná politika", "sociologie",
    "spoločnosť", "politika", "medzinárodné vzťahy"
  ],
  "humanities-culture": [
    "historie", "jazyk", "kultura", "literatura", "filozofie", "náboženství",
    "humanitní", "dějiny", "kultúra", "literatúra", "filozofia"
  ],
  "communication-media": [
    "komunikace", "média", "žurnalistika", "novinařina", "sociální sítě",
    "obsah", "příběh", "psaní", "komunikácia", "médiá", "žurnalistika"
  ],
  "education-learning": [
    "učit", "škola", "vzdělávání", "děti", "pedagogika", "učení",
    "učiteľ", "vzdelávanie", "pedagogika"
  ],
  "law": [
    "právo", "zákony", "soud", "regulace", "legal", "právo", "zákon"
  ]
}
```

Add English title/description terms from `scripts/update_programmes.mjs` to the same concepts. Treat diacritics-insensitive matching as an aid; preserve the original text for display.

## Work-style mapping

```ts
const workStyleTopics = {
  people: ["society-politics", "health-life-science", "education-learning", "business-management"],
  "numbers-data": ["it-data", "business-management", "natural-science", "engineering-technology"],
  "ideas-stories": ["communication-media", "humanities-culture", "design-architecture-arts"],
  technology: ["it-data", "engineering-technology", "design-architecture-arts"],
  "nature-lab": ["natural-science", "health-life-science", "sustainability-climate"],
  mixed: []
};
```

This is a soft preference, never a hard exclusion.

## Goal-chip mapping

| Czech label | Signals |
|---|---|
| Vytvářet produkty | design, engineering, IT, business |
| Pomáhat lidem | health, education, society |
| Zlepšovat firmy | business, data, communication |
| Pracovat s daty | IT/data, natural science, business |
| Chránit klima | sustainability, engineering, natural science |
| Navrhovat města nebo věci | design/architecture, engineering |
| Dělat výzkum | natural science, health, society, engineering |
| Ještě nevím | no topic boost; trigger diversity |

## Text normalisation

1. Unicode normalise (`NFKD`).
2. Keep an original display copy.
3. Lowercase.
4. Create a comparison copy without diacritics.
5. Replace punctuation with spaces, keeping `c++`, `ai`, `it` where useful.
6. Collapse whitespace.
7. Match phrase dictionary before single tokens.
8. Ignore Czech, Slovak and English stop words.
9. Use a simple stem/variant list; do not add a large NLP dependency unless it materially improves tests.

## Scoring

Return an explanation object alongside the numeric internal score. Do not show the raw number as a “fit percentage.”

Suggested weights:

```ts
score =
  12 * exactTopicSignals +
   7 * titlePhraseMatches +
   3 * descriptionTermMatches +
   4 * workStyleTopicMatches +
   5 * goalTopicMatches +
   2 * preferredCityMatch +
   1 * crossLanguageSynonymMatches;
```

Rules:

- Degree is a hard filter if the user selected Bachelor or Master.
- `unsure` keeps both levels but the result UI clearly labels them; ask a follow-up if education history makes the choice ambiguous.
- City is a soft boost by default. Offer “only this city” as an explicit advanced filter.
- Cap repeated description matches so verbose descriptions do not dominate.
- A title match is stronger than a description match.
- Penalise `other` only if well-tagged alternatives exist.
- Never use university name or perceived prestige as a quality score.
- Never use tuition/SU as a programme-quality signal.

## Diversity pass

Pure scoring can return seven nearly identical specialisations. After ranking:

1. take the top result;
2. add the next result unless the same institution + same primary topic already appears twice;
3. reserve at least one result from a second plausible topic when its score is within a reasonable margin;
4. allow a maximum of three results from one institution in the first eight unless the user filtered to it;
5. label the broader result `Širší možnost k prozkoumání`.

Do not force diversity when the user is highly specific, e.g. “wind turbine electrical engineering.”

## Confidence states

Internal state can use thresholds derived from test fixtures, not universal numbers:

- `strong`: at least two independent signals and one title/topic match;
- `useful`: one clear topic plus work/goal support;
- `broad`: only one weak signal;
- `insufficient`: no controlled signal.

UI behaviour:

- Strong/useful: show 5–8 results.
- Broad: show 3–5 exploratory results plus one follow-up.
- Insufficient: do not pretend. Ask one of the controlled follow-up questions.

## Explanation generation without an LLM

Use deterministic templates filled by the explanation object.

Examples:

```ts
const templates = {
  topicAndStyle:
    "Program se potkává s tvým zájmem o {topic} a často pracuje způsobem, který sis vybral/a: {workStyle}.",
  goal:
    "Dává smysl pro směr „{goal}“, protože v názvu nebo popisu najdeme {evidence}.",
  city:
    "Navíc odpovídá tvé preferenci města {city}; město ale nebylo hlavním důvodem pořadí.",
  broad:
    "Je to o něco širší možnost. Zařazujeme ji, protože propojuje {topicA} s {topicB}."
};
```

Every card must also say:

`Doporučení neověřuje tvoje vstupní předměty ani přijetí. Otevři požadavky školy.`

The evidence shown to the user must be human-readable words, not stem fragments or hidden IDs.

## Eligibility boundary

The matcher does **not** decide:

- whether the Czech/Slovak diploma qualifies;
- Danish subject-level equivalence;
- English-language exemption;
- ECTS match for a Master's;
- Quota 1/2 outcome;
- tuition status;
- SU entitlement;
- whether the programme will open for the next intake.

If a user asks an eligibility question, route them to the programme's official requirements and the application guide.

## Optional v2: local semantic search

Before adding a generative model, consider small on-device embeddings with Transformers.js. Official documentation supports running models directly in the browser without a server, and WebGPU can accelerate compatible devices. This can improve Czech-to-English semantic retrieval while the existing scoring and validation remain in control.

Constraints:

- Lazy-load only after the user opts in.
- Show model/download size before download.
- Provide a non-WebGPU fallback.
- Cache responsibly and offer “clear local model/data.”
- Benchmark on mid-range phones; abandon if the experience is slow or memory-heavy.
- The model retrieves candidates; it still cannot create programme IDs.

## Optional v3: local generative explanation

WebLLM can run supported LLMs in the browser through WebGPU without a server. Use it only as an enhancement to rewrite explanations, not as the scorer or catalogue.

Risks:

- model downloads can be hundreds of MB or several GB;
- WebGPU/device support and memory vary;
- mobile startup may be poor;
- model licences differ;
- generated Czech quality may be inconsistent.

Required UX:

`Volitelná lokální AI se stáhne do tvého zařízení. Může být velká a na některých telefonech nemusí fungovat. Základní doporučení funguje i bez ní.`

## Optional hosted LLM adapter

Only add this if the owner accepts a server function, privacy review and possible future cost.

Architecture:

1. deterministic matcher selects top 20 programme records;
2. server sends only the minimum necessary user text and those 20 records;
3. model returns strict JSON with existing IDs only;
4. server validates against the candidate set and schema;
5. invalid response falls back to deterministic results;
6. rate limit, abuse protection and budget ceiling are mandatory;
7. API key remains server-side;
8. feature flag can disable the provider instantly.

Suggested output schema:

```json
{
  "results": [
    {
      "programmeId": "existing-id-only",
      "reasonCs": "Maximum 240 characters, based only on supplied fields.",
      "matchedSignals": ["topic-id", "work-style-id"]
    }
  ],
  "followUpQuestionCs": null
}
```

System instruction for any hosted model:

> You rank a closed list of Danish study programmes. Return only IDs from CANDIDATES. Never invent, rename or merge a programme. Do not assess admission eligibility, tuition, SU or deadlines. Reasons must cite only supplied title, description, topic, city and user preference. If evidence is weak, return fewer results and one follow-up question. Output valid JSON matching the schema and no other text.

Do not rely on a Gemini/Groq/other vendor's free tier as a permanent product promise. Current providers may have no-cost quotas, but live limits are model-, project-, region- and policy-dependent.

## Index/update behaviour

On catalogue update:

1. run `node scripts/update_programmes.mjs`;
2. validate JSON/schema and counts;
3. compare added/removed IDs;
4. inspect new institution/city slugs;
5. run matcher fixtures;
6. review descriptions and broken official links;
7. publish with updated dataset date;
8. never carry saved favourites silently if an ID disappears—show a clear “programme no longer in current discovery catalogue” state.

## Analytics without private text

Allowed events:

- `matcher_started`
- `matcher_completed`
- `matcher_followup_shown`
- `programme_result_opened` with programme ID
- `official_programme_link_clicked` with programme ID
- count of selected topics/work-style enums
- degree selection and coarse city selection if consent/policy allows

Never send:

- raw interests/goals text;
- a replay of typing;
- free-text alongside identifiable contact data;
- full shortlist URL if it contains personal answers.

## Test fixtures

Create at least these deterministic tests:

1. `Baví mě programování, data a umělá inteligence` → IT/data dominates; every ID exists.
2. `Chci řešit klima, energii a technické systémy` → sustainability + engineering, not generic business only.
3. `Ráda píšu, zajímají mě média a společnost` → communication/media + society/humanities.
4. Slovak: `Baví ma chémia, laboratórium a zdravie` → natural science + health.
5. English: `I want to design products and digital experiences` → design + IT/product-related options.
6. `Nevím` → insufficient state, not a random confident ranking.
7. Bachelor hard filter returns zero Master's IDs.
8. Master hard filter returns zero Bachelor's IDs.
9. City preference boosts but does not erase stronger matches.
10. A catalogue record with an old intake date never surfaces it as authoritative.
11. A removed ID in a shared shortlist shows a stable unavailable state.
12. No generated reason mentions a claim absent from title/description/topics/city.

## Definition of safe matching

The matcher is successful when users discover plausible options and understand why they appeared. It is unsafe if a user could reasonably interpret its output as an admission decision, definitive current catalogue, scholarship promise or ranking of university quality.

