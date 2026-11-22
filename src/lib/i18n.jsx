// Bilingual (EN/BN) language context. Default 'en' so the server-rendered
// (prerendered) HTML is in English; the choice is read from localStorage
// on the client and persisted under 'bt-lang'.
import { createContext, useContext, useEffect, useState } from 'react'

export const BT_LANG_KEY = 'bt-lang'
export const BT_THEME_KEY = 'bt-theme'
export const BT_TRIPS_KEY = 'bt-trips'
export const BT_CONTACT_KEY = 'bt-contact-messages'

const LangContext = createContext({ lang: 'en', setLang: () => {}, toggleLang: () => {}, t: (k) => k })

export function LangProvider({ children }) {
  const [lang, setLangState] = useState('en')
  useEffect(() => {
    try {
      const saved = localStorage.getItem(BT_LANG_KEY)
      if (saved === 'en' || saved === 'bn') setLangState(saved)
    } catch { /* ignore */ }
  }, [])
  const setLang = (l) => {
    if (l !== 'en' && l !== 'bn') return
    setLangState(l)
    try { localStorage.setItem(BT_LANG_KEY, l) } catch { /* ignore */ }
  }
  const toggleLang = () => setLang(lang === 'en' ? 'bn' : 'en')
  const t = (key) => (STRINGS[key] && STRINGS[key][lang]) || STRINGS[key]?.en || key
  return <LangContext.Provider value={{ lang, setLang, toggleLang, t }}>{children}</LangContext.Provider>
}

export function useLang() { return useContext(LangContext) }

// Pick a bilingual _en/_bn field from a data object.
export function pick(obj, lang, field) {
  if (!obj) return ''
  return lang === 'bn' ? (obj[`${field}_bn`] ?? obj[`${field}_en`] ?? '') : (obj[`${field}_en`] ?? obj[`${field}_bn`] ?? '')
}

