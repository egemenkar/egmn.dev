import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const read = (path) => {
  assert.ok(existsSync(path), `${path} should exist`);
  return readFileSync(path, "utf8");
};

test("global style tokens and color-mode metadata are registered", () => {
  assert.match(read("nuxt.config.ts"), /assets\/css\/main\.css/);
  assert.match(read("assets/css/main.css"), /--color-background:\s*#f7f5f0/i);
  assert.match(read("assets/css/main.css"), /prefers-reduced-motion/);
});

test("shared navigation exposes homepage sections and a theme action", () => {
  const header = read("components/SiteHeader.vue");

  assert.match(header, /#work/);
  assert.match(header, /#about/);
  assert.match(header, /#contact/);
  assert.match(read("components/ThemeToggle.vue"), /aria-label/);
});

test("both layouts use the shared editorial shell", () => {
  for (const path of ["layouts/default.vue", "layouts/home.vue"]) {
    const layout = read(path);
    assert.match(layout, /<SiteHeader/);
    assert.match(layout, /id="main-content"/);
  }
});

test("homepage exposes the required semantic sections and copy", () => {
  const page = read("pages/index.vue");

  assert.match(page, /<IntroHero/);
  assert.match(page, /<SelectedWork/);
  assert.match(page, /<AboutSummary/);
  assert.match(page, /<ContactFooter/);
  assert.match(read("components/SelectedWork.vue"), /id="work"/);
  assert.match(read("components/AboutSummary.vue"), /id="about"/);
  assert.match(read("components/ContactFooter.vue"), /id="contact"/);
  assert.match(read("components/IntroHero.vue"), /Building/);
  assert.match(read("components/IntroHero.vue"), /useful things/);
});

test("project previews keep destination and preview controls separate", () => {
  const row = read("components/ProjectRow.vue");

  assert.match(row, /aria-expanded/);
  assert.match(row, /aria-controls/);
  assert.match(row, /target="_blank"/);
  assert.match(row, /<\/a>[\s\S]*<button/);
});
