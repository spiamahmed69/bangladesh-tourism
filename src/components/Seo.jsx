import { useEffect } from 'react'
import { SITE_URL } from '../data/routes.js'

export default function Seo({ title, description, path }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | Beautiful Bangladesh` : 'Beautiful Bangladesh — Visit Bangladesh'
    document.title = fullTitle
    const setMeta = (attr, name, content) => {
      let el = document.querySelector(`meta[${attr}="${name}"]`)
      if (!el) { el = document.createElement('meta'); el.setAttribute(attr, name); document.head.appendChild(el) }
      el.setAttribute('content', content)
    }
    if (description) setMeta('name', 'description', description)
    setMeta('property', 'og:title', fullTitle)
    if (description) setMeta('property', 'og:description', description)
    setMeta('property', 'og:url', `${SITE_URL}${path || '/'}`)
    setMeta('name', 'twitter:title', fullTitle)
    if (description) setMeta('property', 'og:description', description)
    let link = document.querySelector('link[rel="canonical"]')
    if (!link) { link = document.createElement('link'); link.setAttribute('rel', 'canonical'); document.head.appendChild(link) }
    link.setAttribute('href', `${SITE_URL}${path || '/'}`)
    let ld = document.querySelector('#seo-jsonld')
    if (!ld) { ld = document.createElement('script'); ld.id = 'seo-jsonld'; ld.type = 'application/ld+json'; document.head.appendChild(ld) }
    ld.textContent = JSON.stringify({
      '@context': 'https://schema.org', '@type': 'WebPage',
      name: fullTitle, description: description || '',
      url: `${SITE_URL}${path || '/'}`,
      inLanguage: 'en',
      breadcrumb: { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: `${SITE_URL}/` },
        ...((path && path !== '/') ? [{ '@type': 'ListItem', position: 2, name: title, item: `${SITE_URL}${path}` }] : []),
      ] },
    })
  }, [title, description, path])
  return null
}
