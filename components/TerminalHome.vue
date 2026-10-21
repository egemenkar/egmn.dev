<script setup lang="ts">
import { education, experience, focusAreas, links, person, posts, sections, site } from '~/data/profile'

// Every panel is in the prerendered HTML (crawlers, no-JS and screen readers get all of it);
// the menu is a vertical ARIA tablist that switches between them.
const [headlineRole, headlineFocus] = person.headline.split(' | ')
const active = ref(0)
const animate = ref(false)
const tabs = ref<HTMLButtonElement[]>([])
const prompt = ref<{ focusWith: (text?: string) => void }>()

const contactRows = [
  { label: 'email', href: links.email.href, text: person.email, external: false },
  { label: 'linkedin', href: links.linkedin.href, text: 'linkedin.com/in/egemen-kar', external: true },
  { label: 'github', href: links.github.href, text: 'github.com/egemenkar', external: true },
]

function select(index: number, { focus = true } = {}) {
  const count = sections.length
  active.value = (index + count) % count
  animate.value = true
  if (focus) tabs.value[active.value]?.focus()
  history.replaceState(null, '', `#${sections[active.value]!.key}`)
  nextTick(revealPanel)
}

// The window scrolls inside itself; when the opened panel's top is out of view (below the fold on
// phones, or scrolled past in the wide two-pane layout), bring it into view.
function revealPanel() {
  const screen = document.getElementById('main-content')
  const panel = document.getElementById(sections[active.value]!.key)
  if (!screen || !panel) return
  const top = panel.getBoundingClientRect().top - screen.getBoundingClientRect().top
  if (top >= 0 && top < screen.clientHeight - 96) return
  const smooth = !matchMedia('(prefers-reduced-motion: reduce)').matches
  screen.scrollTo({ top: screen.scrollTop + top - 24, behavior: smooth ? 'smooth' : 'auto' })
}

function isTyping(target: EventTarget | null) {
  return target instanceof HTMLElement && (target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(target.tagName))
}

// Arrows work from the tab list and from the window itself (nothing else focused);
// "/" or any letter starts typing a command in the prompt.
function onKeydown(event: KeyboardEvent) {
  if (event.metaKey || event.ctrlKey || event.altKey || isTyping(event.target)) return
  const inMenu = event.target instanceof HTMLElement && event.target.getAttribute('role') === 'tab'
  const idle = event.target === document.body || (event.target instanceof HTMLElement && event.target.id === 'main-content')

  if ((inMenu || idle) && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
    select(active.value + (event.key === 'ArrowDown' ? 1 : -1))
  }
  else if (inMenu && (event.key === 'Home' || event.key === 'End')) {
    select(event.key === 'Home' ? 0 : sections.length - 1)
  }
  else if (event.key === '/' || /^[a-z]$/i.test(event.key)) {
    prompt.value?.focusWith(event.key)
  }
  else {
    return
  }
  event.preventDefault()
}

// Deep links like /#experience open that panel (on load and when the hash changes).
const route = useRoute()

function openFromHash(hash: string) {
  const index = sections.findIndex(({ key }) => `#${key}` === hash)
  if (index >= 0) active.value = index
}

watch(() => route.hash, openFromHash)

