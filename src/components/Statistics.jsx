const stats = [
  { label: 'Years of field experience', value: '10+' },
  { label: 'Farm systems supported', value: '120+' },
  { label: 'Regions reached', value: '47' },
  { label: 'Growth focus', value: 'Sustainable' },
]

export default function Statistics() {
  return (
    <section className="statistics-section">
      <div className="container">
        <div className="stats-grid">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item">
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
