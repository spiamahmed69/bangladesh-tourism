import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Save, Trash2, CalendarDays } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import { useLang, pick, BT_TRIPS_KEY } from '../lib/i18n.jsx'
import { DESTINATIONS } from '../data/destinations.js'
import { loadJSON, saveJSON, uid } from '../lib/storage.js'

const INTERESTS = [
  { key: 'beach', en: 'Beach & Islands', bn: 'সৈকত ও দ্বীপ', slugs: ['coxs-bazar', 'saint-martins', 'kuakata'] },
  { key: 'hills', en: 'Hills & Nature', bn: 'পাহাড় ও প্রকৃতি', slugs: ['sajek-valley', 'bandarban', 'rangamati'] },
  { key: 'wildlife', en: 'Wildlife & Forests', bn: 'বন্যপ্রাণী ও বন', slugs: ['sundarbans', 'sreemangal', 'sylhet'] },
  { key: 'heritage', en: 'Heritage & Culture', bn: 'ঐতিহ্য ও সংস্কৃতি', slugs: ['dhaka', 'paharpur', 'bagerhat'] },
  { key: 'mixed', en: 'A little of everything', bn: 'সবকিছু একটু একটু', slugs: ['dhaka', 'coxs-bazar', 'sundarbans', 'sajek-valley'] },
]
const SEASONS = [
  { key: 'winter', en: 'Winter (Nov–Feb)', bn: 'শীত (নভেম্বর–ফেব্রুয়ারি)' },
  { key: 'summer', en: 'Summer (Mar–May)', bn: 'গ্রীষ্ম (মার্চ–মে)' },
  { key: 'monsoon', en: 'Monsoon (Jun–Oct)', bn: 'বর্ষা (জুন–অক্টোবর)' },
]
const DAYS = [3, 5, 7, 10]
const BUDGETS = ['budgetBudget', 'budgetComfort', 'budgetPremium']

