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
