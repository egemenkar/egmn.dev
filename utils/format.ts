const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// "2025-02" -> "Feb 2025", "2027" -> "2027". Formatted by hand so prerendered and hydrated output always match.
export function formatMonth(value: string): string {
  const [year, month] = value.split('-')
  return month ? `${MONTHS[Number(month) - 1]} ${year}` : String(year)
}

// "2026-10-21" -> "21 Oct 2026"
export function formatDate(value: string): string {
  const [year, month, day] = value.split('-')
  return `${Number(day)} ${MONTHS[Number(month) - 1]} ${year}`
}
