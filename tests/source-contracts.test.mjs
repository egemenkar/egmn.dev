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

test("the browser icon uses the sailing doodle", () => {
  const config = read("nuxt.config.ts");
  const favicon = read("public/favicon.svg");

  assert.match(config, /rel:\s*"icon"[\s\S]*type:\s*"image\/svg\+xml"[\s\S]*href:\s*"\/favicon\.svg"/);
  assert.match(favicon, /<title>Sailboat<\/title>/);
  assert.match(favicon, /id="sailboat"/);
  assert.match(favicon, /id="waves"/);
  assert.match(favicon, /#f4774b/i);
  assert.doesNotMatch(favicon, /#22c55e/i);
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
  const hero = read("components/IntroHero.vue");
  const contact = read("components/ContactFooter.vue");
  assert.match(hero, /home\.hero\.title/);
  assert.doesNotMatch(hero, /home\.hero\.titleLine(?:One|Two)/);
  assert.match(hero, /from "~\/data\/site\.mjs"/);
  assert.match(hero, /mailto:\$\{contact\.email\}/);
  assert.doesNotMatch(hero, /href="#contact"/);
  assert.match(contact, /home\.contact\.noteLineOne/);
  assert.match(contact, /home\.contact\.noteLineTwo/);
  assert.match(contact, /class="sailboat-doodle"/);
  assert.match(contact, /\.sailboat-doodle\s*\{[^}]*width:\s*116px/s);
});

test("project previews keep destination and preview controls separate", () => {
  const row = read("components/ProjectRow.vue");
  const work = read("components/SelectedWork.vue");

  assert.match(row, /aria-expanded/);
  assert.match(row, /aria-controls/);
  assert.match(row, /target="_blank"/);
  assert.match(row, /<\/a>[\s\S]*<button/);
  assert.match(row, /loading="lazy"/);
  assert.match(work, /loading="lazy"/);
});

test("detail routes consume canonical content and preserve complete sections", () => {
  const about = read("pages/about.vue");
  const projects = read("pages/projects.vue");

  assert.match(about, /from "~\/data\/site\.mjs"/);
  assert.match(projects, /from "~\/data\/site\.mjs"/);
  assert.match(about, /aboutPage\.workTitle/);
  assert.match(about, /aboutPage\.educationTitle/);
  assert.match(projects, /projectsPage\.title/);
});

test("new interface copy is available through the English locale", () => {
  const messages = JSON.parse(read("lang/en.json"));

  assert.equal(messages.nav?.work, "Work");
  assert.equal(messages.home?.hero?.title, "Probably working on something");
  assert.equal(
    messages.home?.hero?.intro,
    "I’m Egemen, a frontend lead and independent app maker based in Istanbul.",
  );
  assert.equal(messages.home?.hero?.role, "Currently leading frontend at Despatch Cloud.");
  assert.equal(messages.home?.hero?.note, "Build. Ship. Repeat.");
  assert.equal("titleLineOne" in messages.home.hero, false);
  assert.equal("titleLineTwo" in messages.home.hero, false);
  assert.equal(messages.home?.work?.preview, "Preview");
  assert.equal(messages.home?.contact?.heading, "Have something in mind?");
  assert.equal(messages.home?.contact?.noteLineOne, "Adjusting");
  assert.equal(messages.home?.contact?.noteLineTwo, "the sails.");
});

test("visible source copy does not contain em dash characters", () => {
  for (const path of [
    "data/site.mjs",
    "lang/en.json",
    "components/IntroHero.vue",
    "components/ProjectRow.vue",
    "components/SelectedWork.vue",
    "components/AboutSummary.vue",
    "components/ContactFooter.vue",
    "pages/index.vue",
    "pages/about.vue",
    "pages/projects.vue",
  ]) {
    assert.doesNotMatch(read(path), /—/, `${path} contains an em dash`);
  }
});

test("global document styles do not force horizontal overflow at 320 pixels", () => {
  const css = read("assets/css/main.css");

  assert.doesNotMatch(css, /html\s*\{[^}]*min-width:\s*320px/s);
  assert.doesNotMatch(css, /body\s*\{[^}]*min-width:\s*320px/s);
});
