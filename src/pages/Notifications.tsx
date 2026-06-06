import { FC, useState } from 'react'
import Navigation from '../components/Navigation'

const allNotifications = [
  { id:1, type:'jobs',    icon:'💼', title:'New Job Match!',          body:'Mathematics Teacher at DPS New Delhi matches your profile.',  time:'2 min ago',  unread:true  },
  { id:2, type:'quizzes', icon:'🧠', title:'Quiz Reminder',           body:'You haven\'t taken a quiz this week. Earn 100 XP today!',     time:'1 hr ago',   unread:true  },
  { id:3, type:'courses', icon:'📚', title:'Course Update',           body:'New module added to "Modern Pedagogy & Teaching Methods".',   time:'3 hrs ago',  unread:true  },
  { id:4, type:'alerts',  icon:'🏆', title:'Achievement Unlocked!',   body:'You earned the "Course Starter" badge. Keep it up!',          time:'Yesterday',  unread:false },
  { id:5, type:'jobs',    icon:'💼', title:'Application Viewed',      body:'Kendriya Vidyalaya viewed your application for Science Teacher.', time:'2 days ago', unread:false },
  { id:6, type:'alerts',  icon:'⭐', title:'XP Milestone',            body:'You\'ve earned 250 XP! Keep learning to reach Level 2.',      time:'3 days ago', unread:false },
]

const tabs = [
  { id:'all',     label:'🔔 All',      count: allNotifications.length },
  { id:'jobs',    label:'💼 Jobs',     count: allNotifications.filter(n => n.type === 'jobs').length },
  { id:'quizzes', label:'🧠 Quizzes',  count: allNotifications.filter(n => n.type === 'quizzes').length },
  { id:'courses', label:'📚 Courses',  count: allNotifications.filter(n => n.type === 'courses').length },
  { id:'alerts',  label:'🏆 Alerts',   count: allNotifications.filter(n => n.type === 'alerts').length },
]

const Notifications: FC = () => {
  const [activeTab, setActiveTab] = useState('all')
  const [notifications, setNotifications] = useState(allNotifications)

  const filtered = activeTab === 'all' ? notifications : notifications.filter(n => n.type === activeTab)
  const unreadCount = notifications.filter(n => n.unread).length

  const markAllRead = () => setNotifications(prev => prev.map(n => ({ ...n, unread: false })))

  return (
    <div>
      <Navigation />

      <div className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div>
              <div className="header-title">🔔 Notifications {unreadCount > 0 && <span className="badge badge-gold" style={{ fontSize:'.8rem', marginLeft:'.5rem' }}>{unreadCount} new</span>}</div>
              <div className="header-subtitle">📬 Stay updated with job alerts, quiz reminders, and course announcements</div>
            </div>
            {unreadCount > 0 && (
              <button className="btn btn-ghost btn-sm" onClick={markAllRead}>✅ Mark all read</button>
            )}
          </div>
        </div>
      </div>

      <main>
        <div className="container">

          <div className="tabs">
            {tabs.map(t => (
              <button key={t.id} className={`tab-btn ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
                {t.label} <span style={{ marginLeft:'.3rem', background:'var(--border)', borderRadius:'99px', padding:'.1rem .45rem', fontSize:'.72rem' }}>{t.count}</span>
              </button>
            ))}
          </div>

          <div className="card">
            <div className="card-header">
              <h3 className="card-title">📥 Inbox</h3>
              <span style={{ fontSize:'.82rem', color:'var(--text-light)' }}>{filtered.length} notifications</span>
            </div>
            <div>
              {filtered.length === 0 ? (
                <div className="empty-state">
                  <div className="empty-state-icon">🔔</div>
                  <p>No notifications in this category yet.</p>
                </div>
              ) : (
                filtered.map((n, i) => (
                  <div key={n.id} style={{
                    display:'flex', alignItems:'flex-start', gap:'1rem',
                    padding:'1rem 1.5rem',
                    borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none',
                    background: n.unread ? 'rgba(235,248,255,.6)' : 'transparent',
                    transition:'background .2s',
                  }}>
                    <div style={{ width:'44px', height:'44px', borderRadius:'12px', background:'linear-gradient(135deg, var(--navy-dark), var(--navy-mid))', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.3rem', flexShrink:0 }}>
                      {n.icon}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:'.5rem', marginBottom:'.2rem' }}>
                        <span style={{ fontWeight:700, color:'var(--navy-dark)', fontSize:'.92rem' }}>{n.title}</span>
                        {n.unread && <span style={{ width:'8px', height:'8px', borderRadius:'50%', background:'var(--navy-light)', display:'inline-block' }}></span>}
                      </div>
                      <p style={{ fontSize:'.85rem', color:'var(--text-mid)', lineHeight:1.5, marginBottom:'.3rem' }}>{n.body}</p>
                      <span style={{ fontSize:'.75rem', color:'var(--text-muted)' }}>🕒 {n.time}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default Notifications
