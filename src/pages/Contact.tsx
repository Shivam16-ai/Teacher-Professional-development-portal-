import { FC, useState } from 'react'
import Navigation from '../components/Navigation'

const faqs = [
  { q: 'Is TPDP completely free to use?', a: 'Yes! TPDP is 100% free for all teachers. Create an account, browse jobs, take courses, and participate in quizzes at no cost.' },
  { q: 'How do I earn XP points?', a: 'Earn XP by taking quizzes (score × 1 XP), enrolling in courses (+100 XP), applying for jobs (+50 XP), and completing courses (+500 XP).' },
  { q: 'Are the job listings verified?', a: 'Yes, all job listings on TPDP are manually verified by our team before posting. We partner directly with schools and educational institutions across India.' },
  { q: 'Do courses provide certificates?', a: "Yes! Completing any course gives you a digital certificate that you can download and add to your resume or LinkedIn profile." },
  { q: 'How is my data stored?', a: "Your profile data is stored securely in your browser's local storage. No personal information is sent to external servers in this demo version." },
  { q: 'Can I use TPDP on mobile?', a: 'Absolutely! TPDP is fully responsive and works perfectly on smartphones and tablets.' },
  { q: 'How do I reset my password?', a: 'Since data is stored locally, you can re-register with the same email. For production systems, a password reset email flow would be available.' },
  { q: 'How do I submit a school partnership?', a: 'Schools and institutions can reach us via email at partnerships@tpdp.edu.in. We offer free job posting for verified educational institutions.' },
]

const Contact: FC = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 4000)
    setForm({ name: '', email: '', subject: '', message: '' })
  }

  return (
    <div>
      <Navigation />

      <div className="page-header">
        <div className="page-header-content">
          <div className="breadcrumb"><span>Contact</span></div>
          <h1>📬 Contact Us</h1>
          <p>🤝 We're here to help. Reach out to the TPDP team anytime.</p>
        </div>
      </div>

      <main>
        <div className="container">

          {/* Top Grid: Form + Info */}
          <div className="contact-grid mb-3">
            {/* Form */}
            <div className="card mb-0">
              <div className="card-header">
                <h3 className="card-title"><i className="fas fa-paper-plane"></i> ✉️ Send Us a Message</h3>
              </div>
              <div className="card-p">
                {submitted && (
                  <div className="success-box">
                    <i className="fas fa-check-circle"></i> Thank you! We'll get back to you within 24 hours.
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="form-row">
                    <div className="form-group">
                      <label>Your Name *</label>
                      <input type="text" name="name" placeholder="e.g. Priya Sharma" value={form.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input type="email" name="email" placeholder="your@email.com" value={form.email} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Subject *</label>
                    <select name="subject" value={form.subject} onChange={handleChange} required>
                      <option value="">Select a topic</option>
                      <option>Job Portal Issue</option>
                      <option>Course Enrollment Help</option>
                      <option>Quiz Problem</option>
                      <option>Account Issue</option>
                      <option>Feature Request</option>
                      <option>Partnership Inquiry</option>
                      <option>General Feedback</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Message *</label>
                    <textarea name="message" placeholder="Describe your issue or question in detail..." rows={5} value={form.message} onChange={handleChange} required></textarea>
                  </div>
                  <button type="submit" className="btn btn-primary btn-full">
                    <i className="fas fa-paper-plane"></i> Send Message
                  </button>
                </form>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <div className="card mb-3">
                <div className="card-header">
                  <h3 className="card-title">📞 Contact Information</h3>
                </div>
                <div className="card-p">
                  <div className="contact-info-item">
                    <div className="contact-info-icon"><i className="fas fa-envelope"></i></div>
                    <div className="contact-info-text">
                      <h4>Email</h4>
                      <p>support@tpdp.edu.in</p>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-info-icon"><i className="fas fa-phone"></i></div>
                    <div className="contact-info-text">
                      <h4>Phone</h4>
                      <p>+91 1800-TPDP-HELP</p>
                    </div>
                  </div>
                  <div className="contact-info-item">
                    <div className="contact-info-icon"><i className="fas fa-clock"></i></div>
                    <div className="contact-info-text">
                      <h4>Support Hours</h4>
                      <p>Mon–Fri, 9 AM – 6 PM IST</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title"><i className="fas fa-question-circle"></i> Frequently Asked Questions</h3>
            </div>
            <div className="card-p">
              {faqs.map((faq, i) => (
                <div key={i} className="faq-item">
                  <button
                    className={`faq-question ${openFaq === i ? 'open' : ''}`}
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    {faq.q}
                    <i className="fas fa-chevron-down"></i>
                  </button>
                  {openFaq === i && <div className="faq-answer">{faq.a}</div>}
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default Contact
