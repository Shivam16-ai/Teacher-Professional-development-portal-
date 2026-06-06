import { FC } from 'react'
import Navigation from '../components/Navigation'

const Reports: FC = () => {
  return (
    <div>
      <Navigation />

      <div className="page-header">
        <div className="page-header-content">
          <div className="breadcrumb"><span>Reports</span></div>
          <h1>📊 Performance Reports</h1>
          <p>📈 Comprehensive analysis of your teaching performance and progress</p>
        </div>
      </div>

      <main>
        <div className="container">

          {/* Stats */}
          <div className="stats-row">
            <div className="stat-widget">
              <div className="stat-widget-icon gold">📊</div>
              <div className="stat-widget-info"><h3>87%</h3><p>Avg Performance</p><span className="stat-change">↑ +5% this term</span></div>
            </div>
            <div className="stat-widget">
              <div className="stat-widget-icon navy">⭐</div>
              <div className="stat-widget-info"><h3>4.2/5</h3><p>Student Rating</p><span className="stat-change">↑ Excellent</span></div>
            </div>
            <div className="stat-widget">
              <div className="stat-widget-icon green">🏫</div>
              <div className="stat-widget-info"><h3>28</h3><p>Classes Taught</p><span className="stat-change">↑ This month</span></div>
            </div>
            <div className="stat-widget">
              <div className="stat-widget-icon purple">🏆</div>
              <div className="stat-widget-info"><h3>5</h3><p>Achievements</p><span className="stat-change">↑ Keep going!</span></div>
            </div>
          </div>

          <div className="two-col">
            <div>
              {/* GPA Report */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">🎓 GPA Report</h3>
                  <span className="badge badge-green">📈 Improving</span>
                </div>
                <div className="card-p">
                  {[
                    { label:'📚 Overall GPA', value:'3.8 / 4.0', pct:95, color:'gold' },
                    { label:'📝 Term GPA',    value:'3.9 / 4.0', pct:97, color:'green' },
                  ].map(r => (
                    <div key={r.label} style={{ marginBottom:'1rem' }}>
                      <div className="progress-label"><span>{r.label}</span><span style={{ fontWeight:700 }}>{r.value}</span></div>
                      <div className="progress-track"><div className={`progress-fill ${r.color}`} style={{ width:`${r.pct}%` }}></div></div>
                    </div>
                  ))}
                  <div className="detail-item" style={{ marginTop:'.5rem' }}>📈 <strong>Trend:</strong> Increasing +0.2 this term</div>
                </div>
              </div>

              {/* Class Rank */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">🏅 Class Rank</h3>
                  <span className="badge badge-gold">🥇 Top 10%</span>
                </div>
                <div className="card-p">
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }}>
                    {[
                      { label:'🏆 Your Rank', value:'Top 10%' },
                      { label:'🎯 Class Rank', value:'Top 5%' },
                      { label:'👥 Peers Ranked', value:'240' },
                      { label:'📊 Percentile', value:'95th' },
                    ].map(s => (
                      <div key={s.label} className="detail-item" style={{ flexDirection:'column', alignItems:'flex-start', gap:'.2rem' }}>
                        <span style={{ fontSize:'.75rem', color:'var(--text-light)' }}>{s.label}</span>
                        <span style={{ fontWeight:700, color:'var(--navy-dark)', fontSize:'1.1rem' }}>{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div>
              {/* Attendance */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">📅 Attendance Report</h3>
                  <span className="badge badge-green">✅ 96%</span>
                </div>
                <div className="card-p">
                  <div style={{ marginBottom:'1rem' }}>
                    <div className="progress-label"><span>📅 Classes Attended</span><span>48 / 50</span></div>
                    <div className="progress-track"><div className="progress-fill green" style={{ width:'96%' }}></div></div>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'.75rem' }}>
                    {[
                      { label:'✅ Present', value:'48' },
                      { label:'❌ Absent',  value:'2' },
                      { label:'⏰ Late',    value:'1' },
                      { label:'📊 Rate',    value:'96%' },
                    ].map(s => (
                      <div key={s.label} className="detail-item" style={{ flexDirection:'column', alignItems:'flex-start', gap:'.2rem' }}>
                        <span style={{ fontSize:'.75rem', color:'var(--text-light)' }}>{s.label}</span>
                        <span style={{ fontWeight:700, color:'var(--navy-dark)', fontSize:'1.1rem' }}>{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Progress */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">🚀 Progress Report</h3>
                </div>
                <div className="card-p">
                  {[
                    { label:'📚 Courses Completed', pct:67, value:'8/12', color:'navy' },
                    { label:'🧠 Quizzes Passed',    pct:80, value:'8/10', color:'green' },
                    { label:'⭐ XP Goal',           pct:50, value:'250/500', color:'gold' },
                  ].map(r => (
                    <div key={r.label} style={{ marginBottom:'1rem' }}>
                      <div className="progress-label"><span>{r.label}</span><span>{r.value}</span></div>
                      <div className="progress-track"><div className={`progress-fill ${r.color}`} style={{ width:`${r.pct}%` }}></div></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Assessment Results */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">📝 Assessment Results</h3>
              <span className="badge badge-navy">15 completed</span>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>📝 Assessment</th>
                    <th>📅 Date</th>
                    <th>🎯 Score</th>
                    <th>📊 Grade</th>
                    <th>⭐ XP Earned</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name:'Pedagogy Quiz 1',    date:'May 10', score:'94/100', grade:'A+', xp:94 },
                    { name:'ICT Integration',    date:'May 15', score:'82/100', grade:'A',  xp:82 },
                    { name:'Child Psychology',   date:'May 22', score:'88/100', grade:'A',  xp:88 },
                    { name:'Curriculum Design',  date:'Jun 1',  score:'76/100', grade:'B+', xp:76 },
                  ].map(a => (
                    <tr key={a.name}>
                      <td style={{ fontWeight:600 }}>{a.name}</td>
                      <td>📅 {a.date}</td>
                      <td><strong style={{ color:'var(--navy-dark)' }}>{a.score}</strong></td>
                      <td><span className="badge badge-green">{a.grade}</span></td>
                      <td>⭐ +{a.xp} XP</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default Reports
