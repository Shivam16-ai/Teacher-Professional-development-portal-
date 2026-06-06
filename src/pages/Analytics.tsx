import { FC } from 'react'
import Navigation from '../components/Navigation'

const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
const attendance = ['present','active','present','absent','present','active','empty']

const Analytics: FC = () => {
  return (
    <div>
      <Navigation />

      <div className="page-header">
        <div className="page-header-content">
          <div className="breadcrumb"><span>Analytics</span></div>
          <h1>📊 Performance Analytics</h1>
          <p>📈 Track your professional growth, quiz performance, and engagement metrics</p>
        </div>
      </div>

      <main>
        <div className="container">

          {/* Stats Row */}
          <div className="stats-row">
            <div className="stat-widget">
              <div className="stat-widget-icon gold">⭐</div>
              <div className="stat-widget-info">
                <h3>0</h3><p>Total XP Earned</p>
                <span className="stat-change">↑ Keep earning!</span>
              </div>
            </div>
            <div className="stat-widget">
              <div className="stat-widget-icon navy">🎯</div>
              <div className="stat-widget-info">
                <h3>78%</h3><p>Avg Quiz Score</p>
                <span className="stat-change">↑ Above average</span>
              </div>
            </div>
            <div className="stat-widget">
              <div className="stat-widget-icon green">🔥</div>
              <div className="stat-widget-info">
                <h3>12</h3><p>Day Streak</p>
                <span className="stat-change">↑ Keep it up!</span>
              </div>
            </div>
            <div className="stat-widget">
              <div className="stat-widget-icon purple">⏱️</div>
              <div className="stat-widget-info">
                <h3>36h</h3><p>Learning Time</p>
                <span className="stat-change">↑ This month</span>
              </div>
            </div>
          </div>

          {/* Charts Row */}
          <div className="two-col">
            <div>
              {/* Quiz Performance */}
              <div className="card mb-3">
                <div className="card-header">
                  <h3 className="card-title">🧠 Quiz Performance</h3>
                </div>
                <div className="card-p">
                  {[
                    { label: 'Pedagogy Quiz', score: 85, color: 'navy' },
                    { label: 'ICT Integration', score: 72, color: 'green' },
                    { label: 'Child Psychology', score: 90, color: 'gold' },
                    { label: 'Curriculum Design', score: 65, color: 'purple' },
                  ].map(q => (
                    <div key={q.label} style={{ marginBottom: '1rem' }}>
                      <div className="progress-label">
                        <span>{q.label}</span><span>{q.score}%</span>
                      </div>
                      <div className="progress-track">
                        <div className={`progress-fill ${q.color}`} style={{ width: `${q.score}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attendance */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">📅 Platform Attendance</h3>
                </div>
                <div className="card-p">
                  <div className="attendance-grid">
                    {days.map((d, i) => (
                      <div key={d} style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '.7rem', color: 'var(--text-muted)', marginBottom: '.3rem' }}>{d}</div>
                        <div className={`attendance-day ${attendance[i]}`}>{attendance[i] === 'present' ? '✓' : attendance[i] === 'absent' ? '✗' : attendance[i] === 'active' ? '★' : '–'}</div>
                      </div>
                    ))}
                  </div>
                  <div className="attendance-legend">
                    <span><span className="legend-dot" style={{ background: 'var(--green)' }}></span>Present</span>
                    <span><span className="legend-dot" style={{ background: 'var(--red)' }}></span>Absent</span>
                    <span><span className="legend-dot" style={{ background: 'var(--navy)' }}></span>Active</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              {/* Skill Distribution */}
              <div className="card mb-3">
                <div className="card-header">
                  <h3 className="card-title">🎯 Skill Distribution</h3>
                </div>
                <div className="card-p">
                  {[
                    { label: 'Subject Knowledge', pct: 82, color: 'navy' },
                    { label: 'Pedagogy Skills',   pct: 68, color: 'gold' },
                    { label: 'Digital Teaching',  pct: 55, color: 'green' },
                    { label: 'Communication',     pct: 74, color: 'purple' },
                  ].map(s => (
                    <div key={s.label} style={{ marginBottom: '1rem' }}>
                      <div className="progress-label">
                        <span>{s.label}</span><span>{s.pct}%</span>
                      </div>
                      <div className="progress-track">
                        <div className={`progress-fill ${s.color}`} style={{ width: `${s.pct}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Monthly XP Growth */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">📈 Monthly XP Growth</h3>
                </div>
                <div className="card-p">
                  {[
                    { month: 'Jan', xp: 120 }, { month: 'Feb', xp: 180 },
                    { month: 'Mar', xp: 95 },  { month: 'Apr', xp: 220 },
                    { month: 'May', xp: 175 }, { month: 'Jun', xp: 250 },
                  ].map(m => (
                    <div key={m.month} style={{ display: 'flex', alignItems: 'center', gap: '.75rem', marginBottom: '.75rem' }}>
                      <span style={{ width: '30px', fontSize: '.78rem', color: 'var(--text-light)', fontWeight: 600 }}>{m.month}</span>
                      <div className="progress-track" style={{ flex: 1 }}>
                        <div className="progress-fill gold" style={{ width: `${(m.xp / 250) * 100}%` }}></div>
                      </div>
                      <span style={{ fontSize: '.78rem', fontWeight: 700, color: 'var(--gold-dark)', width: '35px', textAlign: 'right' }}>{m.xp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Achievements */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">🏅 Achievements</h3>
            </div>
            <div className="card-p">
              <div className="achievements-grid">
                {[
                  { icon: '🏆', name: 'First Quiz',    desc: 'Completed first quiz',    unlocked: true },
                  { icon: '📚', name: 'Course Starter', desc: 'Enrolled in first course', unlocked: true },
                  { icon: '💼', name: 'Job Seeker',    desc: 'Applied for first job',    unlocked: true },
                  { icon: '⭐', name: 'XP Hunter',     desc: 'Earned 500+ XP',           unlocked: false },
                  { icon: '🔒', name: 'Quiz Master',   desc: 'Complete 10 quizzes',      unlocked: false },
                  { icon: '🔒', name: 'Course Hero',   desc: 'Complete 5 courses',       unlocked: false },
                ].map(a => (
                  <div key={a.name} className={`achievement-card ${a.unlocked ? 'unlocked' : 'locked'}`}>
                    <div className="achievement-icon">{a.icon}</div>
                    <div className="achievement-name">{a.name}</div>
                    <div className="achievement-desc">{a.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default Analytics