export default function PlanTrip() {
  const { lang, t } = useLang()
  const [interest, setInterest] = useState('mixed')
  const [days, setDays] = useState(5)
  const [season, setSeason] = useState('winter')
  const [budget, setBudget] = useState('budgetComfort')
  const [plan, setPlan] = useState(null)
  const [saved, setSaved] = useState([])
  const [justSaved, setJustSaved] = useState(false)

  useEffect(() => { setSaved(loadJSON(BT_TRIPS_KEY, [])) }, [])

  const makePlan = (e) => {
    e.preventDefault()
    const def = INTERESTS.find((i) => i.key === interest) || INTERESTS[4]
    const places = def.slugs.map((s) => DESTINATIONS.find((d) => d.slug === s)).filter(Boolean)
    const steps = []
    for (let i = 0; i < days; i++) {
      const place = places[Math.min(i, places.length - 1)]
      const label = i === 0
        ? (lang === 'bn' ? 'ঢাকায় পৌঁছান ও যাত্রা শুরু' : 'Arrive in Dhaka and set off')
        : (lang === 'bn' ? `${pick(place, 'bn', 'name')} ঘুরে দেখুন` : `Explore ${pick(place, 'en', 'name')}`)
      steps.push({ day: i + 1, place, label })
    }
    setPlan({ interest: def.key, days, season, budget, steps, created: new Date().toISOString().slice(0, 10) })
    setJustSaved(false)
  }

  const saveTrip = () => {
    if (!plan) return
    const trip = { id: uid(), ...plan }
    const next = [trip, ...saved]
    setSaved(next)
    saveJSON(BT_TRIPS_KEY, next)
    setJustSaved(true)
  }
  const deleteTrip = (id) => {
    const next = saved.filter((s) => s.id !== id)
    setSaved(next)
    saveJSON(BT_TRIPS_KEY, next)
  }
  const interestLabel = (key) => { const f = INTERESTS.find((i) => i.key === key); return f ? (lang === 'bn' ? f.bn : f.en) : key }
  const seasonLabel = (key) => { const f = SEASONS.find((i) => i.key === key); return f ? (lang === 'bn' ? f.bn : f.en) : key }

  return (
    <>
      <Seo title="Plan Your Trip" description="Plan your Bangladesh trip by season, interest and days. Build a simple itinerary and save it on your device." path="/plan-your-trip" />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">{t('planTitle')}</h1>
        <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">{t('planSub')}</p>

        <form onSubmit={makePlan} className="mt-8 grid gap-5 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:grid-cols-2 lg:grid-cols-4 dark:bg-slate-800 dark:ring-slate-700">
          <div>
            <label htmlFor="interest" className="block text-sm font-semibold">{t('interest')}</label>
            <select id="interest" value={interest} onChange={(e) => setInterest(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-white px-3 dark:border-slate-600 dark:bg-slate-900">
              {INTERESTS.map((i) => <option key={i.key} value={i.key}>{lang === 'bn' ? i.bn : i.en}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="days" className="block text-sm font-semibold">{t('days')}</label>
            <select id="days" value={days} onChange={(e) => setDays(Number(e.target.value))} className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-white px-3 dark:border-slate-600 dark:bg-slate-900">
              {DAYS.map((d) => <option key={d} value={d}>{d} {t('daysUnit')}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="season" className="block text-sm font-semibold">{t('season')}</label>
            <select id="season" value={season} onChange={(e) => setSeason(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-white px-3 dark:border-slate-600 dark:bg-slate-900">
              {SEASONS.map((s) => <option key={s.key} value={s.key}>{lang === 'bn' ? s.bn : s.en}</option>)}
            </select>
          </div>
          <div>
            <label htmlFor="budget" className="block text-sm font-semibold">{t('budget')}</label>
            <select id="budget" value={budget} onChange={(e) => setBudget(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-white px-3 dark:border-slate-600 dark:bg-slate-900">
              {BUDGETS.map((b) => <option key={b} value={b}>{t(b)}</option>)}
            </select>
          </div>
          <button type="submit" className="flex min-h-12 items-center justify-center rounded-full bg-emerald-700 px-6 font-bold text-white transition hover:bg-emerald-800 sm:col-span-2 lg:col-span-4">{t('makePlan')}</button>
        </form>

        {plan && (
          <div className="mt-8">
            <h2 className="font-display text-2xl font-extrabold">{t('itinerary')}</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{interestLabel(plan.interest)} · {plan.days} {t('daysUnit')} · {seasonLabel(plan.season)} · {t(plan.budget)}</p>
            <ol className="mt-5 space-y-3">
              {plan.steps.map((s) => (
                <li key={s.day} className="flex gap-4 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-700 font-display text-sm font-bold text-white">{s.day}</span>
                  <div>
                    <p className="font-display font-bold">{t('day')} {s.day} — {s.place ? pick(s.place, lang, 'name') : ''}</p>
                    <p className="mt-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{s.label}</p>
                    {s.place && (
                      <Link to={`/destinations/${s.place.slug}`} className="mt-2 inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-300">
                        <MapPin className="h-4 w-4" aria-hidden="true" />{pick(s.place, lang, 'name')}
                      </Link>
                    )}
                  </div>
                </li>
              ))}
            </ol>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button type="button" onClick={saveTrip} className="flex min-h-12 items-center gap-2 rounded-full bg-amber-600 px-6 font-bold text-white transition hover:bg-amber-700">
                <Save className="h-4 w-4" aria-hidden="true" />{t('saveTrip')}
              </button>
              {justSaved && <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">{t('saved')}</p>}
            </div>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">{t('planHonest')}</p>
          </div>
        )}

        <div className="mt-12">
          <h2 className="flex items-center gap-2 font-display text-2xl font-extrabold"><CalendarDays className="h-6 w-6 text-emerald-700 dark:text-emerald-300" aria-hidden="true" />{t('savedTrips')}</h2>
          {saved.length === 0 ? (
            <p className="mt-4 rounded-2xl bg-white p-6 text-slate-600 dark:bg-slate-800 dark:text-slate-300">{t('noSavedTrips')}</p>
          ) : (
            <ul className="mt-4 space-y-3">
              {saved.map((s) => (
                <li key={s.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
                  <div>
                    <p className="font-bold">{interestLabel(s.interest)} · {s.days} {t('daysUnit')} · {seasonLabel(s.season)}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">{s.created} · {t(s.budget)}</p>
                  </div>
                  <button type="button" onClick={() => deleteTrip(s.id)} aria-label={t('delete')} className="flex min-h-11 items-center gap-1.5 rounded-full px-4 text-sm font-semibold text-red-700 ring-1 ring-red-200 hover:bg-red-50 dark:text-red-300 dark:ring-red-900">
                    <Trash2 className="h-4 w-4" aria-hidden="true" />{t('delete')}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  )
}
