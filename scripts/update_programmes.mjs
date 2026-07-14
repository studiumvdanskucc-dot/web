#!/usr/bin/env node

/**
 * Downloads the public Study in Denmark catalogue and creates a compact,
 * implementation-ready list of English-taught Bachelor's and Master's degrees.
 *
 * Usage from the pack root:
 *   node scripts/update_programmes.mjs
 *
 * Important: Study in Denmark itself warns that its catalogue is being revised.
 * Treat this as discovery data, never as the final authority for admission rules.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import path from "node:path";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "data");
const SOURCE_PAGE = "https://studyindenmark.dk/portal";
const API = "https://studyindenmark.dk/++api++/@search";
const REVIEW_DATE = new Date().toISOString().slice(0, 10);

const DEGREE_LEVELS = {
  "29": "bachelor",
  "30": "master",
};

const INSTITUTIONS = {
  "aalborg-university-aau": "Aalborg University (AAU)",
  "aarhus-school-of-architecture": "Aarhus School of Architecture",
  "aarhus-university-au": "Aarhus University (AU)",
  "business-academy-copenhagen": "Business Academy Copenhagen",
  "business-academy-southwest": "Business Academy SouthWest",
  "copenhagen-business-school-cbs": "Copenhagen Business School (CBS)",
  "dania-academy": "Dania Academy",
  "danish-national-academy-of-music": "Danish National Academy of Music",
  "danish-school-of-media-and-journalism-dmjx": "Danish School of Media and Journalism (DMJX)",
  "funen-art-academy": "Funen Art Academy",
  "international-business-academy-iba": "International Business Academy (IBA)",
  "it-university-of-copenhagen-itu": "IT University of Copenhagen (ITU)",
  "kolding-school-of-design": "Design School Kolding",
  "roskilde-university-ruc": "Roskilde University (RUC)",
  "royal-danish-academy-architecture-design-and": "Royal Danish Academy — Architecture, Design, Conservation",
  "technical-university-of-denmark-dtu": "Technical University of Denmark (DTU)",
  "the-royal-academy-of-music-aarhus-aalborg": "Royal Academy of Music Aarhus/Aalborg",
  "the-royal-danish-academy-of-music": "Royal Danish Academy of Music",
  "the-royal-opera-academy": "Royal Danish Opera Academy",
  "ucl-university-college": "UCL University College",
  "university-college-absalon": "University College Absalon",
  "university-college-copenhagen": "University College Copenhagen",
  "university-college-of-northern-denmark-ucn": "University College of Northern Denmark (UCN)",
  "university-college-south-denmark": "University College South Denmark",
  "university-of-copenhagen-ucph": "University of Copenhagen (UCPH)",
  "university-of-southern-denmark-sdu": "University of Southern Denmark (SDU)",
  "via-university-college": "VIA University College",
};

const CITY_NAMES = {
  aalborg: "Aalborg",
  aarhus: "Aarhus",
  "aarhus-c": "Aarhus",
  "aarhus-n": "Aarhus",
  "aarhus-campus": "Aarhus",
  copenhagen: "Copenhagen",
  "copenhagen-campus": "Copenhagen",
  "frederiksberg-campus": "Frederiksberg / Copenhagen",
  esbjerg: "Esbjerg",
  "esbjerg-campus": "Esbjerg",
  fredericia: "Fredericia",
  herning: "Herning",
  "horsens-campus": "Horsens",
  kolding: "Kolding",
  "kolding-campus": "Kolding",
  kongenslyngby: "Kongens Lyngby",
  lyngby: "Kongens Lyngby",
  naestved: "Næstved",
  odense: "Odense",
  "odense-campus": "Odense",
  roskilde: "Roskilde",
  "roskilde-campus": "Roskilde",
  slagelse: "Slagelse",
  sonderborg: "Sønderborg",
  "sonderborg-campus": "Sønderborg",
  viborg: "Viborg",
};

const TOPIC_RULES = [
  ["business-management", /\b(account|business|commerce|econom|entrepreneur|finance|fintech|innovation|leadership|management|marketing|organisation|strategy)\w*/i],
  ["it-data", /\b(ai|artificial intelligence|computer|computing|cyber|data|digital|game|informatics|information technology|machine learning|robot|software|web)\w*/i],
  ["engineering-technology", /\b(aerospace|biotech|civil|electrical|electronics|energy|engineer|maritime|materials|mechanical|mechatronic|nanotech|offshore|technology)\w*/i],
  ["design-architecture-arts", /\b(architecture|art|creative|design|fashion|film|music|perform|spatial|visual)\w*/i],
  ["health-life-science", /\b(biomed|clinical|food|health|medicine|neuro|nutrition|pharma|physio|public health|sport)\w*/i],
  ["natural-science", /\b(agricultur|biology|chemistry|environment|geology|mathemat|molecular|nature|physics|science)\w*/i],
  ["sustainability-climate", /\b(bioeconomy|climate|circular|environment|green|renewable|sustainab)\w*/i],
  ["society-politics", /\b(anthropology|development|global|international|migration|politic|public policy|security|social|society|sociology|welfare)\w*/i],
  ["humanities-culture", /\b(culture|history|humanit|language|literature|philosophy|religion|theology)\w*/i],
  ["communication-media", /\b(communication|journalism|media|storytelling)\w*/i],
  ["education-learning", /\b(education|learning|pedagogy|teacher|teaching)\w*/i],
  ["law", /\b(law|legal)\w*/i],
];

