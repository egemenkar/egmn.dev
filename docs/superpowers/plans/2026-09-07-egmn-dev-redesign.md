# egmn.dev Editorial Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and locally validate a complete responsive editorial redesign of egmn.dev while preserving verified content, existing Nuxt routes, localization, and deployment behavior.

**Architecture:** Keep the Nuxt 3 SPA and its current Nuxt UI, Tailwind, and i18n dependencies. Centralize factual project, experience, and social data in one ESM module; render focused Vue components from that module; and share one token-driven global visual system across the homepage and detail routes. Official Apple and product-site assets are stored locally, while missing optional media degrades to a typographic fallback.

**Tech Stack:** Nuxt 3.7, Vue 3, Nuxt UI 2, Tailwind CSS, Vue I18n, Node's built-in test runner, semantic HTML, CSS custom properties.

## Global Constraints

- Work only on `codex/egmn-redesign`; do not push, merge, deploy, or modify production accounts.
- Preserve Nuxt 3, the npm package manager, the existing localization setup, CNAME, static-generation behavior, and `/about` and `/projects` routes.
- Use `#F7F5F0`, `#191A18`, `#62645F`, `#DADCD4`, and `#B84324` as the starting light tokens; use `#171816`, `#F4F2EB`, `#B4B6AE`, `#393C35`, and `#FF9877` as the dark equivalents.
- Do not render or crop the supplied mockup into the product, and do not present invented product screens or icons as authentic.
- Use the existing real portrait. Use only repository assets or assets verified from official product destinations.
- Keep one homepage `h1`, semantic landmarks, visible focus, practical 44-pixel controls, descriptive links, alt text, and reduced-motion behavior.
- Do not add em dash characters to visible copy.
- Do not introduce a backend, runtime UI framework, animation package, contact form, fabricated metric, post, qualification, product claim, or social destination.

---

## File Map

- Create `data/site.mjs`: canonical projects, experience, education, and social data.
- Create `tests/site-content.test.mjs`: factual data, URL, asset, and visible-copy contracts.
- Create `tests/source-contracts.test.mjs`: route, section, theme, and metadata source contracts.
- Create `assets/css/main.css`: design tokens, reset, common typography, shell, focus, and reduced-motion rules.
- Create `components/SiteHeader.vue`: wordmark, homepage anchors, detail-route navigation, and theme control.
- Create `components/ThemeToggle.vue`: persisted accessible light/dark control using Nuxt UI color mode.
- Create `components/IntroHero.vue`: portrait and hero copy.
- Create `components/ProjectRow.vue`: project destination and optional mobile preview behavior.
- Create `components/SelectedWork.vue`: active desktop preview state and selected project list.
- Create `components/AboutSummary.vue`: concise homepage experience section.
- Create `components/ContactFooter.vue`: homepage call to action, socials, and location.
- Modify `app.vue`: remove hidden-scrollbar behavior and set global metadata helpers.
- Modify `layouts/default.vue`: replace the legacy fixed dark navigation with the shared editorial shell.
- Modify `layouts/home.vue`: use the same shared shell so existing layout references remain safe.
- Modify `pages/index.vue`: compose homepage sections and SEO metadata.
- Modify `pages/about.vue`: preserve complete experience and education in the new visual system.
- Modify `pages/projects.vue`: preserve genuine extra work while prioritizing the three selected products.
- Modify `lang/en.json`: replace outdated release-pending copy and add visible interface strings.
- Modify `nuxt.config.ts`: register the global stylesheet and canonical metadata.
- Modify `package.json`: add a built-in Node test script without adding dependencies.
- Add `public/images/projects/*`: official Apple icons and screenshots for the three selected apps.

### Task 1: Canonical Content, Contracts, and Official Assets

