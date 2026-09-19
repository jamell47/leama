import SectionHeading from './SectionHeading'

const varieties = ['Avocado', 'Citrus', 'Mangoes', 'Apples']

export default function FruitFarming() {
  return (
    <section className="fruit-farming-section" id="fruit-farming">
      <div className="container">
        <SectionHeading
          eyebrow="03 / Fruit farming"
          lines={['High-value orchard', 'enterprise design']}
          copy="From orchard planning to long-term productivity, we design fruit systems around agronomic fit, water access and market return."
        />

        <div className="fruit-grid">
          {varieties.map((item) => (
            <div key={item} className="fruit-item">
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
