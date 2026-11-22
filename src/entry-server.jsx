// Server entry used ONLY by scripts/prerender.mjs (never shipped to the browser).
import { renderToStaticMarkup } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import AppRoutes from './Routes.jsx'

export function render(url) {
  return renderToStaticMarkup(
    <StaticRouter location={url}>
      <AppRoutes />
    </StaticRouter>,
  )
}
