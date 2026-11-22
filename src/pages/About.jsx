import { ExternalLink, Landmark, Globe } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import { useLang } from '../lib/i18n.jsx'

const OFFICIAL = [
  { label: 'tourismboard.gov.bd', url: 'https://tourismboard.gov.bd' },
  { label: 'beautifulbangladesh.gov.bd', url: 'https://beautifulbangladesh.gov.bd' },
  { label: 'visitbangladesh.gov.bd', url: 'https://visitbangladesh.gov.bd' },
]

export default function About() {
  const { t } = useLang()
  return (
    <>
      <Seo title="About the Tourism Board" description="About the Bangladesh Tourism Board — the national tourism organisation, formed in 2010 under the Ministry of Civil Aviation and Tourism." path="/about" />
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">{t('aboutTitle')}</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{t('aboutSub')}</p>

        <article className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8 dark:bg-slate-800 dark:ring-slate-700">
          <Landmark className="h-9 w-9 text-emerald-700 dark:text-emerald-300" aria-hidden="true" />
          <h2 className="mt-4 font-display text-2xl font-extrabold">{t('aboutBtbTitle')}</h2>
          <p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-200">{t('aboutBtbBody')}</p>
        </article>

        <article className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8 dark:bg-slate-800 dark:ring-slate-700">
          <Globe className="h-9 w-9 text-emerald-700 dark:text-emerald-300" aria-hidden="true" />
          <h2 className="mt-4 font-display text-2xl font-extrabold">{t('aboutSiteTitle')}</h2>
          <p className="mt-3 leading-relaxed text-slate-700 dark:text-slate-200">{t('aboutSiteBody')}</p>
          <h3 className="mt-6 font-display text-lg font-bold">{t('officialLinks')}</h3>
          <ul className="mt-3 space-y-2">
            {OFFICIAL.map((o) => (
              <li key={o.url}>
                <a href={o.url} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-300">
                  {o.label}<ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </article>
      </section>
    </>
  )
}
