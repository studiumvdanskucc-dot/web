import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

async function createWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  return (await import(workerUrl.href)).default;
}

async function render(worker, path) {
  const response = await worker.fetch(
    new Request(`http://localhost${path}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  return response;
}

test("renders development preview metadata", async () => {
  const worker = await createWorker();
  const response = await render(worker, "/");

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.match(await response.text(), developmentPreviewMeta);
});

test("renders every public route", async () => {
  const worker = await createWorker();
  const routes = [
    ["/", "Studium v Dánsku"],
    ["/proc-dansko", "Práce na reálných projektech"],
    ["/programy", "Vyber si program"],
    ["/jak-se-prihlasit", "Jak podat přihlášku"],
    ["/stehovani", "Stěhování do Dánska"],
    ["/su", "Grant, který pomůže"],
    ["/zdroje", "Ověřuj informace"],
    ["/ochrana-soukromi", "Text v dotazníku"],
  ];

  for (const [path, expected] of routes) {
    const response = await render(worker, path);
    assert.equal(response.status, 200, path);
    assert.match(await response.text(), new RegExp(expected, "i"), path);
  }
});

test("renders the updated doDánska creator credit and study-life message", async () => {
  const worker = await createWorker();
  const home = await render(worker, "/");
  const homeHtml = await home.text();
  const whyDenmark = await render(worker, "/proc-dansko");
  const whyDenmarkHtml = await whyDenmark.text();

  assert.match(homeHtml, /by @grafickavdansku/i);
  assert.match(homeHtml, /https:\/\/www\.tiktok\.com\/@grafickavdansku/i);
  assert.match(homeHtml, />360</);
  assert.match(whyDenmarkHtml, /Méně memorování/i);
  assert.match(whyDenmarkHtml, /Study-Life Balance!/i);
});

test("catalogue keeps the verified 2027/28 AP and Top-up routes", async () => {
  const catalogue = JSON.parse(
    await readFile(new URL("../public/data/programmes.json", import.meta.url), "utf8"),
  );
  const apDegrees = catalogue.programmes.filter(
    (programme) => programme.programmeType === "ap-degree",
  );
  const topUps = catalogue.programmes.filter(
    (programme) => programme.programmeType === "top-up-bachelor",
  );

  assert.equal(apDegrees.length, 4);
  assert.equal(topUps.length, 4);
  assert.equal(catalogue.meta.typeCounts["ap-degree"], apDegrees.length);
  assert.equal(catalogue.meta.typeCounts["top-up-bachelor"], topUps.length);

  for (const programme of [...apDegrees, ...topUps]) {
    assert.equal(programme.level, "bachelor");
    assert.ok(programme.intake2027?.label);
    assert.ok(programme.intake2027?.note);
    assert.doesNotThrow(() => new URL(programme.officialProgrammeUrl));
    assert.doesNotThrow(() => new URL(programme.availabilitySourceUrl));
  }
});
