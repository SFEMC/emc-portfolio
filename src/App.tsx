import { HashRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Resources from './pages/Resources'
import Navbar from './components/Navbar'

export default function App() {
  return (
    <HashRouter>
      <div className="bg-bg min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/resources" element={<Resources />} />
        </Routes>
      </div>
    </HashRouter>
  )
}
