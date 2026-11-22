import { Link } from 'react-router-dom'
import { MapPin, CalendarDays, ArrowRight } from 'lucide-react'
import { useLang, pick } from '../lib/i18n.jsx'

export default function DestCard({ dest, lazy = true }) {
  const { lang, t } = useLang()
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 transition hover:-translate-y-1 hover:shadow-lg dark:bg-slate-800 dark:ring-slate-700">
      <Link to={`/destinations/${dest.slug}`} className="block" aria-label={pick(dest, lang, 'name')}>
        <img src={dest.image} alt={pick(dest, lang, 'name')} loading={lazy ? 'lazy' : 'eager'} className="h-52 w-full object-cover" />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center justify-between gap-2">
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100">{pick(dest, lang, 'category')}</span>
          <span className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400"><MapPin className="h-3.5 w-3.5" aria-hidden="true" />{pick(dest, lang, 'division')}</span>
        </div>
        <h3 className="font-display text-lg font-bold leading-snug">
          <Link to={`/destinations/${dest.slug}`} className="hover:text-emerald-700 dark:hover:text-emerald-300">{pick(dest, lang, 'name')}</Link>
        </h3>
        <p className="flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{pick(dest, lang, 'short')}</p>
        <p className="flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-slate-400">
          <CalendarDays className="h-3.5 w-3.5" aria-hidden="true" />{t('bestTime')}: {pick(dest, lang, 'best')}
        </p>
        <Link to={`/destinations/${dest.slug}`} className="mt-1 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-300">
          {t('explore')} <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