**Files:**
- Create: `tests/site-content.test.mjs`
- Create: `data/site.mjs`
- Create: `public/images/projects/fomo-fast-icon.jpg`
- Create: `public/images/projects/fomo-fast-preview.jpg`
- Create: `public/images/projects/rostershift-icon.jpg`
- Create: `public/images/projects/rostershift-preview.jpg`
- Create: `public/images/projects/flickmark-icon.jpg`
- Create: `public/images/projects/flickmark-preview.jpg`
- Modify: `package.json`

**Interfaces:**
- Produces: `projects`, `featuredProjects`, `experience`, `education`, `socialLinks`, and `contact` named exports from `data/site.mjs`.
- Each project exposes `{ id, title, description, category, url, icon, iconAlt, preview, previewAlt, featured }`.

- [ ] **Step 1: Add the failing content and asset test**

```js
// tests/site-content.test.mjs
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { test } from "node:test";
import { contact, experience, featuredProjects, projects, socialLinks } from "../data/site.mjs";

test("featured products are ordered, factual, and have real destinations", () => {
  assert.deepEqual(featuredProjects.map(({ id }) => id), ["fomo-fast", "rostershift", "flickmark"]);
  assert.equal(new Set(projects.map(({ id }) => id)).size, projects.length);
  for (const project of featuredProjects) {
    assert.match(project.url, /^https:\/\//);
    assert.ok(project.description.length > 20);
    assert.ok(!/waitlist|coming soon|release is on the way/i.test(project.description));
  }
});

test("referenced local project media exists", () => {
  for (const project of featuredProjects) {
    assert.ok(existsSync(`public${project.icon}`), project.icon);
    assert.ok(existsSync(`public${project.preview}`), project.preview);
  }
});

test("career and contact data stay verified", () => {
  assert.deepEqual(experience.slice(0, 3).map(({ company, role }) => [company, role]), [
    ["Despatch Cloud", "Head of Frontend"],
    ["Despatch Cloud", "Senior Frontend Developer"],
    ["Rightyon", "Frontend Developer"],
  ]);
  assert.equal(contact.email, "egemenkar@gmail.com");
  assert.deepEqual(socialLinks.map(({ label }) => label), ["GitHub", "LinkedIn", "Email"]);
});
```

- [ ] **Step 2: Add the test command and verify RED**

```json
"scripts": {
  "test": "node --test tests/*.test.mjs"
}
```

Run: `npm test`

Expected: FAIL because `data/site.mjs` does not exist.

- [ ] **Step 3: Add the canonical data module**

```js
export const projects = [
  {
    id: "fomo-fast",
    title: "Fomo Fast",
    description: "Intermittent fasting, but for your apps.",
    category: "iOS · Focus & digital wellbeing",
    url: "https://www.fomo.fast",
    icon: "/images/projects/fomo-fast-icon.jpg",
    iconAlt: "Fomo Fast app icon",
    preview: "/images/projects/fomo-fast-preview.jpg",
    previewAlt: "Fomo Fast iPhone app screen",
    featured: true,
  },
  {
    id: "rostershift",
    title: "RosterShift",
    description: "Shift planning without the spreadsheet chaos.",
    category: "iOS · Team scheduling",
    url: "https://www.rostershift.app/en",
    icon: "/images/projects/rostershift-icon.jpg",
    iconAlt: "RosterShift app icon",
    preview: "/images/projects/rostershift-preview.jpg",
    previewAlt: "RosterShift iPhone app screen",
    featured: true,
  },
  {
    id: "flickmark",
    title: "FlickMark",
    description: "Find the movie. Keep the moment.",
    category: "iOS · Movies & discovery",
    url: "https://apps.apple.com/us/app/movie-finder-flickmark/id6747580843",
    icon: "/images/projects/flickmark-icon.jpg",
    iconAlt: "FlickMark app icon",
    preview: "/images/projects/flickmark-preview.jpg",
    previewAlt: "FlickMark iPhone app screen",
    featured: true,
  },
  {
    id: "egmn-dev",
    title: "egmn.dev",
    description: "My personal portfolio, built with Nuxt and Vue.",
    category: "Web · Portfolio",
    url: "https://github.com/egemenkar/egmn.dev",
    icon: null,
    iconAlt: "",
    preview: null,
    previewAlt: "",
    featured: false,
  },
];

export const featuredProjects = projects.filter(({ featured }) => featured);

export const experience = [
  { company: "Despatch Cloud", role: "Head of Frontend", period: "Feb 2025 to present", location: "Remote, United Kingdom" },
  { company: "Despatch Cloud", role: "Senior Frontend Developer", period: "Apr 2023 to Feb 2025", location: "Remote, United Kingdom" },
  { company: "Rightyon", role: "Frontend Developer", period: "Jan 2022 to Apr 2023", location: "Istanbul, Türkiye" },
  { company: "Freelance", role: "Full Stack Web Developer", period: "Apr 2018 to Jan 2022", location: "Istanbul, Türkiye" },
];

export const education = [
  { institution: "Anadolu University", degree: "Bachelor of Science, Management Information Systems", year: "2025", location: "Eskisehir, Türkiye" },
  { institution: "Ataturk University", degree: "Associate of Science, Computer Programming", year: "2023", location: "Erzurum, Türkiye" },
  { institution: "Turkish National Defense University", degree: "Bachelor of Science, Naval Architecture and Marine Engineering", year: "2010", location: "Istanbul, Türkiye" },
];

export const contact = { email: "egemenkar@gmail.com", location: "Istanbul, Türkiye" };
export const socialLinks = [
  { label: "GitHub", url: "https://github.com/egemenkar" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/egemen-kar/" },
  { label: "Email", url: `mailto:${contact.email}` },
];
```

