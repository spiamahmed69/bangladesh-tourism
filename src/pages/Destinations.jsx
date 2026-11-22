import { useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import DestCard from '../components/DestCard.jsx'
import { useLang, pick } from '../lib/i18n.jsx'
import { DESTINATIONS, CATEGORIES } from '../data/destinations.js'

export default function Destinations() {
  const { lang, t } = useLang()
  const [cat, setCat] = useState('All')
  const [q, setQ] = useState('')
  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase()
    return DESTINATIONS.filter((d) => {
      const catOk = cat === 'All' || d.category_en === cat
      const qOk = !query || `${d.name_en} ${d.name_bn} ${d.division_en} ${d.division_bn} ${d.category_en} ${d.category_bn}`.toLowerCase().includes(query)
      return catOk && qOk
    })
  }, [cat, q])
  return (
    <>
      <Seo title="Destinations" description="Explore Bangladesh’s top destinations — Cox’s Bazar, Sundarbans, Sajek Valley, Saint Martin’s Island, Bandarban, Sreemangal, Sylhet, Paharpur, Bagerhat, Dhaka, Kuakata and Rangamati." path="/destinations" />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">{t('destTitle')}</h1>
        <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">{t('destSub')}</p>

        <div className="mt-6 flex max-w-xl items-center gap-2 rounded-full bg-white px-4 ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
          <Search className="h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
          <label htmlFor="dest-search" className="sr-only">{t('searchDestinations')}</label>
          <input id="dest-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('searchDestinations')} className="h-12 w-full bg-transparent text-base outline-none placeholder:text-slate-400" />
        </div>

        <div className="mt-5 flex flex-wrap gap-2" role="group" aria-label={t('filterByCategory')}>
          <button type="button" onClick={() => setCat('All')} aria-pressed={cat === 'All'}
            className={`min-h-11 rounded-full px-4 text-sm font-semibold transition ${cat === 'All' ? 'bg-emerald-700 text-white' : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-emerald-50 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700'}`}>{t('all')}</button>
          {CATEGORIES.map((c) => (
            <button key={c.en} type="button" onClick={() => setCat(c.en)} aria-pressed={cat === c.en}
              className={`min-h-11 rounded-full px-4 text-sm font-semibold transition ${cat === c.en ? 'bg-emerald-700 text-white' : 'bg-white text-slate-700 ring-1 ring-slate-200 hover:bg-emerald-50 dark:bg-slate-800 dark:text-slate-200 dark:ring-slate-700'}`}>
              {lang === 'bn' ? c.bn : c.en}
            </button>
          ))}
        </div>

        <p className="mt-6 text-sm font-medium text-slate-500 dark:text-slate-400" aria-live="polite">{filtered.length} {t('showing')}</p>
        {filtered.length === 0 ? (
          <p className="mt-6 rounded-2xl bg-white p-6 text-slate-600 dark:bg-slate-800 dark:text-slate-300">{t('noResults')}</p>
        ) : (
          <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((d) => <DestCard key={d.slug} dest={d} />)}
          </div>
        )}
        <p className="mt-8 text-xs text-slate-500 dark:text-slate-400">{t('illustrative')}</p>
      </section>
    </>
  )
}
