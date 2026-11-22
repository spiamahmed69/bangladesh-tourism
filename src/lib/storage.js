export function loadJSON(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch { return fallback }
}
export function saveJSON(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)) } catch { /* ignore */ }
}
export const EVENTS_KEY = 'sp-calendar-events'
export const REMINDERS_KEY = 'sp-calendar-reminders'
export const COUNTDOWNS_KEY = 'sp-calendar-countdowns'
export const HIJRI_ADJ_KEY = 'sp-calendar-hijri-adjustments'
export const CLOCKS_KEY = 'sp-calendar-clocks'
export const THEME_KEY = 'sp-calendar-theme'
export const CONTACT_KEY = 'sp-calendar-contact-messages'
export function uid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}
