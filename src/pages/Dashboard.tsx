import { FC, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navigation from '../components/Navigation'

const Dashboard: FC = () => {
  const [stats, setStats] = useState({ xp: 0, courses: 0, quizzes: 0, jobs: 0 })
  const [userLevel] = useState(1)

  useEffect(() => {
    setStats({ xp: 250, courses: 3, quizzes: 5, jobs: 2 })
  }, [])

  const quickLinks = [
    { to:'/jobs',          icon:'💼', label:'Job Portal' },
    { to:'/courses',       icon:'📚', label:'Courses' },
    { to:'/quizzes',       icon:'🧠', label:'Quizzes' },
    { to:'/resume-builder',icon:'📄', label:'Resume' },
    { to:'/leaderboard',   icon:'🏆', label:'Leaderboard' },
    { to:'/chatbot',       icon:'🤖', label:'AI Chatbot' },
    { to:'/analytics',     icon:'📊', label:'Analytics' },
    { to:'/timetable',     icon:'📅', label:'Timetable' },
  ]

  return (
    <div>
      <Navigation />

      {/* Header Banner */}
      <div className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div>
              <div className="header-title">🌅 Good Morning! 👋</div>
              <div className="header-subtitle">📊 Here's your professional development summary</div>
            </div>
            <div className="header-actions">
              <Link to="/courses" className="btn btn-ghost btn-sm">📚 Browse Courses</Link>
              <Link to="/jobs"    className="btn btn-ghost btn-sm">💼 Find Jobs</Link>
              <Link to="/quizzes" className="btn btn-gold  btn-sm">🧠 Take Quiz</Link>
            </div>
          </div>
        </div>
      </div>

      <main>
        <div className="container">

          {/* Stat Widgets */}
          <div className="stats-row">
            <div className="stat-widget">
              <div className="stat-widget-icon gold">⭐</div>
              <div className="stat-widget-info">
                <h3>{stats.xp}</h3><p>Total XP Earned</p>
                <span className="stat-change">↑ Keep earning!</span>
              </div>
            </div>
            <div className="stat-widget">
              <div className="stat-widget-icon navy">📚</div>
              <div className="stat-widget-info">
                <h3>{stats.courses}</h3><p>Courses Enrolled</p>
                <span className="stat-change">↑ +3 this month</span>
              </div>
            </div>
            <div className="stat-widget">
              <div className="stat-widget-icon green">🧠</div>
              <div className="stat-widget-info">
                <h3>{stats.quizzes}</h3><p>Quizzes Taken</p>
                <span className="stat-change">↑ Keep practicing!</span>
              </div>
            </div>
            <div className="stat-widget">
              <div className="stat-widget-icon purple">💼</div>
              <div className="stat-widget-info">
                <h3>{stats.jobs}</h3><p>Jobs Applied</p>
                <span className="stat-change">↑ Active applicant</span>
              </div>
            </div>
          </div>

          {/* Two Column */}
          <div className="two-col">
            <div>
              {/* Level Progress */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">🏆 Level Progress</h3>
                  <span className="badge badge-navy">🎯 Level {userLevel}</span>
                </div>
                <div className="card-p">
                  <div className="progress-label">
                    <span>⚡ XP Progress</span><span>{stats.xp} / 500 XP</span>
                  </div>
                  <div className="progress-track">
                    <div className="progress-fill gold" style={{ width:`${(stats.xp/500)*100}%` }}></div>
                  </div>
                  <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'.75rem', marginTop:'1.25rem' }}>
                    {[['🥇','First Quiz'],['📚','Enrolled'],['💼','Applied']].map(([icon,label]) => (
                      <div key={label} style={{ textAlign:'center', padding:'.75rem', background:'var(--bg)', borderRadius:'var(--radius-sm)', border:'1px solid var(--border)' }}>
                        <div style={{ fontSize:'1.4rem' }}>{icon}</div>
                        <div style={{ fontSize:'.72rem', color:'var(--text-light)', marginTop:'.3rem', fontWeight:600 }}>{label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* My Skills */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">🌟 My Skills</h3>
                  <Link to="/profile" className="card-link">✏️ Edit →</Link>
                </div>
                <div className="card-p">
                  <div className="skill-tags mb-2">
                    <span className="skill-tag">🎓 Pedagogy</span>
                    <span className="skill-tag">💻 Digital Teaching</span>
                    <span className="skill-tag">📐 Subject Mastery</span>
                  </div>
                  {[
                    { label:'📖 Subject Knowledge', pct:82, color:'navy' },
                    { label:'🎓 Pedagogy Skills',   pct:68, color:'gold' },
                    { label:'💻 Digital Teaching',  pct:55, color:'green' },
                  ].map(s => (
                    <div key={s.label} style={{ marginBottom:'.85rem' }}>
                      <div className="progress-label"><span>{s.label}</span><span>{s.pct}%</span></div>
                      <div className="progress-track">
                        <div className={`progress-fill ${s.color}`} style={{ width:`${s.pct}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              {/* Recent Activity */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">🕐 Recent Activity</h3>
                </div>
                <div className="card-p">
                  <div className="empty-state-enhanced">
                    <img src="/images/illustrations/empty-state.svg" alt="No activity" style={{ width: '140px' }} />
                    <h3>No Recent Activity</h3>
                    <p>Start a course or take a quiz to see your activity here!</p>
                    <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '1rem' }}>
                      <Link to="/courses" className="btn btn-primary btn-sm">
                        <i className="fas fa-book"></i> Browse Courses
                      </Link>
                      <Link to="/quizzes" className="btn btn-gold btn-sm">
                        <i className="fas fa-brain"></i> Take Quiz
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notifications */}
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">🔔 Latest Notifications</h3>
                  <Link to="/notifications" className="card-link">View All →</Link>
                </div>
                <div className="card-p">
                  <div className="empty-state-enhanced">
                    <img src="/images/illustrations/no-data.svg" alt="No notifications" style={{ width: '120px' }} />
                    <p style={{ fontSize: '0.95rem', color: 'var(--text-light)' }}>No new notifications</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Access */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">⚡ Quick Access</h3>
            </div>
            <div className="card-p">
              <div className="quick-access-grid">
                {quickLinks.map(l => (
                  <Link key={l.to} to={l.to} className="quick-link">
                    <span className="quick-icon">{l.icon}</span>
                    <span className="quick-label">{l.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default Dashboard
