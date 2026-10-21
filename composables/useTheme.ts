// Light/dark state shared by the toggle button and the /theme command.
// The initial theme is applied by an inline script in app.vue before first paint;
// `isDark` stays undefined until sync() runs after hydration, so prerendered markup never mismatches.
const STORAGE_KEY = 'egmn-theme'

export function useTheme() {
  const isDark = useState<boolean | undefined>('theme-is-dark', () => undefined)

  function sync() {
    const explicit = document.documentElement.dataset.theme
    isDark.value = explicit ? explicit === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches
  }

  function toggle() {
    sync()
    const next = isDark.value ? 'light' : 'dark'
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem(STORAGE_KEY, next)
    }
    catch {
      // Storage can be unavailable (private mode); the choice then lasts for this page view.
    }
    isDark.value = next === 'dark'
  }

  return { isDark, sync, toggle }
}
