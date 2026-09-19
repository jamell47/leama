import SectionHeading from './SectionHeading'

const featureCards = [
  {
    title: 'Agribusiness Advisory',
    text: 'Feasibility, enterprise design and investment-ready plans tailored to the realities of Kenyan agriculture.',
  },
  {
    title: 'Farm Systems',
    text: 'Water, structures, energy and production systems built to work in practice and scale over time.',
  },
  {
    title: 'Field Support',
    text: 'Operational guidance, management routines and implementation oversight that keep projects moving.',
  },
]

export default function Features() {
  return (
    <section className="features-section" id="features">
      <div className="container">
        <SectionHeading
          eyebrow="01 / Our edge"
          lines={['Smart systems', 'for productive farms']}
          copy="Leema Tech brings agribusiness planning, farm infrastructure and operational know-how together in one grounded approach."
        />

        <div className="features-grid">
          {featureCards.map((feature) => (
            <article key={feature.title} className="feature-card glass-card">
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
