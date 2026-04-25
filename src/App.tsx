import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Resources from './pages/Resources'
import Articles from './pages/Articles'
import Article from './pages/Article'
import Experience from './pages/Experience'
import HowIWork from './pages/HowIWork'
import Projects from './pages/Projects'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function App() {
  return (
    <HashRouter>
      <div className="bg-bg min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/how-i-work" element={<HowIWork />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/articles/:slug" element={<Article />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/resources" element={<Resources />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  )
}
