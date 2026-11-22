import { FileCheck, Sun, Banknote, Bus, ShieldCheck, Languages } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import { useLang } from '../lib/i18n.jsx'

export default function Essentials() {
  const { t } = useLang()
  const sections = [
    { icon: FileCheck, title: t('essVisa'), body: t('essVisaBody') },
    { icon: Sun, title: t('essBest'), body: t('essBestBody') },
    { icon: Banknote, title: t('essMoney'), body: t('essMoneyBody') },
    { icon: Bus, title: t('essTransport'), body: t('essTransportBody') },
    { icon: ShieldCheck, title: t('essSafety'), body: t('essSafetyBody') },
    { icon: Languages, title: t('essLanguage'), body: t('essLanguageBody') },
  ]
  return (
    <>
      <Seo title="Travel Essentials" description="Visa, best time to visit, money, transport, safety and health — the essentials for travelling in Bangladesh." path="/travel-essentials" />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">{t('essTitle')}</h1>
        <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">{t('essSub')}</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {sections.map((s) => (
            <article key={s.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
              <s.icon className="h-8 w-8 text-emerald-700 dark:text-emerald-300" aria-hidden="true" />
              <h2 className="mt-4 font-display text-xl font-extrabold">{s.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{s.body}</p>
            </article>
          ))}
        </div>
        <p className="mt-8 rounded-2xl bg-amber-50 p-5 text-sm font-medium text-amber-900 ring-1 ring-amber-200 dark:bg-amber-950 dark:text-amber-100 dark:ring-amber-900">{t('essCheckOfficial')}</p>
      </section>
    </>
  )
}
