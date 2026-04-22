import Hero from '../components/Hero'
import Principles from '../components/Principles'
import Capabilities from '../components/Capabilities'
import Disciplines from '../components/Disciplines'
import SelectedWork from '../components/SelectedWork'
import LatestWriting from '../components/LatestWriting'
import About from '../components/About'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <Principles />
      <Capabilities />
      <Disciplines />
      <SelectedWork />
      <LatestWriting />
      <About />
      <Contact />
    </>
  )
}