function clean(value) {
  return String(value ?? "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function humanize(slug = "") {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function pathParts(sourceUrl) {
  try {
    const parts = new URL(sourceUrl).pathname.split("/").filter(Boolean);
    const portalIndex = parts.indexOf("portal");
    return portalIndex >= 0 ? parts.slice(portalIndex + 1) : [];
  } catch {
    return [];
  }
}

function topicTags(title, description) {
  const haystack = `${title} ${description}`;
  const tags = TOPIC_RULES.filter(([, rule]) => rule.test(haystack)).map(([tag]) => tag);
  return tags.length ? [...new Set(tags)] : ["other"];
}

function normaliseDates(value) {
  const rows = Array.isArray(value?.data) ? value.data : [];
  return rows
    .map((row) => ({
      start: row?.start || null,
      applicationDeadline: row?.deadline || null,
    }))
    .filter((row) => row.start || row.applicationDeadline);
}

function flattenRichText(value) {
  const chunks = [];
  const visit = (node) => {
    if (node == null) return;
    if (typeof node === "string") {
      chunks.push(node);
      return;
    }
    if (Array.isArray(node)) {
      node.forEach(visit);
      return;
    }
    if (typeof node.text === "string") chunks.push(node.text);
    if (node.children) visit(node.children);
  };
  visit(value);
  return clean(chunks.join(" "));
}

function shortExcerpt(value, maxLength = 240) {
  const text = clean(value);
  if (text.length <= maxLength) return text;
  const candidate = text.slice(0, maxLength + 1);
  const lastSentence = Math.max(
    candidate.lastIndexOf(". "),
    candidate.lastIndexOf("? "),
    candidate.lastIndexOf("! "),
  );
  const lastSpace = candidate.lastIndexOf(" ");
  const cutAt = lastSentence > maxLength * 0.55 ? lastSentence + 1 : lastSpace;
  return `${candidate.slice(0, Math.max(1, cutAt)).trim()}…`;
}

function csvCell(value) {
  const text = Array.isArray(value) ? value.join(" | ") : String(value ?? "");
  return `"${text.replaceAll('"', '""')}"`;
}

function programmeToCsv(programme) {
  return [
    programme.id,
    programme.title,
    programme.level,
    programme.institution,
    programme.city,
    programme.credits,
    programme.duration,
    programme.topics,
    programme.description,
    programme.officialProgrammeUrl,
    programme.sourceUrl,
    programme.lastChecked,
  ].map(csvCell).join(",");
}

async function fetchCatalogue() {
  const params = new URLSearchParams({
    portal_type: "program",
    path: "/portal",
    b_size: "1000",
    sort_on: "sortable_title",
    sort_order: "ascending",
  });

  for (const field of [
    "degree",
    "program_subject",
    "institution",
    "programme_url",
    "credits",
    "duration",
    "programme_dates",
    "program_description",
    "location",
  ]) {
    params.append("metadata_fields", field);
  }

  const response = await fetch(`${API}?${params}`, {
    headers: {
      accept: "application/json",
      referer: SOURCE_PAGE,
      "user-agent": "Mozilla/5.0 (compatible; Czech-Danish-Student-Guide/1.0)",
    },
  });

  if (!response.ok) {
    throw new Error(`Study in Denmark returned ${response.status}: ${await response.text()}`);
  }

  return response.json();
}

function transform(item) {
  const parts = pathParts(item["@id"]);
  const institutionSlug = item.institution || parts[0] || "unknown";
  const campusSlug = parts[1] || "";
  const sourceId = parts.at(-1) || clean(item.title).toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const level = DEGREE_LEVELS[String(item.degree)];
  const catalogueSummary = clean(item.description);
  const detailExcerpt = flattenRichText(item.program_description);
  const description = shortExcerpt(catalogueSummary || detailExcerpt);
  const institution = INSTITUTIONS[institutionSlug] || humanize(institutionSlug);
  const city = CITY_NAMES[campusSlug] || humanize(campusSlug) || null;

  return {
    id: `${institutionSlug}:${campusSlug || "campus"}:${sourceId}`,
    title: clean(item.title),
    level,
    degreeSourceCode: String(item.degree),
    institution,
    institutionSlug,
    city,
    campusSlug: campusSlug || null,
    credits: clean(item.credits) || null,
    duration: clean(item.duration) || null,
    topics: topicTags(item.title, description),
    sourceSubjectCodes: Array.isArray(item.program_subject) ? item.program_subject.map(String) : [],
    description,
    descriptionSource: catalogueSummary
      ? "catalogue-summary"
      : detailExcerpt
        ? "catalogue-detail-excerpt"
        : "missing",
    intakeDates: normaliseDates(item.programme_dates).filter(
      (row) => !row.start || row.start >= REVIEW_DATE,
    ),
    officialProgrammeUrl: clean(item.programme_url) || null,
    sourceUrl: item["@id"],
    lastChecked: REVIEW_DATE,
    verificationStatus: "catalogue-discovery-only",
  };
}

async function main() {
  const raw = await fetchCatalogue();
  const programmes = (raw.items || [])
    .filter((item) => DEGREE_LEVELS[String(item.degree)])
    .map(transform)
    .sort((a, b) => a.title.localeCompare(b.title, "en"));

  const counts = programmes.reduce(
    (acc, programme) => {
      acc[programme.level] += 1;
      return acc;
    },
    { bachelor: 0, master: 0 },
  );

  const payload = {
    meta: {
      title: "English-taught Bachelor's and Master's programmes in Denmark",
      generatedAt: new Date().toISOString(),
      source: SOURCE_PAGE,
      sourceApi: API,
      sourceCatalogueTotal: raw.items_total ?? raw.items?.length ?? null,
      includedTotal: programmes.length,
      counts,
      includedDegreeCodes: Object.keys(DEGREE_LEVELS),
      language: "English",
      warning:
        "Discovery data only. The source catalogue is being revised. Verify programme availability, intake, deadlines, requirements and tuition on the institution's official programme page before publishing or advising a student.",
      recommendedRefresh: "monthly during November–March; otherwise quarterly",
      licenceNote:
        "Store only short discovery descriptions and links. Do not present this independent dataset as an official admissions database.",
    },
    programmes,
  };

  const json = `${JSON.stringify(payload, null, 2)}\n`;
  payload.meta.sha256 = createHash("sha256").update(json).digest("hex");
  const finalJson = `${JSON.stringify(payload, null, 2)}\n`;

  const csvHeader = [
    "id",
    "title",
    "level",
    "institution",
    "city",
    "credits",
    "duration",
    "topics",
    "description",
    "officialProgrammeUrl",
    "sourceUrl",
    "lastChecked",
  ].map(csvCell).join(",");
  const csv = `${[csvHeader, ...programmes.map(programmeToCsv)].join("\n")}\n`;

  await mkdir(OUT_DIR, { recursive: true });
  await Promise.all([
    writeFile(path.join(OUT_DIR, "programmes.json"), finalJson, "utf8"),
    writeFile(path.join(OUT_DIR, "programmes.csv"), csv, "utf8"),
  ]);

  console.log(
    `Saved ${programmes.length} programmes (${counts.bachelor} Bachelor's, ${counts.master} Master's) to data/programmes.json and data/programmes.csv`,
  );
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
