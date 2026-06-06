import { FC, useState } from 'react'
import Navigation from '../components/Navigation'

const tips = [
  { icon:'🏫', tip:'Research the school\'s vision, mission, and recent achievements before the interview.' },
  { icon:'📋', tip:'Prepare a 10-minute demo lesson on a topic relevant to the grade you\'re applying for.' },
  { icon:'📖', tip:'Review key pedagogy theories: Bloom\'s Taxonomy, Constructivism, and NEP 2020.' },
  { icon:'👔', tip:'Dress professionally and arrive 10 minutes early to show punctuality.' },
  { icon:'💬', tip:'Prepare answers for common questions: "Why teaching?", "Classroom management strategies?"' },
  { icon:'📄', tip:'Bring multiple copies of your resume, certificates, and a portfolio of lesson plans.' },
]

const Interview: FC = () => {
  const [showTips, setShowTips] = useState(false)

  return (
    <div>
      <Navigation />

      <div className="page-header">
        <div className="page-header-content">
          <div className="breadcrumb"><span>Interviews</span></div>
          <h1>🎤 Interview Schedule</h1>
          <p>📋 Manage your upcoming teaching interviews and preparation resources</p>
        </div>
      </div>

      <main>
        <div className="container">

          {/* Tips Banner */}
          <div style={{ background:'linear-gradient(135deg, var(--navy-dark), var(--navy-mid))', borderRadius:'var(--radius)', padding:'1.5rem 2rem', marginBottom:'2rem', color:'#fff' }}>
            <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem' }}>
              <div>
                <div style={{ fontWeight:800, fontSize:'1.1rem', marginBottom:'.3rem' }}>💡 Interview Preparation Tips</div>
                <div style={{ fontSize:'.88rem', color:'rgba(255,255,255,.75)' }}>Research the school, prepare a demo lesson, and review pedagogy theories</div>
              </div>
              <button className="btn btn-gold btn-sm" onClick={() => setShowTips(!showTips)}>
                {showTips ? '🔼 Hide Tips' : '📖 View Tips'}
              </button>
            </div>
            {showTips && (
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(260px, 1fr))', gap:'1rem', marginTop:'1.25rem' }}>
                {tips.map((t, i) => (
                  <div key={i} style={{ background:'rgba(255,255,255,.1)', borderRadius:'var(--radius-sm)', padding:'1rem', display:'flex', gap:'.75rem', alignItems:'flex-start' }}>
                    <span style={{ fontSize:'1.4rem', flexShrink:0 }}>{t.icon}</span>
                    <span style={{ fontSize:'.85rem', color:'rgba(255,255,255,.9)', lineHeight:1.5 }}>{t.tip}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="two-col">
            {/* Upcoming */}
            <div>
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">📅 Upcoming Interviews</h3>
                  <span className="badge badge-navy">0 scheduled</span>
                </div>
                <div className="card-p">
                  <div className="empty-state">
                    <div className="empty-state-icon">📅</div>
                    <p>No upcoming interviews scheduled. Apply for jobs to get interview calls!</p>
                  </div>
                  <button className="btn btn-primary btn-full btn-sm" style={{ marginTop:'1rem' }}>
                    💼 Browse Jobs
                  </button>
                </div>
              </div>
            </div>

            {/* Past */}
            <div>
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">✅ Past Interviews</h3>
                  <span className="badge badge-outline">0 recorded</span>
                </div>
                <div className="card-p">
                  <div className="empty-state">
                    <div className="empty-state-icon">🗂️</div>
                    <p>No past interviews recorded yet.</p>
                  </div>
                </div>
              </div>

              {/* Quick Prep */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">🚀 Quick Prep Resources</h3>
                </div>
                <div className="card-p">
                  {[
                    { icon:'📖', label:'Pedagogy Quiz',       desc:'Test your teaching knowledge' },
                    { icon:'📄', label:'Build Your Resume',   desc:'Create an ATS-friendly CV' },
                    { icon:'🤖', label:'Ask EduBot',          desc:'Get interview tips from AI' },
                  ].map(r => (
                    <div key={r.label} className="detail-item" style={{ cursor:'pointer' }}>
                      <span style={{ fontSize:'1.3rem' }}>{r.icon}</span>
                      <div>
                        <div style={{ fontWeight:600, fontSize:'.88rem', color:'var(--navy-dark)' }}>{r.label}</div>
                        <div style={{ fontSize:'.78rem', color:'var(--text-light)' }}>{r.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default Interview