onMounted(() => {
  openFromHash(route.hash || location.hash)
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => window.removeEventListener('keydown', onKeydown))
</script>

<template>
  <section
    class="terminal"
    aria-labelledby="terminal-title"
  >
    <div class="pane pane-intro">
      <p class="welcome">
        <svg
          class="spark"
          viewBox="0 0 16 16"
          aria-hidden="true"
        >
          <path d="M8 1v14M1 8h14M3 3l10 10M13 3 3 13" />
        </svg>
        Welcome to <strong>egmn.dev</strong>
      </p>

      <h1 id="terminal-title">
        <PixelBanner :text="person.name" />
      </h1>

      <div class="identity">
        <p>
          <strong class="accent">{{ headlineRole }}</strong>
          <span
            class="muted bar"
            aria-hidden="true"
          > | </span>
          <span class="visually-hidden">, </span>
          <span>{{ headlineFocus }}</span>
        </p>
        <p class="muted">
          {{ person.subline }}
        </p>
        <p class="muted">
          {{ person.location }} · {{ person.jobTitle }} at {{ person.employer }} (UK, remote)
        </p>
      </div>

      <hr class="rule">

      <p
        id="menu-label"
        class="muted prompt"
      >
        What would you like to see?
      </p>
      <div
        class="menu"
        role="tablist"
        aria-orientation="vertical"
        aria-labelledby="menu-label"
      >
        <button
          v-for="(section, index) in sections"
          :id="`tab-${section.key}`"
          :key="section.key"
          ref="tabs"
          class="menu-item"
          type="button"
          role="tab"
          :aria-selected="index === active"
          :aria-controls="section.key"
          :tabindex="index === active ? 0 : -1"
          @click="select(index, { focus: false })"
        >
          <span
            class="caret"
            aria-hidden="true"
          >›</span>
          <span class="index">{{ index + 1 }}.</span>
          <span class="label">{{ section.label }}</span>
          <span class="hint muted"> · {{ section.hint }}</span>
        </button>
      </div>
    </div>

    <hr class="rule split-rule">

    <div class="pane pane-output">
      <div
        class="panels"
        :class="{ animate }"
      >
        <template
          v-for="(section, index) in sections"
          :key="section.key"
        >
          <section
            :id="section.key"
            class="panel"
            role="tabpanel"
            :aria-labelledby="`tab-${section.key}`"
            :hidden="index !== active"
          >
            <!-- About -->
            <template v-if="section.key === 'about'">
              <h2 class="out-head line">
                About
              </h2>
              <div class="out-body stack">
                <p
                  v-for="paragraph in person.about"
                  :key="paragraph"
                  class="line"
                >
                  {{ paragraph }}
                </p>
              </div>
            </template>

            <!-- Focus -->
            <template v-else-if="section.key === 'focus'">
              <h2 class="visually-hidden">
                What I focus on
              </h2>
              <div
                v-for="area in focusAreas"
                :key="area.title"
                class="block line"
              >
                <h3 class="out-head">
                  {{ area.title }}
                </h3>
                <p class="out-body muted">
                  {{ area.body }}
                </p>
              </div>
            </template>

            <!-- Experience -->
            <template v-else-if="section.key === 'experience'">
              <h2 class="visually-hidden">
                Experience
              </h2>
              <div
                v-for="position in experience"
                :key="position.company"
                class="block line"
              >
                <h3 class="out-head">
                  <span>
                    {{ position.company }}
                    <span class="muted company-meta"> · {{ position.location }}</span>
                  </span>
                </h3>
                <div class="out-body">
                  <div
                    v-for="role in position.roles"
                    :key="role.title"
                    class="role"
                  >
                    <p class="row">
                      <strong>{{ role.title }}</strong>
                      <span class="muted dates">
                        <time :datetime="role.start">{{ formatMonth(role.start) }}</time>
                        –
                        <time
                          v-if="role.end"
                          :datetime="role.end"
                        >{{ formatMonth(role.end) }}</time>
                        <span v-else>Present</span>
                      </span>
                    </p>
                    <ul class="dash-list">
                      <li
                        v-for="item in role.highlights"
                        :key="item"
                      >
                        {{ item }}
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </template>

            <!-- Education -->
            <template v-else-if="section.key === 'education'">
              <h2 class="out-head line">
                Education
              </h2>
              <ul class="out-body plain-list">
                <li
                  v-for="item in education"
                  :key="item.institution"
                  class="row line"
                >
                  <span>
                    {{ item.degree }}
                    <span class="muted"> · {{ item.institution }}</span>
                  </span>
                  <span class="muted dates">
                    <template v-if="item.expected">expected </template>
                    <time :datetime="item.date">{{ formatMonth(item.date) }}</time>
                  </span>
                </li>
              </ul>
            </template>

            <!-- Writing -->
            <template v-else-if="section.key === 'writing'">
              <h2 class="out-head line">
                Writing
              </h2>
              <ul class="out-body plain-list">
                <li
                  v-for="post in posts.slice(0, 5)"
                  :key="post.href"
                  class="line"
                >
                  <NuxtLink :to="post.href">
                    {{ post.title }}
                  </NuxtLink>
                  <span class="muted"> · <time :datetime="post.date">{{ formatDate(post.date) }}</time></span>
                </li>
                <li class="line">
                  <NuxtLink to="/writing">
                    all writing →
                  </NuxtLink>
                </li>
              </ul>
            </template>

            <!-- CV -->
            <template v-else-if="section.key === 'cv'">
              <h2 class="out-head line">
                egemen-kar-cv.pdf
              </h2>
              <div class="out-body stack">
                <p class="muted line">
                  Two pages: summary, skills, experience and education.
                </p>
                <p class="line actions">
                  <a
                    :href="site.cv"
                    download="Egemen_Kar_CV.pdf"
                  >download</a>
                  <span
                    class="muted"
                    aria-hidden="true"
                  >·</span>
                  <a
                    :href="site.cv"
                    target="_blank"
                    rel="noopener"
                  >open in browser<span class="visually-hidden"> (opens in a new tab)</span></a>
                </p>
              </div>
            </template>

            <!-- Contact -->
            <template v-else-if="section.key === 'contact'">
              <h2 class="out-head line">
                Contact
              </h2>
              <div class="out-body stack">
                <p class="muted line">
                  Email is the best way to reach me.
                </p>
                <dl class="contact-list line">
                  <div
                    v-for="row in contactRows"
                    :key="row.label"
                    class="contact-row"
                  >
                    <dt class="muted">
                      {{ row.label }}
                    </dt>
                    <dd>
                      <a
                        :href="row.href"
                        :target="row.external ? '_blank' : undefined"
                        :rel="row.external ? 'me noopener' : undefined"
                      >{{ row.text }}<span
                        v-if="row.external"
                        class="visually-hidden"
                      > (opens in a new tab)</span></a>
                    </dd>
                  </div>
                </dl>
              </div>
            </template>
          </section>
        </template>
      </div>

      <CommandPrompt
        ref="prompt"
        :sections="sections"
        @open="select($event, { focus: false })"
        @step="select(active + $event, { focus: false })"
      />
    </div>
  </section>
</template>

<style scoped>
.welcome {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 22px;
  padding: 3px 12px;
  border: 1px solid color-mix(in srgb, var(--color-accent) 55%, var(--color-rule));
  border-radius: 6px;
}

.welcome strong {
  font-weight: 700;
}

.spark {
  width: 12px;
  height: 12px;
  fill: none;
  stroke: var(--color-accent);
  stroke-linecap: round;
  stroke-width: 2;
}

h1 {
  margin: 0;
}

.identity {
  display: grid;
  gap: 2px;
  margin-top: 20px;
}

.identity strong {
  font-weight: 700;
}

.rule {
  height: 0;
  margin: 18px 0;
  border: 0;
  border-top: 1px dashed var(--color-rule);
}

.prompt {
  margin-bottom: 6px;
}

.menu {
  display: grid;
}

.menu-item {
  display: flex;
  min-height: 32px;
  align-items: baseline;
  gap: 8px;
  margin-inline: -8px;
  padding: 4px 8px;
  border: 0;
  border-radius: 4px;
  background: transparent;
  color: var(--color-muted);
  font: inherit;
  text-align: left;
  cursor: pointer;
}

.menu-item:hover {
  color: var(--color-text);
}

.menu-item[aria-selected="true"] {
  color: var(--color-accent);
}

/* A highlighted row (like a TUI cursor line) is the focus indicator, instead of a ring around it. */
.menu-item:focus-visible {
  outline: none;
  background: var(--color-accent-soft);
}

.menu-item[aria-selected="true"] .label {
  font-weight: 700;
}

.caret {
  width: 1ch;
  flex: none;
  visibility: hidden;
  font-weight: 700;
}

.menu-item[aria-selected="true"] .caret {
  visibility: visible;
}

.hint {
  display: none;
}

.panels {
  min-height: 12rem;
}

.panel {
  display: grid;
  gap: 18px;
}

.panel[hidden] {
  display: none;
}

.stack {
  display: grid;
  gap: 12px;
}

.block .out-body {
  margin-top: 2px;
}

.company-meta {
  font-weight: 400;
}

h2.out-head,
h3.out-head {
  font-weight: 700;
}

.role + .role {
  margin-top: 14px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  justify-content: space-between;
  gap: 0 16px;
}

.dates {
  font-variant-numeric: tabular-nums;
  white-space: nowrap;
}

.dash-list,
.plain-list {
  margin: 4px 0 0;
  padding: 0;
  list-style: none;
}

.dash-list li {
  position: relative;
  padding-left: 2ch;
  color: var(--color-muted);
}

.dash-list li::before {
  position: absolute;
  left: 0;
  content: "-";
}

.dash-list li + li {
  margin-top: 4px;
}

.plain-list {
  display: grid;
  gap: 8px;
}

.actions {
  display: flex;
  gap: 10px;
}

.contact-list {
  display: grid;
  gap: 4px;
  margin: 0;
}

.contact-row {
  display: grid;
  grid-template-columns: 9ch minmax(0, 1fr);
}

dd {
  margin: 0;
  overflow-wrap: anywhere;
}

/* Claude Code style reveal: output lines arrive in quick succession after a menu change. */
@media (prefers-reduced-motion: no-preference) {
  .animate .panel:not([hidden]) .line {
    animation: line-in 220ms ease-out both;
  }

  .animate .panel:not([hidden]) .line:nth-child(2) { animation-delay: 50ms; }
  .animate .panel:not([hidden]) .line:nth-child(3) { animation-delay: 100ms; }
  .animate .panel:not([hidden]) .line:nth-child(4) { animation-delay: 150ms; }
  .animate .panel:not([hidden]) .line:nth-child(n + 5) { animation-delay: 200ms; }
}

@keyframes line-in {
  from {
    opacity: 0;
    transform: translateY(3px);
  }
}

/* Without JavaScript the menu cannot switch, so show every panel in sequence instead. */
:root:not(.js) .menu,
:root:not(.js) .menu + .rule,
:root:not(.js) .prompt {
  display: none;
}

:root:not(.js) .panel[hidden] {
  display: grid;
}

:root:not(.js) .panel + .panel {
  margin-top: 28px;
}

@media (min-width: 640px) {
  .hint {
    display: inline;
  }
}

/* Wide screens: a two-pane TUI. Identity and menu stay put on the left, output reads on the right. */
@media (min-width: 1100px) {
  .terminal {
    display: grid;
    grid-template-columns: minmax(0, 60ch) max-content minmax(0, 84ch);
    justify-content: start;
    align-items: start;
    gap: 0 40px;
  }

  .pane-intro {
    position: sticky;
    top: 0;
  }

  .split-rule {
    align-self: stretch;
    width: 0;
    height: auto;
    margin: 0;
    border-top: 0;
    border-left: 1px dashed var(--color-rule);
  }

  .panels {
    min-height: 0;
  }
}
</style>
