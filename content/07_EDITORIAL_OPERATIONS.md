# Editorial operations and maintenance

The project will lose trust faster from one stale SU rule than it gains from twenty beautiful lifestyle photos. Treat freshness as a product feature.

## Minimum roles

One person may hold several roles, but each must have a named owner:

| Role | Responsibility | Owner |
|---|---|---|
| Editorial owner | Approves Czech copy and priorities | `[DOPLNIT]` |
| Fact-check owner | Reviews official sources and dates | `[DOPLNIT]` |
| Programme-data owner | Runs catalogue update/diff | `[DOPLNIT]` |
| Technical owner | Deploys and handles failures/security | `[DOPLNIT]` |
| Corrections owner | Responds to reported inaccuracies | `[DOPLNIT]` |
| Privacy owner | Reviews forms, analytics and retention | `[DOPLNIT]` |

No page should show “verified” without a person responsible for that verification.

## Content classes

### Stable copy

Examples: project mission, how to use the matcher, general cultural framing.

Review: annually or when the product changes.

### Institution-specific copy

Examples: SDU housing guarantee, AU translation approach, UCPH deadline example.

Review: before each relevant admissions/housing cycle and after source alerts.

### Volatile official facts

Examples: SU amount, income limit, work rule, deadlines, deposit, residence process.

Review: at least annually; higher-risk items monthly during their active season.

### Planning estimates

Examples: DKK 25,000–75,000 moving-buffer scenarios.

Review: twice per year against rent/budget sources and real student feedback. Always label as estimates.

### Programme data

Review: monthly November–March and quarterly otherwise. Individual records remain discovery-only.

## Every fact needs metadata

Store:

- internal fact ID;
- display value;
- scope/category;
- effective year/date;
- last checked date;
- direct official URL;
- reviewer;
- whether individual assessment applies;
- next review date;
- optional expiry date.

If the effective year passes without a replacement, the component should hide the amount or show a stale warning—not silently present it as current.

## Change workflow

1. Open the official source directly.
2. Check page update date and whether the applicant category matches.
3. Record old value, new value and source URL.
4. Update the central fact; avoid changing the same number in prose in five places.
5. Search the repository for the old wording/value.
6. Review related practical advice.
7. Have a second person review SU/residence/admissions changes when possible.
8. Run tests and build.
9. Publish with accurate `last checked`, not a blanket site-wide date if only one fact changed.
10. Add a correction/change note when the old advice could have caused financial or eligibility harm.

## Programme update workflow

From the content-pack root:

```bash
node scripts/update_programmes.mjs
```

Then:

1. confirm the source total and Bachelor/Master counts are plausible;
2. compare `id` lists with the previous file;
3. review every removed programme before deleting saved/public links;
4. review new institution and city slugs;
5. inspect a random sample of at least 10 official programme URLs;
6. inspect every record with missing/changed official URL;
7. confirm past intake dates are not surfaced;
8. run schema validation and matcher tests;
9. publish the new generated date;
10. keep the previous dataset for rollback/version history.

Suggested diff report:

```text
Generated:
Source total:
Included total:
Bachelor / Master:
Added IDs:
Removed IDs:
Changed official URLs:
New cities/institutions:
Sample links checked by:
Approved by:
```

## Correction policy

Public promise:

> Když nám pošlete možnou chybu s oficiálním odkazem, prověříme ji. U nepřesnosti, která může ovlivnit deadline, peníze nebo nárok, budeme opravu prioritizovat.

Internal severity:

- **P0 — immediate:** wrong deadline, wrong SU rule/rate, false residence requirement, scam-promoting housing advice, exposed personal data/security issue.
- **P1 — within 2 working days:** wrong programme availability/link, misleading document/translation instruction, materially wrong budget.
- **P2 — next editorial cycle:** wording ambiguity, stale cultural/lifestyle detail, typo or minor UX issue.

For P0:

1. remove or flag the affected claim immediately;
2. point users to the authority;
3. correct after verification;
4. review all duplicated instances;
5. consider a visible correction note;
6. document cause and prevention.

## Seasonal calendar

### January

- Update SU amount and `fribeløb`.
- Review SU reform and worker rules.
- Review application cycle dates.
- Refresh Czech/Slovak document guidance.
- Prepare social copy without unqualified “free” claims.

### February–15 March

- Weekly Optagelse/link check.
- Prominent deadline banner with date, time zone and source.
- Monitor correction inbox frequently.
- Do not change high-risk instructions from anecdotal feedback without source.

### April–July

- Review final-document and priority wording.
- Check result date and offer-response guidance.
- Increase moving/housing content prominence.

### July–September

- Review SIRI/CPR/arrival links.
- Recheck city housing and scam warnings.
- SU guide and first-ten-weeks warning become primary.
- Collect anonymised friction themes, not student documents.

### October–December

- Interview students and update qualitative advice.
- Audit broken links and programme taxonomy.
- Prepare next application cycle.

## Founder/team content approval

Before publishing any person:

- written approval of name, role and bio;
- permission/licence for photograph;
- alt-text decision;
- confirmation of school/programme/year claims;
- confirmation of SU, job or housing story details if included;
- removal process if the person leaves.

Never use a stock-photo person with a real team name.

## User stories and testimonials

Store consent, approved quote and context. Every story should state enough context to prevent false generalisation:

- nationality/citizenship category if relevant;
- programme and institution;
- intake/year;
- city;
- whether experience is personal, not advice;
- date reviewed;
- permission status.

Do not publish a salary, rent, SU outcome or processing time as typical merely because one student experienced it.

## Email/forms

V1 correction form needs only:

- page/section;
- description of possible error;
- official source URL (optional but encouraged);
- contact email only if the reporter wants a response.

Do not accept or request CPR numbers, passports, school transcripts, contracts or SU decisions through a generic contact form. Give a clear warning not to submit sensitive documents.

If founders later offer individual review, create a separate privacy/security process before collecting files.

## Link health

Automated link checks can identify failures but cannot prove factual currency.

- Check internal links on every build.
- Check official external links weekly/monthly, with rate limits and respect for blocking.
- Flag redirects for human review.
- Do not automatically replace an authority URL with a search result.
- Keep a source ID stable even when its URL changes.

## AI-use policy for editors

AI may:

- propose a simpler Czech explanation from supplied verified facts;
- suggest headings, variants and FAQs;
- classify programme descriptions into controlled topics;
- summarise a diff for human review.

AI may not independently:

- approve an SU/residence/admission claim;
- infer a deadline from an old intake;
- decide qualification equivalence;
- fabricate a programme description or student quote;
- publish automatically after detecting a source change;
- respond to an individual eligibility case as if authoritative.

Human review remains mandatory for every high-risk change.

## Definition of “updated”

Do not update a visible page date merely because of formatting, deployment or an image change. `Last checked` means the cited source and applicant scope were actually reviewed.

## Six-month quality review

Ask:

- Which official exits do students use?
- Where do they abandon the matcher or checklist?
- Which correction themes repeat?
- Are Slovak students missing country-specific wording?
- Are parents able to understand the cash-flow risk?
- Does the site still distinguish Bachelor's and Master's clearly?
- Can a user explain SU weekly hours after reading the page?
- Are any founder stories accidentally presented as universal facts?
- Are commercial links labelled and non-affiliate unless disclosed?
- Is the programme catalogue worth maintaining at current scope?

Remove content that cannot be kept current. A shorter accurate guide is better than an impressive stale one.

