import assert from "node:assert/strict";
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
    ["/proc-dansko", "Víc svobody"],
    ["/programy", "Ne podle prestiže"],
    ["/jak-se-prihlasit", "Jeden krok"],
    ["/stehovani", "Přestěhovat se dá za den"],
    ["/su", "Grant, který pomůže"],
    ["/zdroje", "Nevěř nám naslepo"],
    ["/ochrana-soukromi", "Co napíšeš do matcheru"],
  ];

  for (const [path, expected] of routes) {
    const response = await render(worker, path);
    assert.equal(response.status, 200, path);
    assert.match(await response.text(), new RegExp(expected, "i"), path);
  }
});
