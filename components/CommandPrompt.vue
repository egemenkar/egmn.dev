<script setup lang="ts">
// A real shell prompt at the end of the output: "/" opens command suggestions (ARIA combobox + listbox),
// Enter runs a command, anything unknown answers like zsh would.
const props = defineProps<{ sections: { key: string, label: string, hint: string }[] }>()
const emit = defineEmits<{ open: [index: number], step: [delta: number] }>()

interface Command {
  name: string
  hint: string
  run: () => void
}

const { toggle: toggleTheme } = useTheme()

const input = ref<HTMLInputElement>()
const value = ref('')
const focused = ref(false)
const dismissed = ref(false)
const highlighted = ref(0)
const output = ref<{ command: string, lines: string[], error: boolean } | null>(null)

// The native caret is hidden in favour of a blinking terminal block. The font is monospace, so the
// block sits `caret` characters in; it stays solid while typing and blinks again once idle.
const caret = ref(0)
const typing = ref(false)
let idleTimer: ReturnType<typeof setTimeout> | undefined

function trackCaret() {
  caret.value = input.value?.selectionStart ?? value.value.length
  typing.value = true
  clearTimeout(idleTimer)
  idleTimer = setTimeout(() => (typing.value = false), 600)
}

watch(value, () => nextTick(trackCaret))
onBeforeUnmount(() => clearTimeout(idleTimer))

const commands = computed<Command[]>(() => [
  ...props.sections.map((section, index) => ({
    name: `/${section.key}`,
    hint: section.hint,
    run: () => emit('open', index),
  })),
  { name: '/theme', hint: 'switch light and dark', run: toggleTheme },
  { name: '/help', hint: 'list every command', run: () => showHelp() },
  { name: '/clear', hint: 'clear this output', run: () => (output.value = null) },
])

const query = computed(() => value.value.trim().toLowerCase())
const suggestions = computed(() => commands.value.filter(({ name }) => name.startsWith(query.value)))
const listOpen = computed(() => focused.value && !dismissed.value && query.value.startsWith('/') && suggestions.value.length > 0)

watch(query, () => {
  highlighted.value = 0
  dismissed.value = false
})

function showHelp(command = '/help') {
  output.value = {
    command,
    lines: commands.value.map(({ name, hint }) => `${name.padEnd(13)}${hint}`),
    error: false,
  }
}

function execute(raw: string) {
  const typed = raw.trim()
  if (!typed) return
  const normalized = (typed.startsWith('/') ? typed : `/${typed}`).toLowerCase()
  const command = commands.value.find(({ name }) => name === normalized)

  value.value = ''
  if (!command) {
    output.value = {
      command: typed,
      lines: [`zsh: command not found: ${typed.replace(/^\//, '').split(/\s+/)[0]}`, 'Type / to see available commands.'],
      error: true,
    }
    return
  }
  if (command.name !== '/help') output.value = null
  command.run()
}

function onKeydown(event: KeyboardEvent) {
  const count = suggestions.value.length

  if (listOpen.value && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
    highlighted.value = (highlighted.value + (event.key === 'ArrowDown' ? 1 : -1) + count) % count
  }
  else if (!value.value && (event.key === 'ArrowDown' || event.key === 'ArrowUp')) {
    // An empty prompt still lets the arrows walk the menu above.
    emit('step', event.key === 'ArrowDown' ? 1 : -1)
  }
  else if (listOpen.value && event.key === 'Tab' && !event.shiftKey) {
    value.value = suggestions.value[highlighted.value]!.name
  }
  else if (event.key === 'Enter') {
    execute(listOpen.value ? suggestions.value[highlighted.value]!.name : value.value)
  }
  else if (event.key === 'Escape') {
    if (listOpen.value) dismissed.value = true
    else if (value.value) value.value = ''
    else if (output.value) output.value = null
    else input.value?.blur()
  }
  else {
    return
  }
  event.preventDefault()
}

// Lets the page hand keystrokes typed anywhere (like "/") to the prompt.
function focusWith(text = '') {
  value.value += text
  input.value?.focus()
}

defineExpose({ focusWith })
</script>

