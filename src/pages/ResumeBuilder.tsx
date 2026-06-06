import { FC, useState } from 'react'
import Navigation from '../components/Navigation'

const ResumeBuilder: FC = () => {
  const [form, setForm] = useState({
    name: 'Teacher User', email: 'teacher@tpdp.edu', phone: '+91 9876543210',
    subject: 'Mathematics', school: 'Example School', experience: '5 years',
    qualification: 'B.Ed, M.Sc Mathematics', summary: '',
    skills: 'Pedagogy, Digital Teaching, Classroom Management, Curriculum Design',
  })

  const set = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }))

  return (
    <div>
      <Navigation />

      <div className="page-header">
        <div className="page-header-content">
          <div className="breadcrumb"><span>Resume Builder</span></div>
          <h1>📄 Professional Resume Builder</h1>
          <p>✨ Create a polished teacher CV in minutes. Auto-filled from your TPDP profile.</p>
        </div>
      </div>

      <main>
        <div className="container">

          {/* Toolbar */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.5rem', flexWrap:'wrap', gap:'1rem' }}>
            <div className="info-box" style={{ margin:0, flex:1 }}>
              ✨ Auto-filled from your profile. Edit any field and click Download.
            </div>
            <div style={{ display:'flex', gap:'.75rem' }}>
              <button className="btn btn-outline btn-sm">👁️ Preview</button>
              <button className="btn btn-primary">⬇️ Download PDF</button>
            </div>
          </div>

          <div className="two-col">

            {/* Form */}
            <div>
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">👤 Personal Information</h3>
                </div>
                <div className="card-p">
                  <div className="form-row">
                    <div className="form-group">
                      <label>👤 Full Name *</label>
                      <input type="text" value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Priya Sharma" />
                    </div>
                    <div className="form-group">
                      <label>📧 Email Address *</label>
                      <input type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="your@email.com" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label>📱 Phone Number</label>
                      <input type="tel" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 9876543210" />
                    </div>
                    <div className="form-group">
                      <label>🎓 Qualification</label>
                      <input type="text" value={form.qualification} onChange={e => set('qualification', e.target.value)} placeholder="e.g. B.Ed, M.Sc" />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">🏫 Professional Details</h3>
                </div>
                <div className="card-p">
                  <div className="form-row">
                    <div className="form-group">
                      <label>📚 Subject Specialization</label>
                      <input type="text" value={form.subject} onChange={e => set('subject', e.target.value)} placeholder="e.g. Mathematics" />
                    </div>
                    <div className="form-group">
                      <label>⏳ Experience</label>
                      <input type="text" value={form.experience} onChange={e => set('experience', e.target.value)} placeholder="e.g. 5 years" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>🏫 Current School / Institution</label>
                    <input type="text" value={form.school} onChange={e => set('school', e.target.value)} placeholder="e.g. DAV Public School" />
                  </div>
                  <div className="form-group">
                    <label>🌟 Key Skills (comma separated)</label>
                    <input type="text" value={form.skills} onChange={e => set('skills', e.target.value)} placeholder="Pedagogy, Digital Teaching..." />
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">💼 Professional Summary</h3>
                </div>
                <div className="card-p">
                  <div className="form-group">
                    <label>📝 Summary</label>
                    <textarea
                      rows={4}
                      value={form.summary}
                      onChange={e => set('summary', e.target.value)}
                      placeholder="Brief overview of your teaching experience, philosophy, and key achievements..."
                    ></textarea>
                  </div>
                </div>
              </div>
            </div>

            {/* Preview */}
            <div>
              <div className="card" style={{ position:'sticky', top:'calc(var(--nav-h) + 1rem)' }}>
                <div className="card-header">
                  <h3 className="card-title">👁️ Live Preview</h3>
                  <span className="badge badge-green">✅ Auto-updated</span>
                </div>
                <div className="card-p">
                  <div style={{ background:'#fff', border:'1px solid var(--border)', borderRadius:'var(--radius-sm)', padding:'1.5rem', minHeight:'400px', fontFamily:'Georgia, serif' }}>
                    {/* Resume Preview */}
                    <div style={{ borderBottom:'3px solid var(--navy-dark)', paddingBottom:'1rem', marginBottom:'1rem' }}>
                      <h2 style={{ fontSize:'1.4rem', color:'var(--navy-dark)', margin:0 }}>{form.name || 'Your Name'}</h2>
                      <div style={{ color:'var(--navy-mid)', fontSize:'.85rem', marginTop:'.3rem' }}>{form.subject} Teacher · {form.experience}</div>
                      <div style={{ fontSize:'.78rem', color:'var(--text-light)', marginTop:'.3rem', display:'flex', gap:'1rem', flexWrap:'wrap' }}>
                        <span>📧 {form.email}</span>
                        <span>📱 {form.phone}</span>
                      </div>
                    </div>

                    {form.summary && (
                      <div style={{ marginBottom:'1rem' }}>
                        <div style={{ fontSize:'.78rem', fontWeight:700, color:'var(--navy-dark)', textTransform:'uppercase', letterSpacing:'.5px', marginBottom:'.4rem' }}>📝 Summary</div>
                        <p style={{ fontSize:'.82rem', color:'var(--text-mid)', lineHeight:1.6 }}>{form.summary}</p>
                      </div>
                    )}

                    <div style={{ marginBottom:'1rem' }}>
                      <div style={{ fontSize:'.78rem', fontWeight:700, color:'var(--navy-dark)', textTransform:'uppercase', letterSpacing:'.5px', marginBottom:'.4rem' }}>🏫 Experience</div>
                      <div style={{ fontSize:'.82rem', color:'var(--text-mid)' }}>
                        <strong>{form.subject} Teacher</strong> · {form.school}<br />
                        <span style={{ color:'var(--text-muted)' }}>{form.experience} of experience</span>
                      </div>
                    </div>

                    <div style={{ marginBottom:'1rem' }}>
                      <div style={{ fontSize:'.78rem', fontWeight:700, color:'var(--navy-dark)', textTransform:'uppercase', letterSpacing:'.5px', marginBottom:'.4rem' }}>🎓 Education</div>
                      <div style={{ fontSize:'.82rem', color:'var(--text-mid)' }}>{form.qualification}</div>
                    </div>

                    {form.skills && (
                      <div>
                        <div style={{ fontSize:'.78rem', fontWeight:700, color:'var(--navy-dark)', textTransform:'uppercase', letterSpacing:'.5px', marginBottom:'.4rem' }}>🌟 Skills</div>
                        <div style={{ display:'flex', flexWrap:'wrap', gap:'.4rem' }}>
                          {form.skills.split(',').map(s => s.trim()).filter(Boolean).map(s => (
                            <span key={s} style={{ background:'var(--navy-faint)', color:'var(--navy-mid)', padding:'.2rem .6rem', borderRadius:'99px', fontSize:'.72rem', fontWeight:600 }}>{s}</span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}

export default ResumeBuilder
