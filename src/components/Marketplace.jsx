import SectionHeading from './SectionHeading'

export default function Marketplace() {
  return (
    <section className="marketplace-section" id="marketplace">
      <div className="container">
        <SectionHeading
          eyebrow="04 / Shop"
          lines={['A stronger link', 'between farms and buyers']}
          copy="Our shop connects farm output with the right demand, helping agricultural businesses reach better, more transparent market channels."
        />
      </div>
    </section>
  )
}
