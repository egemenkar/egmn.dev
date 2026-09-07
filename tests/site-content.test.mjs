import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { test } from "node:test";

const modulePath = new URL("../data/site.mjs", import.meta.url);

test("canonical site content module exists", () => {
  assert.ok(existsSync(modulePath), "data/site.mjs should exist");
});

test("featured products are ordered, factual, and have real destinations", async () => {
  assert.ok(existsSync(modulePath), "data/site.mjs should exist before it can be validated");
  const { featuredProjects, projects } = await import(modulePath);

  assert.deepEqual(
    featuredProjects.map(({ id }) => id),
    ["fomo-fast", "rostershift", "flickmark"],
  );
  assert.equal(new Set(projects.map(({ id }) => id)).size, projects.length);

  for (const project of featuredProjects) {
    assert.match(project.url, /^https:\/\//);
    assert.ok(project.description.length > 20);
    assert.ok(!/waitlist|coming soon|release is on the way/i.test(project.description));
  }
});

test("referenced local project media exists", async () => {
  assert.ok(existsSync(modulePath), "data/site.mjs should exist before media can be validated");
  const { featuredProjects } = await import(modulePath);

  for (const project of featuredProjects) {
    assert.ok(existsSync(new URL(`../public${project.icon}`, import.meta.url)), project.icon);
    assert.ok(existsSync(new URL(`../public${project.preview}`, import.meta.url)), project.preview);
  }
});

test("career and contact data stay verified", async () => {
  assert.ok(existsSync(modulePath), "data/site.mjs should exist before facts can be validated");
  const { contact, experience, socialLinks } = await import(modulePath);

  assert.deepEqual(
    experience.slice(0, 3).map(({ company, role }) => [company, role]),
    [
      ["Despatch Cloud", "Head of Frontend"],
      ["Despatch Cloud", "Senior Frontend Developer"],
      ["Rightyon", "Frontend Developer"],
    ],
  );
  assert.equal(contact.email, "egemenkar@gmail.com");
  assert.deepEqual(
    socialLinks.map(({ label }) => label),
    ["GitHub", "LinkedIn", "Email"],
  );
});