<template>
  <div class="command">
    <div
      v-if="output"
      class="result"
      aria-live="polite"
    >
      <p class="echo">
        <span class="accent">egemen@egmn.dev</span> <span class="muted">~ %</span> {{ output.command }}
      </p>
      <pre :class="{ error: output.error }">{{ output.lines.join('\n') }}</pre>
    </div>

    <ul
      v-show="listOpen"
      id="command-list"
      class="suggestions"
      role="listbox"
      aria-label="Commands"
    >
      <li
        v-for="(command, index) in suggestions"
        :id="`command-${index}`"
        :key="command.name"
        role="option"
        :aria-selected="index === highlighted"
        @mousedown.prevent="execute(command.name)"
        @mousemove="highlighted = index"
      >
        <span class="name">{{ command.name }}</span>
        <span class="muted">{{ command.hint }}</span>
      </li>
    </ul>

    <div class="prompt">
      <label
        for="command-input"
        class="prompt-label"
      >
        <span class="accent host">egemen@egmn.dev</span> <span class="muted">~ %</span>
        <span class="visually-hidden">Command</span>
      </label>
      <span class="field">
        <input
          id="command-input"
          ref="input"
          v-model="value"
          class="prompt-input"
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-controls="command-list"
          :aria-expanded="listOpen"
          :aria-activedescendant="listOpen ? `command-${highlighted}` : undefined"
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
          enterkeyhint="go"
          placeholder="type / for commands"
          @focus="focused = true"
          @blur="focused = false"
          @keydown="onKeydown"
          @keyup="trackCaret"
          @click="trackCaret"
          @select="trackCaret"
        >
        <span
          class="cursor"
          :class="{ solid: typing }"
          :style="{ left: `min(${caret}ch, 100% - 1ch)` }"
          aria-hidden="true"
        />
      </span>
    </div>
  </div>
</template>

<style scoped>
/* Pinned to the bottom of the terminal like Claude Code's input; results and suggestions open above it. */
.command {
  position: sticky;
  bottom: 0;
  z-index: 1;
  margin-top: 28px;
  padding: 12px 0 4px;
  border-top: 1px dashed var(--color-rule);
  background: var(--color-panel);
}

.result {
  margin-bottom: 14px;
}

pre {
  margin: 2px 0 0;
  color: var(--color-muted);
  font: inherit;
  white-space: pre-wrap;
}

pre.error {
  color: var(--color-text);
}

.prompt {
  display: flex;
  align-items: baseline;
  gap: 1ch;
}

.prompt-label {
  flex: none;
}

/* Narrow phones keep the full placeholder by dropping user@host from the prompt. */
@media (max-width: 400px) {
  .host {
    display: none;
  }
}

.field {
  position: relative;
  display: flex;
  min-width: 0;
  flex: 1;
  /* iOS zooms into inputs under 16px; the cursor shares this size so its ch steps match. */
  font-size: max(16px, 1em);
}

@media (pointer: fine) {
  .field {
    font-size: inherit;
  }
}

.prompt-input {
  width: 100%;
  min-width: 0;
  padding: 0;
  border: 0;
  background: transparent;
  color: var(--color-text);
  caret-color: transparent;
  font: inherit;
  line-height: inherit;
}

/* Empty prompt: block cursor first, hint text after it, as in a shell. */
.prompt-input:placeholder-shown {
  text-indent: 1.5ch;
}

.cursor {
  position: absolute;
  top: 50%;
  width: 1ch;
  height: 1.2em;
  background: var(--color-accent);
  pointer-events: none;
  transform: translateY(-50%);
}

@media (prefers-reduced-motion: no-preference) {
  .cursor:not(.solid) {
    animation: blink 1.1s steps(1) infinite;
  }
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}

.prompt-input::placeholder {
  color: var(--color-muted);
  opacity: 0.8;
}

.prompt-input:focus {
  outline: none;
}

.prompt:focus-within .prompt-label .muted {
  color: var(--color-accent);
}

.suggestions {
  margin: 0 0 8px;
  padding: 0;
  list-style: none;
}

[role="option"] {
  display: grid;
  grid-template-columns: 14ch minmax(0, 1fr);
  gap: 1ch;
  margin-inline: -8px;
  padding: 2px 8px;
  border-radius: 4px;
  cursor: pointer;
}

[role="option"][aria-selected="true"] {
  background: var(--color-accent-soft);
  color: var(--color-accent);
}

[role="option"][aria-selected="true"] .name {
  font-weight: 700;
}

:root:not(.js) .command {
  display: none;
}
</style>
