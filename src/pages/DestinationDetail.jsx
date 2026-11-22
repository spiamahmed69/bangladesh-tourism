import { Link, useParams } from 'react-router-dom'
import { MapPin, CalendarDays, Check, ArrowLeft, ArrowRight } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import DestCard from '../components/DestCard.jsx'
import NotFound from './NotFound.jsx'
import { useLang, pick } from '../lib/i18n.jsx'
import { DESTINATIONS, getDestination } from '../data/destinations.js'

export default function DestinationDetail() {
  const { slug } = useParams()
  const { lang, t } = useLang()
  const dest = getDestination(slug)
  if (!dest) return <NotFound />
  const others = DESTINATIONS.filter((d) => d.slug !== dest.slug).slice(0, 3)
  return (
    <>
      <Seo title={dest.name_en} description={dest.short_en} path={`/destinations/${dest.slug}`} />
      <section className="relative overflow-hidden">
        <img src={dest.image} alt={pick(dest, lang, 'name')} loading="eager" className="h-72 w-full object-cover sm:h-96" />
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-950/80 via-emerald-950/20 to-transparent" aria-hidden="true" />
        <div className="absolute inset-x-0 bottom-0 mx-auto max-w-7xl px-4 pb-6 sm:px-6">
          <span className="inline-block rounded-full bg-amber-500 px-3 py-1 text-xs font-bold text-white">{pick(dest, lang, 'category')}</span>
          <h1 className="mt-3 font-display text-3xl font-extrabold text-white sm:text-5xl">{pick(dest, lang, 'name')}</h1>
          <p className="mt-2 flex items-center gap-1.5 text-emerald-50"><MapPin className="h-4 w-4" aria-hidden="true" />{pick(dest, lang, 'division')}</p>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <Link to="/destinations" className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-300">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />{t('backToDest')}
        </Link>
        <div className="mt-6 grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <p className="text-lg leading-relaxed text-slate-700 dark:text-slate-200">{pick(dest, lang, 'desc')}</p>
            <h2 className="mt-8 font-display text-xl font-extrabold">{t('highlights')}</h2>
            <ul className="mt-4 space-y-3">
              {pick(dest, lang, 'highlights').map((h) => (
                <li key={h} className="flex items-start gap-3 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700 dark:text-emerald-300" aria-hidden="true" />
                  <span className="text-sm leading-relaxed">{h}</span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-slate-500 dark:text-slate-400">{t('illustrative')}</p>
          </div>
          <aside className="h-fit rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
            <p className="flex items-center gap-2 text-sm font-semibold"><CalendarDays className="h-4 w-4 text-emerald-700 dark:text-emerald-300" aria-hidden="true" />{t('bestTime')}</p>
            <p className="mt-1 text-lg font-bold">{pick(dest, lang, 'best')}</p>
            <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{pick(dest, lang, 'short')}</p>
            <Link to="/plan-your-trip" className="mt-6 flex min-h-12 items-center justify-center gap-2 rounded-full bg-emerald-700 px-5 font-bold text-white transition hover:bg-emerald-800">
              {t('planTripCta')}<ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </aside>
        </div>
        <h2 className="mt-12 font-display text-2xl font-extrabold">{t('otherDest')}</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {others.map((d) => <DestCard key={d.slug} dest={d} />)}
        </div>
      </section>
    </>
  )
}