- [ ] **Step 4: Download verified Apple media at local paths**

Use the official iTunes Lookup results verified on 2026-09-07. Request 512-pixel icons and 640-by-960 screenshots from the same Apple CDN resources.

```bash
mkdir -p public/images/projects
curl -fsSL "https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/a9/f7/91/a9f791af-12e1-f982-3fc1-11276f3b64f9/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg" -o public/images/projects/fomo-fast-icon.jpg
curl -fsSL "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/98/23/0a/98230aa6-e5b9-585f-1a19-ec956e75bcec/1_APP_IPHONE_69_today.png/640x960bb.jpg" -o public/images/projects/fomo-fast-preview.jpg
curl -fsSL "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/d4/9b/6b/d49b6bec-cb41-e725-3b54-4c1bb551e55c/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg" -o public/images/projects/rostershift-icon.jpg
curl -fsSL "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/f6/f9/9b/f6f99b25-1112-25ff-ed3b-4b6a7d203057/1_APP_IPHONE_69_home.png/640x960bb.jpg" -o public/images/projects/rostershift-preview.jpg
curl -fsSL "https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/52/0a/86/520a8638-645e-37a5-11fa-c6c699d00a20/AppIcon-0-0-1x_U007ephone-0-1-0-85-220.png/512x512bb.jpg" -o public/images/projects/flickmark-icon.jpg
curl -fsSL "https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/f6/2a/c2/f62ac2e6-5fa0-2d27-1706-66ea014870b5/1_home.png/640x960bb.jpg" -o public/images/projects/flickmark-preview.jpg
```

- [ ] **Step 5: Verify GREEN and commit**

Run: `npm test`

Expected: 3 tests pass, 0 fail.

```bash
git add package.json data/site.mjs tests/site-content.test.mjs public/images/projects
git commit -m "feat: add verified portfolio content and media"
```

### Task 2: Global Visual System and Shared Shell

**Files:**
- Create: `tests/source-contracts.test.mjs`
- Create: `assets/css/main.css`
- Create: `components/SiteHeader.vue`
- Create: `components/ThemeToggle.vue`
- Modify: `nuxt.config.ts`
- Modify: `app.vue`
- Modify: `layouts/default.vue`
- Modify: `layouts/home.vue`

