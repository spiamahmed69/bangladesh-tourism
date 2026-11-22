import { Link } from 'react-router-dom'
import Seo from '../components/Seo.jsx'
import { useLang, pick } from '../lib/i18n.jsx'
import { DESTINATIONS } from '../data/destinations.js'

export default function Gallery() {
  const { lang, t } = useLang()
  return (
    <>
      <Seo title="Gallery" description="Photo gallery of Bangladesh — beaches, hills, forests, rivers and heritage. Illustrative photos." path="/gallery" />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">{t('galleryTitle')}</h1>
        <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">{t('gallerySub')}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {DESTINATIONS.map((d) => (
            <figure key={d.slug} className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
              <Link to={`/destinations/${d.slug}`} aria-label={pick(d, lang, 'name')}>
                <img src={d.image} alt={pick(d, lang, 'name')} loading="lazy" className="h-56 w-full object-cover transition group-hover:scale-105" />
              </Link>
              <figcaption className="p-4">
                <p className="font-display font-bold">{pick(d, lang, 'name')}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{pick(d, lang, 'division')} · {pick(d, lang, 'category')}</p>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="mt-8 text-xs text-slate-500 dark:text-slate-400">{t('galleryNote')}</p>
      </section>
    </>
  )
}
