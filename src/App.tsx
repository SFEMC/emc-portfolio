import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Resources from './pages/Resources'
import Articles from './pages/Articles'
import Article from './pages/Article'
import Experience from './pages/Experience'
import Projects from './pages/Projects'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <HashRouter>
      <div className="bg-bg min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/articles" element={<Articles />} />
          <Route path="/articles/:slug" element={<Article />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </div>
    </HashRouter>
  )
}
