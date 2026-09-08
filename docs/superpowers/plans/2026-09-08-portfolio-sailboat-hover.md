# Portfolio Sailboat Hover Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn only the `egmn.dev` sailboat flag orange when its project row is hovered or keyboard-focused.

**Architecture:** Keep the existing inline sailboat SVG in `ProjectIconReveal.vue`. Add a class to the flag path and scoped global selectors for both project-row variants so the interaction works on the homepage and Projects page without changing other doodles.

**Tech Stack:** Nuxt 3, Vue SFC, scoped CSS, Node test runner

## Global Constraints

- Only the sailboat flag stroke changes to `var(--color-accent)`.
- The hull, sails, waves, icon container, and border remain unchanged.
- Pointer hover and keyboard `:focus-within` have matching behavior.
- Do not push until tests, build, and local browser verification pass.

---

### Task 1: Sailboat flag hover treatment

**Files:**
- Modify: `tests/source-contracts.test.mjs`
- Modify: `components/ProjectIconReveal.vue`

**Interfaces:**
- Consumes: the existing `#portfolio-sailboat` SVG and `.project-row`/`.project-item` states
- Produces: `.portfolio-sailboat-flag`, whose stroke becomes `var(--color-accent)` on hover/focus

- [ ] **Step 1: Write the failing source contract**

Add assertions requiring `class="portfolio-sailboat-flag"`, its stroke transition, and hover/focus selectors for `.project-row` and `.project-item`.

- [ ] **Step 2: Verify the contract fails**

Run: `npm test`

Expected: FAIL because `.portfolio-sailboat-flag` does not exist yet.

- [ ] **Step 3: Implement the minimal SVG and CSS change**

Assign `class="portfolio-sailboat-flag"` to the flag path. Add a stroke-color transition and four selectors that set its stroke to `var(--color-accent)` for row hover and `:focus-within`.

- [ ] **Step 4: Verify tests and production build**

Run: `npm test && npm run build`

Expected: two test files pass and the Nuxt production build exits with status 0.

- [ ] **Step 5: Verify locally and commit**

Open `http://127.0.0.1:3000/projects`, confirm the default flag is monochrome and the hovered/focused flag is orange, then commit the component and test changes.
