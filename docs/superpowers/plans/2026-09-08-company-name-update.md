# Company Name Update Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the employer name with `The Despatch Company` everywhere in the portfolio repository.

**Architecture:** Keep the existing centralized content structure. Update canonical content, locale copy, tests, and historical project documentation without changing components, roles, dates, locations, links, or styles.

**Tech Stack:** Nuxt 3, JavaScript content modules, JSON locale messages, Node test runner

## Global Constraints

- The company name is exactly `The Despatch Company`.
- No legacy company-name occurrence remains in tracked repository text.
- Roles, dates, locations, URLs, layout, and styling remain unchanged.
- Push only after tests and the production build succeed.

---

### Task 1: Canonical company-name replacement

**Files:**
- Modify: `tests/site-content.test.mjs`
- Modify: `tests/source-contracts.test.mjs`
- Modify: `data/site.mjs`
- Modify: `lang/en.json`
- Modify: `docs/superpowers/specs/2026-09-07-egmn-dev-redesign-design.md`
- Modify: `docs/superpowers/plans/2026-09-07-egmn-dev-redesign.md`

**Interfaces:**
- Consumes: `experience` from `data/site.mjs` and `home.hero.role` from `lang/en.json`
- Produces: consistent `The Despatch Company` copy for homepage and About-page consumers

- [ ] **Step 1: Write the failing tests**

Update expected homepage and experience values to `The Despatch Company`, and add a repository scan assertion that tracked text contains no legacy company-name occurrence.

- [ ] **Step 2: Verify the tests fail**

Run: `npm test`

Expected: FAIL because canonical content still contains the legacy company name.

- [ ] **Step 3: Apply the exact replacement**

Replace the legacy company name with `The Despatch Company` in canonical content, locale copy, and the two existing redesign documents. Do not alter surrounding role, date, location, URL, layout, or style content.

- [ ] **Step 4: Verify repository content and build**

Run: `npm test && npm run build`

Expected: both test files pass and the Nuxt build exits with status 0.

- [ ] **Step 5: Commit**

Run:

```bash
git add data/site.mjs lang/en.json tests docs/superpowers
git commit -m "update company name"
```

Expected: one content-change commit ready for integration.