**Interfaces:**
- `SiteHeader` accepts no props and derives anchor URLs from `useRoute()`.
- `ThemeToggle` accepts no props and uses `useColorMode()`; its button label always describes the next action.
- Every page receives `.page-shell`, `.page-container`, `.section-label`, `.text-link`, and `.focus-ring` from `assets/css/main.css`.

- [ ] **Step 1: Add failing source contracts**

```js
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const read = (path) => readFileSync(path, "utf8");

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
```

Run: `npm test`

Expected: FAIL because the global stylesheet and components do not exist.

- [ ] **Step 2: Register tokens and document metadata**

Add `css: ["~/assets/css/main.css"]` and the canonical site URL to `nuxt.config.ts`. Define light tokens on `:root`, dark equivalents on `.dark`, body typography, selection color, `.page-container` at `max-width: 1040px`, focus-visible outlines, editorial link underlines, section labels, thin rules, and media queries at 767 and 1023 pixels. Add a global reduced-motion block that sets animation and transition duration to `0.01ms` and removes decorative transforms.

Set `useHead()` defaults in `app.vue` for title template, description, theme-color, canonical link, Open Graph title/description/type/url, and Twitter card. Keep `<NuxtLayout><NuxtPage /></NuxtLayout>` as the render tree and remove the hidden-scrollbar CSS.

- [ ] **Step 3: Implement accessible theme control**

```vue
<script setup>
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === "dark");
const label = computed(() => isDark.value ? "Switch to light theme" : "Switch to dark theme");
const toggleTheme = () => { colorMode.preference = isDark.value ? "light" : "dark"; };
</script>

<template>
  <button class="theme-toggle focus-ring" type="button" :aria-label="label" :title="label" @click="toggleTheme">
    <span aria-hidden="true">{{ isDark ? "☀" : "☾" }}</span>
  </button>
</template>
```

- [ ] **Step 4: Implement the shared header and layouts**

`SiteHeader.vue` renders `egmn.` with an accent period, a `Work`, `About`, `Contact` list, and `ThemeToggle`. On `/`, links use `#work`, `#about`, and `#contact`; on detail pages they use `/#work`, `/#about`, and `/#contact`. The wordmark always links to `/`.

Both layouts render the following shared structure so legacy page metadata stays safe:

```vue
<template>
  <div class="page-shell">
    <SiteHeader />
    <main id="main-content"><slot /></main>
  </div>
</template>
```

- [ ] **Step 5: Verify GREEN, build, and commit**

Run: `npm test && npm run build`

Expected: all tests pass and Nuxt build exits 0; the existing Node-version warning may remain.

```bash
git add app.vue assets/css/main.css components/SiteHeader.vue components/ThemeToggle.vue layouts/default.vue layouts/home.vue nuxt.config.ts tests/source-contracts.test.mjs
git commit -m "feat: establish editorial site shell"
```

### Task 3: Responsive Homepage Sections

**Files:**
- Create: `components/IntroHero.vue`
- Create: `components/ProjectRow.vue`
- Create: `components/SelectedWork.vue`
- Create: `components/AboutSummary.vue`
- Create: `components/ContactFooter.vue`
- Modify: `pages/index.vue`
- Modify: `tests/source-contracts.test.mjs`

**Interfaces:**
- `ProjectRow` consumes `project`, `active`, and `headingLevel` props and emits `activate(project.id)`.
- `SelectedWork` consumes `featuredProjects` from `data/site.mjs`, owns `activeProjectId` and expanded mobile IDs, and renders one reserved preview region.
- `AboutSummary` consumes the first three records from `experience`.
- `ContactFooter` consumes `contact` and `socialLinks`.

- [ ] **Step 1: Extend the failing source contract test**

```js
test("homepage exposes the required semantic sections and copy", () => {
  const page = read("pages/index.vue");
  assert.match(page, /IntroHero/);
  assert.match(page, /SelectedWork/);
  assert.match(page, /AboutSummary/);
  assert.match(page, /ContactFooter/);
  assert.match(read("components/SelectedWork.vue"), /id="work"/);
  assert.match(read("components/AboutSummary.vue"), /id="about"/);
  assert.match(read("components/ContactFooter.vue"), /id="contact"/);
  assert.match(read("components/IntroHero.vue"), /home\.hero\.title/);
  assert.doesNotMatch(read("components/IntroHero.vue"), /titleLine(?:One|Two)/);
});
```

