import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, MapPin, Waves, Mountain, PawPrint, Landmark, Ship, UtensilsCrossed, ArrowRight, Sun, CloudRain, Leaf, Snowflake, Flower2, ThermometerSun } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import DestCard from '../components/DestCard.jsx'
import { useLang, pick } from '../lib/i18n.jsx'
import { DESTINATIONS } from '../data/destinations.js'

const SEASONS = [
  { en: 'Summer', bn: 'গ্রীষ্ম', monthsEn: 'Mid-Apr – Mid-Jun', monthsBn: 'মধ্য এপ্রিল – মধ্য জুন', icon: ThermometerSun },
  { en: 'Monsoon', bn: 'বর্ষা', monthsEn: 'Mid-Jun – Mid-Aug', monthsBn: 'মধ্য জুন – মধ্য আগস্ট', icon: CloudRain },
  { en: 'Autumn', bn: 'শরৎ', monthsEn: 'Mid-Aug – Mid-Oct', monthsBn: 'মধ্য আগস্ট – মধ্য অক্টোবর', icon: Leaf },
  { en: 'Late Autumn', bn: 'হেমন্ত', monthsEn: 'Mid-Oct – Mid-Dec', monthsBn: 'মধ্য অক্টোবর – মধ্য ডিসেম্বর', icon: Leaf },
  { en: 'Winter', bn: 'শীত', monthsEn: 'Mid-Dec – Mid-Feb', monthsBn: 'মধ্য ডিসেম্বর – মধ্য ফেব্রুয়ারি', icon: Snowflake },
  { en: 'Spring', bn: 'বসন্ত', monthsEn: 'Mid-Feb – Mid-Apr', monthsBn: 'মধ্য ফেব্রুয়ারি – মধ্য এপ্রিল', icon: Flower2 },
]

const EXPERIENCES = [
  { icon: Waves, en: 'Beach', bn: 'সমুদ্র সৈকত', descEn: 'Long sandy beaches and the Bay of Bengal.', descBn: 'দীর্ঘ বালুকাবেলা ও বঙ্গোপসাগর।' },
  { icon: Mountain, en: 'Hills & Clouds', bn: 'পাহাড় ও মেঘ', descEn: 'Hill valleys above a sea of clouds.', descBn: 'মেঘের সমুদ্রের ওপরে পাহাড়ি উপত্যকা।' },
  { icon: PawPrint, en: 'Wildlife', bn: 'বন্যপ্রাণী', descEn: 'Mangrove forests and the Royal Bengal Tiger.', descBn: 'ম্যানগ্রোভ বন ও রয়েল বেঙ্গল টাইগার।' },
  { icon: Landmark, en: 'Heritage', bn: 'ঐতিহ্য', descEn: 'UNESCO sites, monasteries and mosques.', descBn: 'ইউনেস্কো স্থান, বিহার ও মসজিদ।' },
  { icon: Ship, en: 'Rivers & Lakes', bn: 'নদী ও হ্রদ', descEn: 'Boat journeys on rivers and lakes.', descBn: 'নদী ও হ্রদে নৌভ্রমণ।' },
  { icon: UtensilsCrossed, en: 'Food & Culture', bn: 'খাবার ও সংস্কৃতি', descEn: 'Old Dhaka food streets and tea culture.', descBn: 'পুরান ঢাকার খাবার ও চায়ের সংস্কৃতি।' },
]

