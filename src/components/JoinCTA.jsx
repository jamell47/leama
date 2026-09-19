import { whatsappLink, company } from '../data/content'
import Button from './Button'

export default function JoinCTA() {
  return (
    <section className="join-cta-section" id="join">
      <div className="container">
        <div className="join-cta-box">
          <div>
            <p className="eyebrow">11 / Join the community</p>
            <h2>Let’s build the next productive farm system.</h2>
          </div>
          <div className="join-cta-actions">
            <Button variant="green" href="/marketplace">
              Marketplace
            </Button>
            <Button variant="primary" href={whatsappLink()}>
              Talk to Leema Tech
            </Button>
            <Button variant="glass" href="mailto:hello@leematech.co.ke">
              Email us
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
