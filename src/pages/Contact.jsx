import { useState } from 'react'
import { MapPin, ExternalLink, Send } from 'lucide-react'
import Seo from '../components/Seo.jsx'
import { useLang, BT_CONTACT_KEY } from '../lib/i18n.jsx'
import { saveJSON, loadJSON, uid } from '../lib/storage.js'

const OFFICIAL = [
  { label: 'tourismboard.gov.bd', url: 'https://tourismboard.gov.bd' },
  { label: 'beautifulbangladesh.gov.bd', url: 'https://beautifulbangladesh.gov.bd' },
  { label: 'visitbangladesh.gov.bd', url: 'https://visitbangladesh.gov.bd' },
]

export default function Contact() {
  const { t } = useLang()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState('')

  const submit = (e) => {
    e.preventDefault()
    if (!name.trim() || !email.trim() || !message.trim()) { setStatus('required'); return }
    const prev = loadJSON(BT_CONTACT_KEY, [])
    saveJSON(BT_CONTACT_KEY, [...prev, { id: uid(), name: name.trim(), email: email.trim(), message: message.trim(), at: new Date().toISOString() }])
    setName(''); setEmail(''); setMessage('')
    setStatus('sent')
  }

  return (
    <>
      <Seo title="Contact" description="Contact the Bangladesh Tourism Board — Parjatan Bhaban, West Agargaon, Dhaka. Official links included." path="/contact" />
      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <h1 className="font-display text-3xl font-extrabold sm:text-4xl">{t('contactTitle')}</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-300">{t('contactSub')}</p>

        <article className="mt-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8 dark:bg-slate-800 dark:ring-slate-700">
          <h2 className="flex items-center gap-2 font-display text-xl font-extrabold"><MapPin className="h-5 w-5 text-emerald-700 dark:text-emerald-300" aria-hidden="true" />{t('contactOffice')}</h2>
          <address className="mt-3 text-sm leading-relaxed not-italic text-slate-700 dark:text-slate-200">{t('contactAddress')}</address>
          <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">{t('contactNote')}</p>
          <ul className="mt-4 space-y-2">
            {OFFICIAL.map((o) => (
              <li key={o.url}>
                <a href={o.url} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-300">
                  {o.label}<ExternalLink className="h-4 w-4" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </article>

        <article className="mt-6 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200 sm:p-8 dark:bg-slate-800 dark:ring-slate-700">
          <h2 className="font-display text-xl font-extrabold">{t('feedbackTitle')}</h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{t('feedbackNote')}</p>
          <form onSubmit={submit} className="mt-5 space-y-4">
            <div>
              <label htmlFor="fb-name" className="block text-sm font-semibold">{t('formName')}</label>
              <input id="fb-name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-white px-3 dark:border-slate-600 dark:bg-slate-900" />
            </div>
            <div>
              <label htmlFor="fb-email" className="block text-sm font-semibold">{t('formEmail')}</label>
              <input id="fb-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="mt-2 h-12 w-full rounded-xl border border-slate-300 bg-white px-3 dark:border-slate-600 dark:bg-slate-900" />
            </div>
            <div>
              <label htmlFor="fb-message" className="block text-sm font-semibold">{t('formMessage')}</label>
              <textarea id="fb-message" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-3 py-3 dark:border-slate-600 dark:bg-slate-900" />
            </div>
            <button type="submit" className="flex min-h-12 items-center gap-2 rounded-full bg-emerald-700 px-6 font-bold text-white transition hover:bg-emerald-800">
              <Send className="h-4 w-4" aria-hidden="true" />{t('send')}
            </button>
            {status === 'sent' && <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300" role="status">{t('sentMsg')}</p>}
            {status === 'required' && <p className="text-sm font-medium text-red-700 dark:text-red-300" role="alert">{t('required')}</p>}
          </form>
        </article>
      </section>
    </>
  )
}
