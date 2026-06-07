import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Home from './pages/Home'
import About from './pages/About'
import DesignAuthority from './pages/DesignAuthority'
import Resources from './pages/Resources'
import Articles from './pages/Articles'
import Article from './pages/Article'
import Projects from './pages/Projects'
// Private sections. Reachable by direct link only; not linked from any nav.
import ArtOfSystemicDesign from './pages/ArtOfSystemicDesign'
import ArtOfSystemicDesignArticle from './pages/ArtOfSystemicDesignArticle'
import EyesWideOpen from './pages/EyesWideOpen'
import EyesWideOpenEssay from './pages/EyesWideOpenEssay'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import PageTransition from './components/PageTransition'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
  }, [pathname])
  return null
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <PageTransition>
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/design-authority" element={<DesignAuthority />} />
        <Route path="/about" element={<About />} />
        <Route path="/articles" element={<Articles />} />
        <Route path="/articles/:slug" element={<Article />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/resources" element={<Resources />} />
        {/* Private sections — direct link only, noindex/nofollow, no nav entry */}
        <Route path="/art-of-systemic-design" element={<ArtOfSystemicDesign />} />
        <Route path="/art-of-systemic-design/:slug" element={<ArtOfSystemicDesignArticle />} />
        <Route path="/eyes-wide-open" element={<EyesWideOpen />} />
        <Route path="/eyes-wide-open/:slug" element={<EyesWideOpenEssay />} />
      </Routes>
    </PageTransition>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="bg-bg min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <AnimatedRoutes />
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}
