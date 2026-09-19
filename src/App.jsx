import FarmBackground from './components/FarmBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import About from './components/About'
import Services from './components/Services'
import FocusAreas from './components/FocusAreas'
import FruitFarming from './components/FruitFarming'
import Marketplace from './components/Marketplace'
import Infrastructure from './components/Infrastructure'
import Statistics from './components/Statistics'
import Approach from './components/Approach'
import TargetClients from './components/TargetClients'
import WhyLeemaTech from './components/WhyLeemaTech'
import JoinCTA from './components/JoinCTA'
import Contact from './components/Contact'
import Footer from './components/Footer'
import CustomCursor from './components/CustomCursor'
import ScrollProgress from './components/ScrollProgress'

function App() {
  return (
    <>
      {/* ONE WORLD: farm.png, fixed behind the entire document. */}
      <FarmBackground />

      <div className="website-content">
        <CustomCursor />
        <ScrollProgress />
        <Navbar />
        <main id="main-content">
          <Hero />
          <Features />
          <About />
          <Services />
          <FocusAreas />
          <FruitFarming />
          <Marketplace />
          <Infrastructure />
          <Statistics />
          <Approach />
          <TargetClients />
          <WhyLeemaTech />
          <JoinCTA />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  )
}

export default App