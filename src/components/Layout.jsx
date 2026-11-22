import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Menu, X, Search, Sun, Moon, Languages, Palmtree, ExternalLink } from 'lucide-react'
import { useLang, STRINGS, BT_THEME_KEY } from '../lib/i18n.jsx'
import { DESTINATIONS } from '../data/destinations.js'
import { pick } from '../lib/i18n.jsx'

const OFFICIAL = [
  { label: 'tourismboard.gov.bd', url: 'https://tourismboard.gov.bd' },
  { label: 'beautifulbangladesh.gov.bd', url: 'https://beautifulbangladesh.gov.bd' },
  { label: 'visitbangladesh.gov.bd', url: 'https://visitbangladesh.gov.bd' },
]

function HeaderSearch() {
  const { lang, t } = useLang()
  const [q, setQ] = useState('')
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const loc = useLocation()
  useEffect(() => { setOpen(false); setQ('') }, [loc.pathname])
  const results = useMemo(() => {
    const query = q.trim().toLowerCase()
    if (query.length < 2) return []
    return DESTINATIONS.filter((d) =>
      `${d.name_en} ${d.name_bn} ${d.division_en} ${d.division_bn} ${d.category_en} ${d.category_bn}`.toLowerCase().includes(query),
    ).slice(0, 6)
  }, [q])
  return (
    <div className="relative w-full max-w-xs">
      <label htmlFor="header-search" className="sr-only">{t('searchLabel')}</label>
      <div className="flex items-center gap-2 rounded-full bg-white px-3 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
        <Search className="h-4 w-4 shrink-0 text-slate-400" aria-hidden="true" />
        <input
          id="header-search" type="search" value={q} autoComplete="off"
          onChange={(e) => { setQ(e.target.value); setOpen(true) }}
          onFocus={() => setOpen(true)}
          placeholder={t('searchPlaceholder')}
          className="h-11 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
        />
        {q && (
          <button type="button" aria-label={lang === 'bn' ? 'খোঁজা মুছুন' : 'Clear search'} onClick={() => setQ('')}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-700">
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
      {open && results.length > 0 && (
        <ul className="absolute inset-x-0 top-12 z-50 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700" role="listbox" aria-label={t('searchLabel')}>
          {results.map((d) => (
            <li key={d.slug}>
              <button type="button" onClick={() => navigate(`/destinations/${d.slug}`)}
                className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left text-sm hover:bg-emerald-50 dark:hover:bg-slate-700">
                <span className="font-medium">{pick(d, lang, 'name')}</span>
                <span className="shrink-0 text-xs text-slate-500">{pick(d, lang, 'division')}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
      {open && q.trim().length >= 2 && results.length === 0 && (
        <p className="absolute inset-x-0 top-12 z-50 rounded-2xl bg-white px-4 py-3 text-sm text-slate-500 shadow-xl ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">{t('noResults')}</p>
      )}
    </div>
  )
}

export default function Layout() {
  const { lang, toggleLang, t } = useLang()
  const [dark, setDark] = useState(false)
  const [open, setOpen] = useState(false)
  const loc = useLocation()
  useEffect(() => { setOpen(false) }, [loc.pathname])
  useEffect(() => {
    try { if (localStorage.getItem(BT_THEME_KEY) === 'dark') setDark(true) } catch { /* ignore */ }
  }, [])
  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    try { localStorage.setItem(BT_THEME_KEY, dark ? 'dark' : 'light') } catch { /* ignore */ }
  }, [dark])

  const nav = [
    { to: '/', key: 'navHome' },
    { to: '/destinations', key: 'navDestinations' },
    { to: '/experiences', key: 'navExperiences' },
    { to: '/plan-your-trip', key: 'navPlan' },
    { to: '/travel-essentials', key: 'navEssentials' },
    { to: '/gallery', key: 'navGallery' },
    { to: '/about', key: 'navAbout' },
    { to: '/contact', key: 'navContact' },
  ]
  const linkCls = ({ isActive }) => `flex min-h-11 items-center rounded-lg px-3 py-2 text-sm font-medium transition ${isActive ? 'bg-emerald-700 text-white' : 'text-slate-700 hover:bg-emerald-50 hover:text-emerald-800 dark:text-slate-200 dark:hover:bg-slate-800'}`

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/95 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-3 gap-y-2 px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2.5" aria-label={t('brand')}>
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-700 text-white" aria-hidden="true"><Palmtree className="h-6 w-6" /></span>
            <span className="leading-tight">
              <span className="block font-display text-base font-extrabold text-emerald-900 dark:text-white sm:text-lg">{t('brand')}</span>
              <span className="block text-xs font-medium tracking-wide text-slate-500 dark:text-slate-400">{t('brandSub')}</span>
            </span>
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <div className="hidden md:block"><HeaderSearch /></div>
            <button type="button" onClick={toggleLang} aria-label={t('switchLang')}
              className="flex min-h-11 items-center gap-1.5 rounded-full bg-emerald-700 px-3.5 text-sm font-semibold text-white transition hover:bg-emerald-800">
              <Languages className="h-4 w-4" aria-hidden="true" />
              {lang === 'en' ? 'বাংলা' : 'English'}
            </button>
            <button type="button" onClick={() => setDark((d) => !d)} aria-label={dark ? t('lightMode') : t('darkMode')}
              className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-slate-200 hover:bg-slate-100 dark:ring-slate-700 dark:hover:bg-slate-800">
              {dark ? <Sun className="h-5 w-5" aria-hidden="true" /> : <Moon className="h-5 w-5" aria-hidden="true" />}
            </button>
            <button type="button" onClick={() => setOpen((o) => !o)} aria-label={open ? t('closeMenu') : t('menu')} aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-slate-200 hover:bg-slate-100 lg:hidden dark:ring-slate-700 dark:hover:bg-slate-800">
              {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </button>
          </div>
          <nav className="hidden w-full items-center gap-1 lg:flex" aria-label="Main navigation">
            {nav.map((n) => (<NavLink key={n.to} to={n.to} end={n.to === '/'} className={linkCls}>{t(n.key)}</NavLink>))}
          </nav>
          {open && (
            <nav className="w-full border-t border-slate-100 pt-2 lg:hidden dark:border-slate-800" aria-label="Mobile navigation">
              <div className="mb-2 md:hidden"><HeaderSearch /></div>
              <div className="flex flex-col gap-1 pb-2">
                {nav.map((n) => (<NavLink key={n.to} to={n.to} end={n.to === '/'} className={linkCls}>{t(n.key)}</NavLink>))}
              </div>
            </nav>
          )}
        </div>
      </header>

      <main className="flex-1"><Outlet /></main>

      <footer className="bg-emerald-950 text-emerald-50">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
          <div>
            <p className="flex items-center gap-2 font-display text-lg font-extrabold"><Palmtree className="h-5 w-5" aria-hidden="true" />{t('brand')}</p>
            <p className="mt-3 text-sm leading-relaxed text-emerald-100/80">{t('footerAbout')}</p>
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-emerald-200">{t('footerQuick')}</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {nav.map((n) => (<li key={n.to}><Link to={n.to} className="hover:text-white hover:underline">{t(n.key)}</Link></li>))}
            </ul>
          </div>
          <div>
            <h2 className="text-sm font-bold uppercase tracking-wide text-emerald-200">{t('footerOfficial')}</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {OFFICIAL.map((o) => (
                <li key={o.url}><a href={o.url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 hover:text-white hover:underline">{o.label}<ExternalLink className="h-3.5 w-3.5" aria-hidden="true" /></a></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <p className="mx-auto max-w-7xl px-4 py-4 text-center text-xs leading-relaxed text-emerald-100/70 sm:px-6">
            {lang === 'bn' ? STRINGS.disclaimerBn : STRINGS.disclaimerEn}
          </p>
        </div>
      </footer>
    </div>
  )
}
