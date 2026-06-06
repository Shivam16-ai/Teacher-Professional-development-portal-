import { FC, useState } from 'react'
import Navigation from '../components/Navigation'

const allTeachers = [
  { rank:1, name:'Priya Sharma',   initials:'PS', subject:'Mathematics', xp:5280, badge:'🥇', streak:28, quizzes:42 },
  { rank:2, name:'Maya Desai',     initials:'MD', subject:'Science',     xp:4850, badge:'🥈', streak:21, quizzes:38 },
  { rank:3, name:'Rahul Kumar',    initials:'RK', subject:'English',     xp:4210, badge:'🥉', streak:15, quizzes:31 },
  { rank:4, name:'Anita Patel',    initials:'AP', subject:'History',     xp:3980, badge:'',   streak:12, quizzes:27 },
  { rank:5, name:'Suresh Nair',    initials:'SN', subject:'Computer Sc', xp:3650, badge:'',   streak:9,  quizzes:24 },
  { rank:6, name:'Kavita Reddy',   initials:'KR', subject:'Hindi',       xp:3200, badge:'',   streak:7,  quizzes:20 },
  { rank:7, name:'Deepak Joshi',   initials:'DJ', subject:'Geography',   xp:2900, badge:'',   streak:5,  quizzes:18 },
]

const podiumColors = [
  'linear-gradient(135deg,#f0b429,#b7791f)',
  'linear-gradient(135deg,#c0c0c0,#a0a0a0)',
  'linear-gradient(135deg,#cd7f32,#a0522d)',
]

const Leaderboard: FC = () => {
  const [tab, setTab] = useState('weekly')

  return (
    <div>
      <Navigation />

      <div className="page-header">
        <div className="page-header-content">
          <div className="breadcrumb"><span>Leaderboard</span></div>
          <h1>🏆 Teacher Leaderboard</h1>
          <p>🌟 Top-performing educators ranked by XP, quizzes, and achievements</p>
        </div>
      </div>

      <main>
        <div className="container">

          {/* Period Tabs */}
          <div className="tabs">
            {['weekly','monthly','alltime'].map(t => (
              <button key={t} className={`tab-btn ${tab === t ? 'active' : ''}`} onClick={() => setTab(t)}>
                {t === 'weekly' ? '📅 This Week' : t === 'monthly' ? '🗓️ This Month' : '🏆 All Time'}
              </button>
            ))}
          </div>

          {/* Podium */}
          <div style={{ display:'flex', justifyContent:'center', alignItems:'flex-end', gap:'1.5rem', margin:'2rem 0 3rem', flexWrap:'wrap' }}>
            {[allTeachers[1], allTeachers[0], allTeachers[2]].map((t, i) => {
              const isFirst = t.rank === 1
              return (
                <div key={t.rank} style={{ textAlign:'center', order: i }}>
                  {isFirst && <div style={{ fontSize:'1.8rem', marginBottom:'.3rem' }}>👑</div>}
                  <div style={{
                    width: isFirst ? '100px' : '80px',
                    height: isFirst ? '100px' : '80px',
                    borderRadius:'50%',
                    background: podiumColors[t.rank - 1],
                    display:'flex', alignItems:'center', justifyContent:'center',
                    fontSize: isFirst ? '2rem' : '1.6rem', fontWeight:800,
                    color: t.rank === 1 ? 'var(--navy-dark)' : '#fff',
                    margin:'0 auto .5rem',
                    boxShadow: isFirst ? '0 6px 24px rgba(240,180,41,.5)' : '0 4px 15px rgba(0,0,0,.2)',
                  }}>{t.initials}</div>
                  <div style={{ fontWeight: isFirst ? 800 : 700, fontSize: isFirst ? '1rem' : '.9rem', color:'var(--navy-dark)' }}>{t.name}</div>
                  <div style={{ fontSize:'.8rem', color:'var(--text-light)', marginBottom:'.4rem' }}>📚 {t.subject}</div>
                  <div style={{
                    background: podiumColors[t.rank - 1],
                    color: t.rank === 1 ? 'var(--navy-dark)' : '#fff',
                    padding:'.3rem .85rem', borderRadius:'99px',
                    fontSize:'.82rem', fontWeight:700, display:'inline-block',
                  }}>⭐ {t.xp.toLocaleString()} XP</div>
                </div>
              )
            })}
          </div>

          {/* Full Rankings Table */}
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">📋 Full Rankings</h3>
              <span className="badge badge-gold">🔄 Live</span>
            </div>
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>🏅 Rank</th>
                    <th>👤 Teacher</th>
                    <th>📚 Subject</th>
                    <th>🔥 Streak</th>
                    <th>🧠 Quizzes</th>
                    <th>⭐ XP Points</th>
                  </tr>
                </thead>
                <tbody>
                  {allTeachers.map(t => (
                    <tr key={t.rank}>
                      <td><strong>{t.badge || `#${t.rank}`}</strong></td>
                      <td>
                        <div style={{ display:'flex', alignItems:'center', gap:'.6rem' }}>
                          <div style={{ width:'34px', height:'34px', borderRadius:'50%', background:'linear-gradient(135deg, var(--navy), var(--navy-mid))', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:'.75rem', fontWeight:700, flexShrink:0 }}>{t.initials}</div>
                          <span style={{ fontWeight:600, color:'var(--navy-dark)' }}>{t.name}</span>
                        </div>
                      </td>
                      <td>{t.subject}</td>
                      <td>🔥 {t.streak} days</td>
                      <td>🧠 {t.quizzes}</td>
                      <td><strong style={{ color:'var(--gold-dark)' }}>⭐ {t.xp.toLocaleString()}</strong></td>
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

export default Leaderboard