export const STRINGS = {
  brand: { en: 'Beautiful Bangladesh', bn: 'বিউটিফুল বাংলাদেশ' },
  brandSub: { en: 'Bangladesh Tourism', bn: 'বাংলাদেশ পর্যটন' },
  navHome: { en: 'Home', bn: 'হোম' },
  navDestinations: { en: 'Destinations', bn: 'গন্তব্য' },
  navExperiences: { en: 'Experiences', bn: 'অভিজ্ঞতা' },
  navPlan: { en: 'Plan Your Trip', bn: 'ভ্রমণ পরিকল্পনা' },
  navEssentials: { en: 'Travel Essentials', bn: 'ভ্রমণ তথ্য' },
  navGallery: { en: 'Gallery', bn: 'গ্যালারি' },
  navAbout: { en: 'About', bn: 'আমাদের সম্পর্কে' },
  navContact: { en: 'Contact', bn: 'যোগাযোগ' },
  searchPlaceholder: { en: 'Search destinations…', bn: 'গন্তব্য খুঁজুন…' },
  searchLabel: { en: 'Search destinations', bn: 'গন্তব্য খুঁজুন' },
  noResults: { en: 'No destinations found. Try another word.', bn: 'কোনো গন্তব্য পাওয়া যায়নি। অন্য শব্দ দিয়ে চেষ্টা করুন।' },
  switchLang: { en: 'Switch to Bangla', bn: 'ইংরেজিতে দেখুন' },
  darkMode: { en: 'Dark mode', bn: 'ডার্ক মোড' },
  lightMode: { en: 'Light mode', bn: 'লাইট মোড' },
  menu: { en: 'Menu', bn: 'মেনু' },
  closeMenu: { en: 'Close menu', bn: 'মেনু বন্ধ করুন' },
  // Hero / home
  heroTitle: { en: 'Beautiful Bangladesh', bn: 'বিউটিফুল বাংলাদেশ' },
  heroSub: { en: 'Beaches, hills, forests and heritage — a land of rivers, green tea gardens and warm hospitality.', bn: 'সমুদ্র সৈকত, পাহাড়, বন ও ঐতিহ্য — নদী, সবুজ চা বাগান ও আন্তরিক আতিথেয়তার দেশ।' },
  heroCtaExplore: { en: 'Explore Destinations', bn: 'গন্তব্য দেখুন' },
  heroCtaPlan: { en: 'Plan Your Trip', bn: 'ভ্রমণ পরিকল্পনা করুন' },
  heroNote: { en: 'Photo is illustrative.', bn: 'ছবিটি প্রতীকী।' },
  statDestinations: { en: 'Destinations', bn: 'গন্তব্য' },
  statDivisions: { en: 'Divisions covered', bn: 'বিভাগ' },
  statUnesco: { en: 'UNESCO sites', bn: 'ইউনেস্কো স্থান' },
  statSeasons: { en: 'Seasons', bn: 'ঋতু' },
  featuredTitle: { en: 'Featured Destinations', bn: 'নির্বাচিত গন্তব্য' },
  featuredSub: { en: 'From the world’s longest sea beach to the largest mangrove forest — start here.', bn: 'বিশ্বের দীর্ঘতম সমুদ্র সৈকত থেকে বৃহত্তম ম্যানগ্রোভ বন — এখান থেকে শুরু করুন।' },
  viewAll: { en: 'View all destinations', bn: 'সব গন্তব্য দেখুন' },
  bestTime: { en: 'Best time', bn: 'ভ্রমণের সেরা সময়' },
  explore: { en: 'Explore', bn: 'ঘুরে দেখুন' },
  experiencesTitle: { en: 'Travel by Experience', bn: 'অভিজ্ঞতা অনুযায়ী ভ্রমণ' },
  experiencesSub: { en: 'Choose how you want to feel Bangladesh — by the sea, in the hills, or among its heritage.', bn: 'বাংলাদেশকে কীভাবে অনুভব করতে চান তা বেছে নিন — সমুদ্রের ধারে, পাহাড়ে, নাকি ঐতিহ্যের মাঝে।' },
  seasonsTitle: { en: 'Six Seasons of Bangladesh', bn: 'বাংলাদেশের ছয় ঋতু' },
  seasonsSub: { en: 'Bangladesh traditionally has six seasons. The cool, dry winter is the most popular time to visit.', bn: 'বাংলাদেশে ঐতিহ্যগতভাবে ছয়টি ঋতু রয়েছে। শীতল ও শুষ্ক শীতকাল ভ্রমণের সবচেয়ে জনপ্রিয় সময়।' },
  whyTitle: { en: 'Why Visit Bangladesh?', bn: 'বাংলাদেশ কেন ঘুরবেন?' },
  why1t: { en: 'Nature at full scale', bn: 'বিশাল প্রকৃতি' },
  why1d: { en: 'The longest natural sea beach, the largest mangrove forest, green hills and wide rivers — all in one country.', bn: 'দীর্ঘতম প্রাকৃতিক সমুদ্র সৈকত, বৃহত্তম ম্যানগ্রোভ বন, সবুজ পাহাড় ও প্রশস্ত নদী — সব এক দেশে।' },
  why2t: { en: 'Living heritage', bn: 'জীবন্ত ঐতিহ্য' },
  why2d: { en: 'Three UNESCO World Heritage Sites, ancient monasteries and mosques, and cities full of stories.', bn: 'তিনটি ইউনেস্কো বিশ্ব ঐতিহ্য, প্রাচীন বিহার ও মসজিদ, আর গল্পে ভরা শহর।' },
  why3t: { en: 'Warm hospitality', bn: 'আন্তরিক আতিথেয়তা' },
  why3d: { en: 'Travellers are welcomed everywhere — with tea, food and genuine curiosity.', bn: 'সর্বত্র পর্যটকদের স্বাগত জানানো হয় — চা, খাবার ও আন্তরিক আগ্রহ দিয়ে।' },
  ctaTitle: { en: 'Ready to see Bangladesh?', bn: 'বাংলাদেশ দেখতে প্রস্তুত?' },
  ctaSub: { en: 'Build a simple itinerary in a minute — pick your interest, days and season.', bn: 'এক মিনিটে সহজ ভ্রমণসূচি তৈরি করুন — আপনার আগ্রহ, দিন ও ঋতু বেছে নিন।' },
  ctaButton: { en: 'Start planning', bn: 'পরিকল্পনা শুরু করুন' },
  // Destinations page
  destTitle: { en: 'Destinations', bn: 'গন্তব্য' },
  destSub: { en: 'Twelve places that show the many faces of Bangladesh.', bn: 'বাংলাদেশের নানা রূপ দেখায় এমন বারোটি স্থান।' },
  all: { en: 'All', bn: 'সব' },
  filterByCategory: { en: 'Filter by category', bn: 'বিভাগ অনুযায়ী ছাঁকুন' },
  searchDestinations: { en: 'Search by name, division or category…', bn: 'নাম, বিভাগ বা ধরন দিয়ে খুঁজুন…' },
  showing: { en: 'destinations', bn: 'টি গন্তব্য' },
  // Detail
  highlights: { en: 'Highlights', bn: 'বিশেষ আকর্ষণ' },
  planTripCta: { en: 'Plan a trip here', bn: 'এখানে ভ্রমণের পরিকল্পনা করুন' },
  otherDest: { en: 'Other destinations', bn: 'অন্যান্য গন্তব্য' },
  backToDest: { en: 'Back to all destinations', bn: 'সব গন্তব্যে ফিরুন' },
  illustrative: { en: 'Photo is illustrative — it is not claimed to be a photo of this exact place.', bn: 'ছবিটি প্রতীকী — এটি এই স্থানেরই ছবি বলে দাবি করা হয়নি।' },
  // Experiences
  expTitle: { en: 'Experiences', bn: 'অভিজ্ঞতা' },
  expSub: { en: 'Six ways to experience Bangladesh — pick one and start with its places.', bn: 'বাংলাদেশকে অনুভব করার ছয়টি উপায় — একটি বেছে নিয়ে তার স্থানগুলো থেকে শুরু করুন।' },
  // Plan trip
  planTitle: { en: 'Plan Your Trip', bn: 'ভ্রমণ পরিকল্পনা' },
  planSub: { en: 'Pick your interest, days and season — we suggest a simple day-by-day route. Save it on your device.', bn: 'আপনার আগ্রহ, দিন ও ঋতু বেছে নিন — আমরা দিনভিত্তিক সহজ রুট সাজিয়ে দিই। আপনার ডিভাইসে সংরক্ষণ করুন।' },
  interest: { en: 'What interests you most?', bn: 'আপনার সবচেয়ে বেশি আগ্রহ কী?' },
  days: { en: 'How many days?', bn: 'কত দিন?' },
  daysUnit: { en: 'days', bn: 'দিন' },
  season: { en: 'Season', bn: 'ঋতু' },
  budget: { en: 'Budget level', bn: 'বাজেট' },
  budgetBudget: { en: 'Budget', bn: 'সাশ্রয়ী' },
  budgetComfort: { en: 'Comfort', bn: 'আরামদায়ক' },
  budgetPremium: { en: 'Premium', bn: 'প্রিমিয়াম' },
  makePlan: { en: 'Make my itinerary', bn: 'আমার ভ্রমণসূচি তৈরি করুন' },
  itinerary: { en: 'Your suggested itinerary', bn: 'আপনার প্রস্তাবিত ভ্রমণসূচি' },
  day: { en: 'Day', bn: 'দিন' },
  saveTrip: { en: 'Save this trip', bn: 'এই ভ্রমণ সংরক্ষণ করুন' },
  savedTrips: { en: 'Saved trips', bn: 'সংরক্ষিত ভ্রমণ' },
  noSavedTrips: { en: 'No saved trips yet. Make an itinerary and save it here.', bn: 'এখনো কোনো ভ্রমণ সংরক্ষিত হয়নি। ভ্রমণসূচি তৈরি করে এখানে সংরক্ষণ করুন।' },
  delete: { en: 'Delete', bn: 'মুছুন' },
  saved: { en: 'Saved on this device.', bn: 'এই ডিভাইসে সংরক্ষিত হয়েছে।' },
  planHonest: { en: 'Suggested itinerary only — check transport, opening times and bookings before travelling.', bn: 'শুধু প্রস্তাবিত ভ্রমণসূচি — ভ্রমণের আগে পরিবহন, খোলার সময় ও বুকিং যাচাই করুন।' },
  // Essentials
  essTitle: { en: 'Travel Essentials', bn: 'ভ্রমণ তথ্য' },
  essSub: { en: 'The practical things to know before you travel in Bangladesh. Rules change — always check official sources.', bn: 'বাংলাদেশ ভ্রমণের আগে জানা দরকার এমন ব্যবহারিক তথ্য। নিয়ম বদলাতে পারে — সবসময় আনুষ্ঠানিক সূত্র যাচাই করুন।' },
  essVisa: { en: 'Visa', bn: 'ভিসা' },
  essVisaBody: { en: 'Most foreign visitors need a visa for Bangladesh. Check the current rules with the nearest Bangladesh mission or the official government portal before you book — visa types and fees change, and we do not list fees here.', bn: 'বাংলাদেশ ভ্রমণে বেশিরভাগ বিদেশি দর্শনার্থীর ভিসা প্রয়োজন। বুকিংয়ের আগে নিকটতম বাংলাদেশ মিশন বা সরকারি পোর্টাল থেকে বর্তমান নিয়ম যাচাই করুন — ভিসার ধরন ও ফি বদলাতে পারে, তাই এখানে ফি উল্লেখ করা হয়নি।' },
  essBest: { en: 'Best time to visit', bn: 'ভ্রমণের সেরা সময়' },
  essBestBody: { en: 'November to February is the cool, dry season and the most popular time to visit. March to May is hot, and June to October brings the monsoon rains — beautiful and green, but travel can be slower.', bn: 'নভেম্বর থেকে ফেব্রুয়ারি শীতল ও শুষ্ক মৌসুম, ভ্রমণের সবচেয়ে জনপ্রিয় সময়। মার্চ থেকে মে গরম থাকে, আর জুন থেকে অক্টোবরে বর্ষার বৃষ্টি হয় — সুন্দর ও সবুজ, তবে যাতায়াত ধীর হতে পারে।' },
  essMoney: { en: 'Money', bn: 'টাকা-পয়সা' },
  essMoneyBody: { en: 'The currency is the Bangladeshi taka (BDT). Cash is widely used, especially outside Dhaka; cards and mobile payments work in larger hotels and shops in the cities. Carry small notes for markets and transport.', bn: 'মুদ্রা বাংলাদেশি টাকা (BDT)। বিশেষ করে ঢাকার বাইরে নগদ টাকা বেশি চলে; শহরের বড় হোটেল ও দোকানে কার্ড ও মোবাইল পেমেন্ট চলে। বাজার ও যাতায়াতের জন্য ছোট নোট সঙ্গে রাখুন।' },
  essTransport: { en: 'Getting around', bn: 'যাতায়াত' },
  essTransportBody: { en: 'Domestic flights connect Dhaka with Cox’s Bazar, Sylhet, Chattogram and other cities. Trains and buses cover most of the country, and boats are part of everyday travel in the south. Book long-distance transport in advance in the busy winter season.', bn: 'অভ্যন্তরীণ ফ্লাইটে ঢাকার সঙ্গে কক্সবাজার, সিলেট, চট্টগ্রামসহ অন্যান্য শহর যুক্ত। ট্রেন ও বাস দেশের বেশিরভাগ এলাকায় যায়, আর দক্ষিণে নৌকা দৈনন্দিন যাতায়াতের অংশ। শীতের ব্যস্ত মৌসুমে দূরের যাতায়াত আগেভাগে বুক করুন।' },
  essSafety: { en: 'Safety & health', bn: 'নিরাপত্তা ও স্বাস্থ্য' },
  essSafetyBody: { en: 'Bangladesh is generally welcoming to visitors. Drink bottled water, take care with street food if you have a sensitive stomach, and consider travel insurance. Check your government’s current travel advice before you go.', bn: 'বাংলাদেশ সাধারণত দর্শনার্থীদের জন্য আন্তরিক। বোতলজাত পানি পান করুন, পেট সংবেদনশীল হলে স্ট্রিট ফুডে সতর্ক থাকুন এবং ভ্রমণ বীমা নেওয়ার কথা ভাবুন। যাওয়ার আগে আপনার সরকারের বর্তমান ভ্রমণ পরামর্শ যাচাই করুন।' },
  essLanguage: { en: 'Language & etiquette', bn: 'ভাষা ও শিষ্টাচার' },
  essLanguageBody: { en: 'Bangla is the official language. English is understood in hotels, tour companies and cities. A few Bangla words go a long way — and removing shoes before entering homes and places of worship is customary.', bn: 'বাংলা আনুষ্ঠানিক ভাষা। হোটেল, ট্যুর কোম্পানি ও শহরে ইংরেজি বোঝা যায়। কয়েকটি বাংলা শব্দ অনেক কাজে আসে — আর বাড়ি ও উপাসনালয়ে ঢোকার আগে জুতা খোলা রীতি।' },
  essCheckOfficial: { en: 'Check official sources for the latest rules.', bn: 'সর্বশেষ নিয়মের জন্য আনুষ্ঠানিক সূত্র যাচাই করুন।' },
  // Gallery
  galleryTitle: { en: 'Gallery', bn: 'গ্যালারি' },
  gallerySub: { en: 'Beaches, hills, forests, rivers and heritage — a glimpse of Bangladesh.', bn: 'সমুদ্র সৈকত, পাহাড়, বন, নদী ও ঐতিহ্য — বাংলাদেশের এক ঝলক।' },
  galleryNote: { en: 'All photos are illustrative, from Unsplash, and are not claimed to be photos of the exact places named.', bn: 'সব ছবি প্রতীকী, Unsplash থেকে নেওয়া; এগুলো নাম দেওয়া স্থানেরই ছবি বলে দাবি করা হয়নি।' },
  // About
  aboutTitle: { en: 'About the Tourism Board', bn: 'পর্যটন বোর্ড সম্পর্কে' },
  aboutSub: { en: 'The national tourism organisation of Bangladesh — and what this website is.', bn: 'বাংলাদেশের জাতীয় পর্যটন সংস্থা — এবং এই ওয়েবসাইটটি আসলে কী।' },
  aboutBtbTitle: { en: 'Bangladesh Tourism Board', bn: 'বাংলাদেশ পর্যটন বোর্ড' },
  aboutBtbBody: { en: 'The Bangladesh Tourism Board is the national tourism organisation of Bangladesh, responsible for promoting tourism in the country. It was formed in 2010 and works under the Ministry of Civil Aviation and Tourism. Its headquarters are at Parjatan Bhaban, West Agargaon, Dhaka.', bn: 'বাংলাদেশ পর্যটন বোর্ড বাংলাদেশের জাতীয় পর্যটন সংস্থা, দেশে পর্যটন প্রচারের দায়িত্বে রয়েছে। এটি ২০১০ সালে গঠিত হয় এবং বেসামরিক বিমান পরিবহন ও পর্যটন মন্ত্রণালয়ের অধীনে কাজ করে। এর সদর দপ্তর ঢাকার পশ্চিম আগারগাঁওয়ের পর্যটন ভবনে।' },
  aboutSiteTitle: { en: 'About this website', bn: 'এই ওয়েবসাইট সম্পর্কে' },
  aboutSiteBody: { en: 'This is an unofficial modern redesign concept, built to show how the Tourism Board’s website could look and feel today. It is not the official government website, it does not take bookings, and it does not speak for the Board. For official information, please visit the official sites linked below.', bn: 'এটি একটি অনানুষ্ঠানিক আধুনিক নতুন নকশার ধারণা, পর্যটন বোর্ডের ওয়েবসাইট আজ কেমন দেখাতে ও অনুভব করাতে পারে তা দেখানোর জন্য তৈরি। এটি সরকারি ওয়েবসাইট নয়, এখানে বুকিং হয় না, এবং এটি বোর্ডের পক্ষে কথা বলে না। আনুষ্ঠানিক তথ্যের জন্য নিচের আনুষ্ঠানিক সাইটগুলো দেখুন।' },
  officialLinks: { en: 'Official links', bn: 'আনুষ্ঠানিক লিংক' },
  // Contact
  contactTitle: { en: 'Contact', bn: 'যোগাযোগ' },
  contactSub: { en: 'Reach the Board through its official channels — or send feedback about this website.', bn: 'আনুষ্ঠানিক মাধ্যমে বোর্ডের সঙ্গে যোগাযোগ করুন — অথবা এই ওয়েবসাইট সম্পর্কে মতামত পাঠান।' },
  contactOffice: { en: 'Board office', bn: 'বোর্ডের অফিস' },
  contactAddress: { en: 'Level 9–10, Parjatan Bhaban, E-5 C/1, West Agargaon, Sher-e-Bangla Nagar, Dhaka 1207, Bangladesh', bn: 'লেভেল ৯–১০, পর্যটন ভবন, ই-৫ সি/১, পশ্চিম আগারগাঁও, শেরে বাংলা নগর, ঢাকা ১২০৭, বাংলাদেশ' },
  contactNote: { en: 'No phone number or email is listed here — please use the official website for current contact details.', bn: 'এখানে কোনো ফোন নম্বর বা ইমেইল দেওয়া হয়নি — বর্তমান যোগাযোগের তথ্যের জন্য আনুষ্ঠানিক ওয়েবসাইট দেখুন।' },
  feedbackTitle: { en: 'Feedback about this website', bn: 'এই ওয়েবসাইট সম্পর্কে মতামত' },
  feedbackNote: { en: 'This form saves your message on your own device only. Nothing is sent online.', bn: 'এই ফরমটি আপনার বার্তা শুধু আপনার ডিভাইসেই সংরক্ষণ করে। অনলাইনে কিছু পাঠানো হয় না।' },
  formName: { en: 'Your name', bn: 'আপনার নাম' },
  formEmail: { en: 'Your email', bn: 'আপনার ইমেইল' },
  formMessage: { en: 'Your message', bn: 'আপনার বার্তা' },
  send: { en: 'Save feedback', bn: 'মতামত সংরক্ষণ করুন' },
  sentMsg: { en: 'Thank you — your feedback is saved on this device.', bn: 'ধন্যবাদ — আপনার মতামত এই ডিভাইসে সংরক্ষিত হয়েছে।' },
  required: { en: 'Please fill in all fields.', bn: 'সব ঘর পূরণ করুন।' },
  // Footer
  footerAbout: { en: 'A modern, bilingual guide to travelling in Bangladesh — beaches, hills, forests and heritage.', bn: 'বাংলাদেশ ভ্রমণের আধুনিক, দ্বিভাষিক নির্দেশিকা — সমুদ্র সৈকত, পাহাড়, বন ও ঐতিহ্য।' },
  footerQuick: { en: 'Quick links', bn: 'দ্রুত লিংক' },
  footerOfficial: { en: 'Official sites', bn: 'আনুষ্ঠানিক সাইট' },
  disclaimerEn: 'Unofficial modern redesign concept — not the official government website. For official information, visit tourismboard.gov.bd.',
  disclaimerBn: 'অনানুষ্ঠানিক আধুনিক নতুন নকশার ধারণা — এটি সরকারি ওয়েবসাইট নয়। আনুষ্ঠানিক তথ্যের জন্য tourismboard.gov.bd দেখুন।',
  // 404
  notFoundTitle: { en: 'Page not found', bn: 'পৃষ্ঠা পাওয়া যায়নি' },
  notFoundBody: { en: 'The page you are looking for does not exist or has moved.', bn: 'আপনি যে পৃষ্ঠাটি খুঁজছেন তা নেই বা সরানো হয়েছে।' },
  goHome: { en: 'Go to homepage', bn: 'হোমপেজে যান' },
}
