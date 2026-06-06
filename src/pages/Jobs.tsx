import { FC, useState } from 'react'
import Navigation from '../components/Navigation'

const jobList = [
  { id:1, title:'Mathematics Teacher', school:'Delhi Public School', location:'New Delhi', type:'Full-time', salary:'₹35,000–₹50,000/mo', posted:'2 days ago', subject:'Mathematics' },
  { id:2, title:'Science Teacher (Physics)', school:'Kendriya Vidyalaya', location:'Mumbai', type:'Full-time', salary:'₹30,000–₹45,000/mo', posted:'3 days ago', subject:'Science' },
  { id:3, title:'English Language Teacher', school:'Ryan International School', location:'Bangalore', type:'Part-time', salary:'₹20,000–₹30,000/mo', posted:'1 week ago', subject:'English' },
  { id:4, title:'Computer Science Teacher', school:'Amity International', location:'Noida', type:'Full-time', salary:'₹40,000–₹60,000/mo', posted:'5 days ago', subject:'Computer Science' },
  { id:5, title:'Primary School Teacher', school:'Springdales School', location:'Pune', type:'Full-time', salary:'₹25,000–₹35,000/mo', posted:'Today', subject:'Primary' },
]

const subjectEmoji: Record<string, string> = {
  Mathematics: '🔢', Science: '🔬', English: '📝', 'Computer Science': '💻', Primary: '🌱',
}

const Jobs: FC = () => {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('')

  const filtered = jobList.filter(j =>
    (j.title.toLowerCase().includes(search.toLowerCase()) ||
     j.school.toLowerCase().includes(search.toLowerCase()) ||
     j.location.toLowerCase().includes(search.toLowerCase())) &&
    (filter === '' || j.type.toLowerCase().replace('-', '') === filter.replace('-', ''))
  )

  return (
    <div>
      <Navigation />

      <div className="page-header">
        <div className="page-header-content">
          <div className="breadcrumb"><span>Job Portal</span></div>
          <h1>💼 Teaching Job Portal</h1>
          <p>🏫 Browse verified teaching vacancies from top schools and colleges across India</p>
        </div>
      </div>

      <main>
        <div className="container">

          {/* Search Bar */}
          <div className="card mb-3">
            <div className="card-p" style={{ paddingBottom: '1rem' }}>
              <div style={{ display:'flex', gap:'1rem', flexWrap:'wrap', marginBottom:'.75rem' }}>
                <div style={{ flex:1, minWidth:'220px', display:'flex', alignItems:'center', background:'var(--bg)', border:'1.5px solid var(--border-dark)', borderRadius:'var(--radius-sm)', padding:'.6rem 1rem', gap:'.5rem' }}>
                  <span>🔍</span>
                  <input
                    type="search"
                    placeholder="Search by subject, school, or location..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    style={{ flex:1, border:'none', outline:'none', background:'transparent', fontSize:'.9rem' }}
                  />
                </div>
                <select
                  value={filter}
                  onChange={e => setFilter(e.target.value)}
                  style={{ padding:'.65rem 1rem', border:'1.5px solid var(--border-dark)', borderRadius:'var(--radius-sm)', fontSize:'.88rem', background:'var(--bg-card)' }}
                >
                  <option value="">📋 All Types</option>
                  <option value="full-time">🕐 Full-time</option>
                  <option value="part-time">🕓 Part-time</option>
                </select>
                <button className="btn btn-primary">🔍 Search</button>
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:'.82rem', color:'var(--text-light)' }}>
                <span>📌 {filtered.length} positions found</span>
                <span>🔄 Updated today</span>
              </div>
            </div>
          </div>

          {/* Job Cards */}
          <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
            {filtered.map(job => (
              <div key={job.id} className="card mb-0" style={{ cursor:'pointer' }}>
                <div className="card-p" style={{ display:'flex', alignItems:'center', justifyContent:'space-between', flexWrap:'wrap', gap:'1rem' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'1rem' }}>
                    <div style={{ width:'52px', height:'52px', borderRadius:'12px', background:'linear-gradient(135deg, var(--navy-dark), var(--navy-mid))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.5rem', flexShrink:0 }}>
                      {subjectEmoji[job.subject] ?? '📚'}
                    </div>
                    <div>
                      <div style={{ fontWeight:700, fontSize:'1rem', color:'var(--navy-dark)', marginBottom:'.2rem' }}>{job.title}</div>
                      <div style={{ fontSize:'.85rem', color:'var(--text-mid)' }}>🏫 {job.school} &nbsp;·&nbsp; 📍 {job.location}</div>
                    </div>
                  </div>
                  <div style={{ display:'flex', flexDirection:'column', alignItems:'flex-end', gap:'.4rem' }}>
                    <span className={`badge ${job.type === 'Full-time' ? 'badge-navy' : 'badge-green'}`}>
                      {job.type === 'Full-time' ? '🕐' : '🕓'} {job.type}
                    </span>
                    <span style={{ fontSize:'.82rem', color:'var(--green-dark)', fontWeight:600 }}>💰 {job.salary}</span>
                    <span style={{ fontSize:'.75rem', color:'var(--text-muted)' }}>🕒 {job.posted}</span>
                  </div>
                </div>
                <div style={{ borderTop:'1px solid var(--border)', padding:'.75rem 1.5rem', display:'flex', gap:'.75rem' }}>
                  <button className="btn btn-primary btn-sm">✅ Apply Now</button>
                  <button className="btn btn-outline btn-sm">🔖 Save Job</button>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="card">
                <div className="empty-state">
                  <div className="empty-state-icon">🔍</div>
                  <p>No jobs found matching your search. Try different keywords.</p>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  )
}

export default Jobs