export default function Home() {
  const { lang, t } = useLang()
  const [q, setQ] = useState('')
  const navigate = useNavigate()
  const featured = DESTINATIONS.slice(0, 6)
  const hero = DESTINATIONS[0]
  const goSearch = (e) => {
    e.preventDefault()
    const query = q.trim().toLowerCase()
    if (!query) { navigate('/destinations'); return }
    const hit = DESTINATIONS.find((d) => `${d.name_en} ${d.name_bn} ${d.division_en} ${d.division_bn} ${d.category_en} ${d.category_bn}`.toLowerCase().includes(query))
    navigate(hit ? `/destinations/${hit.slug}` : '/destinations')
  }
  return (
    <>
      <Seo title="Beautiful Bangladesh — Visit Bangladesh" description="Beautiful Bangladesh: beaches, hills, forests and heritage. Plan your trip to Cox’s Bazar, the Sundarbans, Sajek Valley, Saint Martin’s Island and more — in English and Bangla." path="/" />
      <section className="relative overflow-hidden">
        <img src={hero.image} alt={pick(hero, lang, 'name')} loading="eager" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/70 via-emerald-950/45 to-emerald-950/80" aria-hidden="true" />
        <div className="relative mx-auto max-w-7xl px-4 pb-16 pt-20 sm:px-6 sm:pt-28">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-amber-300">{lang === 'bn' ? 'বাংলাদেশ পর্যটন বোর্ড' : 'Bangladesh Tourism Board'}</p>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold leading-tight text-white sm:text-6xl">{t('heroTitle')}</h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-emerald-50/90">{t('heroSub')}</p>
          <form onSubmit={goSearch} className="mt-8 flex max-w-xl flex-col gap-2 sm:flex-row" role="search">
            <label htmlFor="home-search" className="sr-only">{t('searchLabel')}</label>
            <div className="flex flex-1 items-center gap-2 rounded-full bg-white px-4 ring-1 ring-slate-200">
              <Search className="h-5 w-5 shrink-0 text-slate-400" aria-hidden="true" />
              <input id="home-search" type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('searchPlaceholder')} className="h-12 w-full bg-transparent text-base outline-none placeholder:text-slate-400" />
            </div>
            <button type="submit" className="flex min-h-12 items-center justify-center rounded-full bg-amber-600 px-6 text-base font-bold text-white transition hover:bg-amber-700">{t('searchLabel')}</button>
          </form>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/destinations" className="flex min-h-12 items-center gap-2 rounded-full bg-emerald-600 px-6 font-bold text-white transition hover:bg-emerald-700">{t('heroCtaExplore')}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
            <Link to="/plan-your-trip" className="flex min-h-12 items-center gap-2 rounded-full bg-white/95 px-6 font-bold text-emerald-900 transition hover:bg-white">{t('heroCtaPlan')}</Link>
          </div>
          <p className="mt-4 text-xs text-emerald-100/70">{t('heroNote')}</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6" aria-label="Facts">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { n: '12', label: t('statDestinations') },
            { n: '8', label: t('statDivisions') },
            { n: '3', label: t('statUnesco') },
            { n: '6', label: t('statSeasons') },
          ].map((s) => (
            <div key={s.label} className="rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
              <p className="font-display text-3xl font-extrabold text-emerald-700 dark:text-emerald-300">{s.n}</p>
              <p className="mt-1 text-sm font-medium text-slate-600 dark:text-slate-300">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
        <h2 className="font-display text-2xl font-extrabold sm:text-3xl">{t('featuredTitle')}</h2>
        <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">{t('featuredSub')}</p>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((d) => <DestCard key={d.slug} dest={d} />)}
        </div>
        <Link to="/destinations" className="mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-emerald-700 px-6 font-bold text-white transition hover:bg-emerald-800">{t('viewAll')}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
      </section>

      <section className="bg-emerald-900 py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">{t('experiencesTitle')}</h2>
          <p className="mt-2 max-w-2xl text-emerald-100/85">{t('experiencesSub')}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {EXPERIENCES.map((e) => (
              <Link key={e.en} to="/experiences" className="flex gap-4 rounded-2xl bg-white/10 p-5 ring-1 ring-white/15 transition hover:bg-white/15">
                <e.icon className="h-8 w-8 shrink-0 text-amber-300" aria-hidden="true" />
                <span>
                  <span className="block font-display text-lg font-bold">{lang === 'bn' ? e.bn : e.en}</span>
                  <span className="mt-1 block text-sm text-emerald-100/80">{lang === 'bn' ? e.descBn : e.descEn}</span>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <h2 className="font-display text-2xl font-extrabold sm:text-3xl">{t('seasonsTitle')}</h2>
        <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">{t('seasonsSub')}</p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SEASONS.map((s) => (
            <div key={s.en} className="flex items-center gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
              <s.icon className="h-8 w-8 shrink-0 text-emerald-700 dark:text-emerald-300" aria-hidden="true" />
              <div>
                <p className="font-display font-bold">{lang === 'bn' ? s.bn : s.en}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">{lang === 'bn' ? s.monthsBn : s.monthsEn}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6">
        <h2 className="font-display text-2xl font-extrabold sm:text-3xl">{t('whyTitle')}</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            { icon: Sun, title: t('why1t'), body: t('why1d') },
            { icon: Landmark, title: t('why2t'), body: t('why2d') },
            { icon: MapPin, title: t('why3t'), body: t('why3d') },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
              <c.icon className="h-8 w-8 text-emerald-700 dark:text-emerald-300" aria-hidden="true" />
              <h3 className="mt-4 font-display text-lg font-bold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-r from-emerald-700 to-teal-700 px-6 py-12 text-center text-white sm:px-12">
          <h2 className="font-display text-2xl font-extrabold sm:text-3xl">{t('ctaTitle')}</h2>
          <p className="mx-auto mt-3 max-w-xl text-emerald-50/90">{t('ctaSub')}</p>
          <Link to="/plan-your-trip" className="mt-6 inline-flex min-h-12 items-center gap-2 rounded-full bg-amber-600 px-8 font-bold text-white transition hover:bg-amber-700">{t('ctaButton')}<ArrowRight className="h-4 w-4" aria-hidden="true" /></Link>
        </div>
      </section>
    </>
  )
}
