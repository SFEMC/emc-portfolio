import Hero from '../components/Hero'
import About from '../components/About'
import Capabilities from '../components/Capabilities'
import Experience from '../components/Experience'
import Contact from '../components/Contact'

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Capabilities />
      {/* <Achievements /> */}
      <Experience />
      <Contact />
    </>
  )
}
