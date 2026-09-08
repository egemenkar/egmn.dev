import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const modulePath = new URL("../data/site.mjs", import.meta.url);
const approvedPreviews = {
  "fomo-fast": {
    path: "/images/projects/fomo-fast-preview.png",
    sha256: "d40c23ec09482b7fad2964098966a1e81a6ac30cfc1d268f1061d5949e0b5671",
  },
  rostershift: {
    path: "/images/projects/rostershift-preview.png",
    sha256: "098f82264c365bf739565d8249d59258bfc261e9d77c5fcd7286da7d59141ebe",
  },
  flickmark: {
    path: "/images/projects/flickmark-preview.png",
    sha256: "ce50101ffb533b6104f90dd800df640ac3c01234aeb35aa671fdcfe5bbe958d5",
  },
};

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

test("featured projects use the approved app preview captures", async () => {
  const { featuredProjects } = await import(modulePath);

  for (const project of featuredProjects) {
    const approved = approvedPreviews[project.id];
    assert.ok(approved, `missing approved preview contract for ${project.id}`);
    assert.equal(project.preview, approved.path);

    const previewPath = new URL(`../public${project.preview}`, import.meta.url);
    assert.ok(existsSync(previewPath), project.preview);
    assert.equal(createHash("sha256").update(readFileSync(previewPath)).digest("hex"), approved.sha256);
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
  const navy = experience.find(({ company }) => company === "Turkish Navy");
  assert.deepEqual(navy, {
    company: "Turkish Navy",
    role: "Supply Officer",
    period: "Sep 2010 to Apr 2021",
    location: "Türkiye, On-site",
    responsibilities: [
      "Served in the Turkish Navy across logistics, operations, and team coordination.",
      "After more than a decade in uniform, I voluntarily left to pursue a career in software.",
    ],
  });
  assert.equal(contact.email, "egemenkar@gmail.com");
  assert.deepEqual(
    socialLinks.map(({ label }) => label),
    ["GitHub", "LinkedIn", "Email", "X"],
  );
  assert.equal(socialLinks.find(({ label }) => label === "X")?.url, "https://x.com/egmndev");
});

test("education includes the current law degree without inventing a location", async () => {
  const { education } = await import(modulePath);

  assert.deepEqual(education[0], {
    institution: "Selcuk University",
    degree: "Bachelor's degree, Law",
    year: "Oct 2021 to present",
  });
});
