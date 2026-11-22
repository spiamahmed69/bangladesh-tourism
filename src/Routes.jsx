import { Routes, Route } from 'react-router-dom'
import { LangProvider } from './lib/i18n.jsx'
import Layout from './components/Layout.jsx'
import Home from './pages/Home.jsx'
import Destinations from './pages/Destinations.jsx'
import DestinationDetail from './pages/DestinationDetail.jsx'
import Experiences from './pages/Experiences.jsx'
import PlanTrip from './pages/PlanTrip.jsx'
import Essentials from './pages/Essentials.jsx'
import Gallery from './pages/Gallery.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import NotFound from './pages/NotFound.jsx'

export default function AppRoutes() {
  return (
    <LangProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:slug" element={<DestinationDetail />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/plan-your-trip" element={<PlanTrip />} />
          <Route path="/travel-essentials" element={<Essentials />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </LangProvider>
  )
}
