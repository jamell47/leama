import { company } from '../data/content'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <strong>{company.shortName}</strong>
          <p>{company.location}</p>
        </div>
        <nav className="footer-links" aria-label="Footer navigation">
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#services">Services</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </footer>
  )
}
