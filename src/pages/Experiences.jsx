import { Link } from 'react-router-dom'
import { Waves, Mountain, PawPrint, Landmark, Ship, UtensilsCrossed, ArrowRight } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import { useLang, pick } from '../lib/i18n.jsx'
import { DESTINATIONS } from '../data/destinations.js'

const EXPERIENCES = [
  { icon: Waves, en: 'Beach', bn: 'সমুদ্র সৈকত', descEn: 'Long sandy beaches on the Bay of Bengal — sunsets, surf and slow days by the sea.', descBn: 'বঙ্গোপসাগরের তীরে দীর্ঘ বালুকাবেলা — সূর্যাস্ত, ঢেউ ও সমুদ্রের ধারে ধীর দিন।', slugs: ['coxs-bazar', 'saint-martins', 'kuakata'] },
  { icon: Mountain, en: 'Hills & Clouds', bn: 'পাহাড় ও মেঘ', descEn: 'Green hill valleys, viewpoints and a sea of clouds at sunrise in the Chittagong Hill Tracts.', descBn: 'পার্বত্য চট্টগ্রামে সবুজ পাহাড়ি উপত্যকা, ভিউপয়েন্ট ও সূর্যোদয়ে মেঘের সমুদ্র।', slugs: ['sajek-valley', 'bandarban', 'rangamati'] },
  { icon: PawPrint, en: 'Wildlife', bn: 'বন্যপ্রাণী', descEn: 'The Sundarbans mangrove forest, Lawachara rainforest and the swamp forest of Ratargul.', descBn: 'সুন্দরবন ম্যানগ্রোভ, লাউয়াছড়া রেইনফরেস্ট ও রাতারগুল জলাবন।', slugs: ['sundarbans', 'sreemangal', 'sylhet'] },
  { icon: Landmark, en: 'Heritage', bn: 'ঐতিহ্য', descEn: 'Three UNESCO World Heritage Sites and centuries of mosques, monasteries and forts.', descBn: 'তিনটি ইউনেস্কো বিশ্ব ঐতিহ্য এবং শতাব্দী প্রাচীন মসজিদ, বিহার ও কেল্লা।', slugs: ['paharpur', 'bagerhat', 'dhaka'] },
  { icon: Ship, en: 'Rivers & Lakes', bn: 'নদী ও হ্রদ', descEn: 'Boat trips on Kaptai Lake, the Sangu river and the great river port of Sadarghat.', descBn: 'কাপ্তাই লেক, সাঙ্গু নদী ও সদরঘাটের বিশাল নদীবন্দরে নৌভ্রমণ।', slugs: ['rangamati', 'bandarban', 'dhaka', 'sylhet'] },
  { icon: UtensilsCrossed, en: 'Food & Culture', bn: 'খাবার ও সংস্কৃতি', descEn: 'Old Dhaka’s food streets, seven-layer tea in Sreemangal and tea-garden life.', descBn: 'পুরান ঢাকার খাবারের রাস্তা, শ্রীমঙ্গলের সাত রঙের চা ও চা বাগানের জীবন।', slugs: ['dhaka', 'sreemangal', 'sylhet'] },
]

export default function Experiences() {
  const { lang, t } = useLang()
  return (
    <>
      <Seo title="Experiences" description="Beaches, hills, wildlife, heritage, rivers and food — the best experiences in Bangladesh, by interest." path="/experiences" />
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">{t('expTitle')}</h1>
        <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">{t('expSub')}</p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {EXPERIENCES.map((e) => (
            <article key={e.en} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:ring-slate-700">
              <e.icon className="h-9 w-9 text-emerald-700 dark:text-emerald-300" aria-hidden="true" />
              <h2 className="mt-4 font-display text-xl font-extrabold">{lang === 'bn' ? e.bn : e.en}</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{lang === 'bn' ? e.descBn : e.descEn}</p>
              <ul className="mt-4 space-y-2">
                {e.slugs.map((slug) => {
                  const d = DESTINATIONS.find((x) => x.slug === slug)
                  if (!d) return null
                  return (
                    <li key={slug}>
                      <Link to={`/destinations/${slug}`} className="inline-flex min-h-11 items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-300">
                        {pick(d, lang, 'name')}<ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </>
  )
}