Run: `npm test`

Expected: FAIL because the homepage section components do not exist.

- [ ] **Step 2: Implement `IntroHero`**

Render a single naturally wrapping `h1` with `Probably working on something.`, an orange accent period, the concise frontend-lead introduction, the muted Despatch Cloud line, and `More about me ↗` and `Say hello ↗` links. Do not author fixed headline line breaks. Render `/images/profile.jpg` at 512 by 512 with `fetchpriority="high"`, `loading="eager"`, descriptive alt text, a circular editorial crop, one CSS-drawn orange star, and an `Always building.` note hidden below tablet width.

- [ ] **Step 3: Implement selected work and preview behavior**

`ProjectRow` renders the official 72-pixel icon, a linked title and description, category text, an external arrow, and a separate mobile Preview button with `aria-expanded` and `aria-controls`. Mouse enter, focus, and click emit activation without intercepting the destination link.

`SelectedWork` starts with `fomo-fast`, reserves a right-side preview column, and changes the screenshot based on activation. The preview `img` uses width 640, height 960, lazy loading, and a CSS tilt only above 1024 pixels. Below 768 pixels the dedicated column is hidden and each row renders its own collapsible image.

- [ ] **Step 4: Implement About and Contact sections**

`AboutSummary` renders label `02 / A LITTLE ABOUT ME`, the approved lead sentence, three compact rows from the canonical experience data, and `Full background ↗` to `/about`.

`ContactFooter` renders `Have something in mind?`, `Let’s talk ↗` as a mail link, verified social links, and `Istanbul, Türkiye`. Decorative copy is limited to `Good ideas in better company.` and hidden on mobile.

- [ ] **Step 5: Compose the homepage and metadata**

```vue
<template>
  <div class="page-container home-page">
    <IntroHero />
    <SelectedWork />
    <AboutSummary />
    <ContactFooter />
  </div>
</template>

<script setup>
useSeoMeta({
  title: "Egemen Kar | Frontend Lead & App Maker",
  description: "Frontend lead and independent app maker based in Istanbul. Explore my apps, work, and ideas.",
});
</script>
```

- [ ] **Step 6: Verify GREEN, build, and commit**

Run: `npm test && npm run build`

Expected: all tests pass and Nuxt build exits 0.

```bash
git add components/IntroHero.vue components/ProjectRow.vue components/SelectedWork.vue components/AboutSummary.vue components/ContactFooter.vue pages/index.vue tests/source-contracts.test.mjs
git commit -m "feat: build editorial portfolio homepage"
```

### Task 4: Restyle and Preserve Detail Routes

**Files:**
- Modify: `pages/about.vue`
- Modify: `pages/projects.vue`
- Modify: `lang/en.json`
- Modify: `tests/source-contracts.test.mjs`

**Interfaces:**
- `/about` consumes `experience` and `education` from `data/site.mjs`.
- `/projects` consumes `projects` from `data/site.mjs` and renders the selected three plus egmn.dev.

- [ ] **Step 1: Add failing detail-route contracts**

```js
test("detail routes consume canonical content and retain navigation home", () => {
  const about = read("pages/about.vue");
  const projects = read("pages/projects.vue");
  assert.match(about, /from "~\/data\/site\.mjs"/);
  assert.match(projects, /from "~\/data\/site\.mjs"/);
  assert.match(about, /Work experience/);
  assert.match(about, /Education/);
  assert.match(projects, /Selected projects/);
});
```

Run: `npm test`

Expected: FAIL because the old routes use duplicated arrays and card UI.

- [ ] **Step 2: Replace the About page**

