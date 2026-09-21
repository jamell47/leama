import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight, Phone, MapPin, Clock } from 'lucide-react'
import { contact, sunset } from '../assets'
import { useParallax } from '../hooks/useAnimations'
import Glass from '../Glass'
import SectionHeading from './SectionHeading'
import Button from './Button'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)
  const parallaxRef = useParallax(0.12)

  const handleSubmit = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const subject = encodeURIComponent(`Leema Tech enquiry: ${data.get('topic')}`)
    const body = encodeURIComponent(`Name: ${data.get('name')}\nEmail: ${data.get('email')}\nPhone: ${data.get('phone')}\nTopic: ${data.get('topic')}\n\n${data.get('message')}`)
    setSubmitted(true)
    window.location.href = `mailto:info@leematech.co.ke?subject=${subject}&body=${body}`
    event.currentTarget.reset()
  }

  return (
    <section className="contact farm-section" id="contact">
      <div className="contact-media" ref={parallaxRef} aria-hidden="true">
        <picture>
          <source srcSet={sunset} type="image/webp" />
          <img src={contact} alt="Agricultural landscape at sunset" />
        </picture>
      </div>
      <div className="contact-light" aria-hidden="true" />
      <div className="contact-wash" aria-hidden="true" />

      <div className="container contact-layout">
        <motion.div
          className="contact-content"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeading eyebrow="10 / Start a conversation" copy="Have an idea, a farm or a challenge to work through? We would like to hear from you." delay={0.08}>
            <>Let&apos;s build the<br /><em>future of agriculture.</em></>
          </SectionHeading>

          <div className="contact-actions">
            <Button variant="primary" size="lg" icon="Phone" href="tel:+254757676006" magnetic>Call</Button>
            <Button variant="primary" size="lg" icon="MessageSquare" href="https://wa.me/254757676006?text=Hello%20Leema%20Tech%20Farm%20Solutions%2C%20I%27d%20like%20to%20discuss%20an%20agricultural%20project." target="_blank" rel="noreferrer" magnetic>WhatsApp</Button>
            <Button variant="glass" size="lg" icon="Mail" href="mailto:info@leematech.co.ke" magnetic>Send Message</Button>
          </div>

          <motion.div
            className="contact-info"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <a className="info-item" href="tel:+254757676006">
              <span className="info-icon"><Phone size={20} aria-hidden="true" /></span>
              <span><strong>Call us</strong><small>+254 757 676 006</small></span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a
              className="info-item"
              href="https://www.google.com/maps/search/?api=1&query=Leema+Tech+Farm+Solutions+Nairobi+Kenya"
              target="_blank"
              rel="noreferrer"
            >
              <span className="info-icon"><MapPin size={20} aria-hidden="true" /></span>
              <span><strong>Visit us</strong><small>Nairobi, Fedha / Embakasi, Kenya</small></span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <div className="info-item">
              <span className="info-icon"><Clock size={20} aria-hidden="true" /></span>
              <span><strong>Response time</strong><small>We respond within 24 hours</small></span>
              <ArrowUpRight size={17} aria-hidden="true" />
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="contact-form-wrapper"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.75, delay: 0.15 }}
        >
          <Glass variant="strong" blur={32} className="contact-form">
            <div className="form-heading">
              <span>01</span>
              <div>
                <h3>Send us a message</h3>
                <p>Tell us what you are growing, planning or solving.</p>
              </div>
            </div>
            <form className="form-grid" onSubmit={handleSubmit}>
              <label className="form-group">
                <span>Name *</span>
                <input type="text" name="name" required placeholder="Your name" />
              </label>
              <label className="form-group">
                <span>Email *</span>
                <input type="email" name="email" required placeholder="your@email.com" />
              </label>
              <label className="form-group">
                <span>Phone</span>
                <input type="tel" name="phone" placeholder="+254 XXX XXX XXX" />
              </label>
              <label className="form-group">
                <span>Topic *</span>
                <select name="topic" required defaultValue="">
                  <option value="" disabled>Select a topic</option>
                  <option>Agribusiness Consultancy</option>
                  <option>Farm Infrastructure</option>
                  <option>Farm Management</option>
                  <option>Training & Agri-Tours</option>
                  <option>Digital Agriculture</option>
                  <option>Other</option>
                </select>
              </label>
              <label className="form-group full-width">
                <span>Message *</span>
                <textarea name="message" rows="5" required placeholder="Tell us about your project..." />
              </label>
              <Button type="submit" variant="primary" size="lg" icon="Send" className="form-submit">
                {submitted ? 'Message prepared' : 'Send Message'}
              </Button>
              {submitted && (
                <motion.p
                  className="form-success"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  role="status"
                >
                  Thank you. We will be in touch soon.
                </motion.p>
              )}
            </form>
          </Glass>

          <div className="contact-form-decoration" aria-hidden="true">
            <motion.img
              src={sunset}
              alt=""
              className="decoration-img"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 0.12, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  )
}