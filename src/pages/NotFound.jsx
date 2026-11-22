import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import { useLang } from '../lib/i18n.jsx'

export default function NotFound() {
  const { t } = useLang()
  return (
    <>
      <Seo title="Page not found" description="The page you are looking for does not exist." path="/404" />
      <section className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <Compass className="mx-auto h-14 w-14 text-emerald-700 dark:text-emerald-300" aria-hidden="true" />
        <h1 className="mt-6 font-display text-4xl font-extrabold">404</h1>
        <h2 className="mt-2 font-display text-2xl font-bold">{t('notFoundTitle')}</h2>
        <p className="mt-3 text-slate-600 dark:text-slate-300">{t('notFoundBody')}</p>
        <Link to="/" className="mt-8 inline-flex min-h-12 items-center rounded-full bg-emerald-700 px-6 font-bold text-white transition hover:bg-emerald-800">{t('goHome')}</Link>
      </section>
    </>
  )
}