Render a `.page-container.detail-page` with a small `03 / ABOUT` label, `A little more context.` h1, a short factual introduction, a `Work experience` section containing all canonical experience rows, and an `Education` section containing all canonical education rows. Remove timed reveal animations so content appears without JavaScript sequencing.

- [ ] **Step 3: Replace the Projects page**

Render a `.page-container.detail-page` with `03 / PROJECTS`, `Selected projects.` h1, and an editorial list of all canonical project entries. Use official images where present, monogram fallback otherwise, full descriptions, category, and descriptive destination labels. Remove nested anchors, technology-logo links, empty coming-soon content, and delayed entrance animations.

- [ ] **Step 4: Update localization copy**

Keep valid existing keys but replace the Fomo Fast release-pending language with current published copy. Add keys for navigation, theme actions, homepage labels, preview actions, background link, and contact copy. Ensure no visible string contains an em dash.

- [ ] **Step 5: Verify GREEN, build, and commit**

Run: `npm test && npm run build`

Expected: all tests pass and Nuxt build exits 0.

```bash
git add pages/about.vue pages/projects.vue lang/en.json tests/source-contracts.test.mjs
git commit -m "feat: align detail routes with redesign"
```

### Task 5: Local Browser QA and Visual Corrections

**Files:**
- Modify: `assets/css/main.css`
- Modify: affected Vue components only when browser evidence shows a defect

**Interfaces:**
- Produces a stable local site at `http://127.0.0.1:3000` and screenshot evidence at desktop and mobile widths.

- [ ] **Step 1: Start the local server**

Run: `npm run dev -- --host 127.0.0.1 --port 3000`

Expected: Nuxt reports the local URL and stays running without a runtime exception.

- [ ] **Step 2: Inspect desktop at 1440 pixels**

Open `/` at 1440 by 1000. Verify the two-column hero, one visible `h1`, reserved product preview, complete project links, fine rules, career rows, contact footer, light theme, and absence of layout jumps. Compare hierarchy and spacing with the supplied mockup.

- [ ] **Step 3: Inspect mobile at 390 and 320 pixels**

At 390 by 844, verify single-column hero, compact visible navigation, 120-to-160-pixel portrait, 48-to-56-pixel project icons, inline Preview buttons, stacked career dates, and no horizontal overflow. Repeat the overflow check at 320 pixels.

- [ ] **Step 4: Exercise interactions and accessibility states**

Use keyboard Tab and Enter/Space to exercise the theme button, navigation, all project destinations, mobile preview controls, About link, and contact links. Toggle dark mode and reload to verify persistence. Emulate reduced motion and confirm screenshots are not tilted and transitions are effectively disabled. Check the browser console for new errors, broken images, and hydration warnings.

- [ ] **Step 5: Apply and verify targeted visual fixes**

Adjust only evidenced spacing, font sizing, contrast, wrapping, focus, preview, or overflow defects. Re-run the exact viewport and interaction that exposed each defect until it no longer reproduces.

- [ ] **Step 6: Commit the QA corrections**

```bash
git add assets/css/main.css components pages
git commit -m "fix: refine responsive portfolio presentation"
```

### Task 6: Final Verification and Local Handoff

**Files:**
- Modify: none unless verification exposes a defect

- [ ] **Step 1: Run the full automated verification**

Run: `npm test && npm run build && npm run generate`

Expected: tests pass, build exits 0, and static generation exits 0. Record but do not misrepresent environment warnings about Node 16, Browserslist data, or dependency audit results.

- [ ] **Step 2: Check repository integrity**

Run: `git diff --check && git status --short --branch && git log --oneline --decorate -6`

Expected: no whitespace errors; only intentional uncommitted artifacts, if any, are reported; `main` is not checked out in this worktree and no remote push occurred.

- [ ] **Step 3: Keep the local preview running and open it for review**

Run the development server on an available localhost port, open the homepage in the in-app browser, and present the local preview to Egemen. Report the branch, worktree path, changed areas, exact checks run, current warnings, and any optional missing asset. Do not deploy or push.
