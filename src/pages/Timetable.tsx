import { FC } from 'react'
import Navigation from '../components/Navigation'

const schedule = [
  { time:'9:00 – 10:00',  mon:'🔢 Mathematics', tue:'🔬 Science',    wed:'📝 English',    thu:'📜 History',    fri:'🎨 Art'        },
  { time:'10:00 – 11:00', mon:'🔬 Science',     tue:'📝 English',    wed:'🔢 Mathematics', thu:'🎨 Art',        fri:'🏃 Physical Ed' },
  { time:'11:15 – 12:15', mon:'📝 English',     tue:'🔢 Mathematics', wed:'🔬 Science',    thu:'🏃 Physical Ed', fri:'📜 History'    },
  { time:'12:15 – 1:00',  mon:'🍽️ Lunch',       tue:'🍽️ Lunch',      wed:'🍽️ Lunch',      thu:'🍽️ Lunch',      fri:'🍽️ Lunch'      },
  { time:'1:00 – 2:00',   mon:'📜 History',     tue:'🎨 Art',        wed:'🏃 Physical Ed', thu:'🔢 Mathematics', fri:'🔬 Science'    },
  { time:'2:00 – 3:00',   mon:'🎨 Art',         tue:'🏃 Physical Ed', wed:'📜 History',    thu:'🔬 Science',    fri:'📝 English'    },
]

const subjectColors: Record<string, string> = {
  '🔢': 'rgba(99,102,241,.12)',
  '🔬': 'rgba(16,185,129,.12)',
  '📝': 'rgba(245,158,11,.12)',
  '📜': 'rgba(244,63,94,.12)',
  '🎨': 'rgba(168,85,247,.12)',
  '🏃': 'rgba(14,165,233,.12)',
  '🍽️': 'rgba(160,174,192,.1)',
}

const getCellBg = (val: string) => {
  const emoji = val.split(' ')[0]
  return subjectColors[emoji] ?? 'transparent'
}

const Timetable: FC = () => {
  return (
    <div>
      <Navigation />

      <div className="page-header">
        <div className="page-header-content">
          <div className="breadcrumb"><span>Timetable</span></div>
          <h1>📅 Weekly Timetable</h1>
          <p>🗓️ Your complete teaching schedule for the week</p>
        </div>
      </div>

      <main>
        <div className="container">

          {/* Week Nav */}
          <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.5rem', flexWrap:'wrap', gap:'1rem' }}>
            <div>
              <h2 style={{ color:'var(--navy-dark)', fontSize:'1.1rem', fontWeight:800 }}>📅 Week of June 9 – June 15, 2025</h2>
              <div style={{ color:'var(--text-light)', fontSize:'.85rem' }}>🏫 Academic Year 2024-25 | Term 2</div>
            </div>
            <div style={{ display:'flex', gap:'.75rem' }}>
              <button className="btn btn-outline btn-sm">← Previous</button>
              <button className="btn btn-primary btn-sm">📍 Today</button>
              <button className="btn btn-outline btn-sm">Next →</button>
            </div>
          </div>

          {/* Legend */}
          <div style={{ display:'flex', flexWrap:'wrap', gap:'.75rem', marginBottom:'1.25rem' }}>
            {[
              { emoji:'🔢', label:'Mathematics', color:'#6366f1' },
              { emoji:'🔬', label:'Science',     color:'#10b981' },
              { emoji:'📝', label:'English',     color:'#f59e0b' },
              { emoji:'📜', label:'History',     color:'#f43f5e' },
              { emoji:'🎨', label:'Art',         color:'#a855f7' },
              { emoji:'🏃', label:'Physical Ed', color:'#0ea5e9' },
            ].map(s => (
              <div key={s.label} style={{ display:'flex', alignItems:'center', gap:'.4rem', fontSize:'.82rem', color:'var(--text-mid)' }}>
                <div style={{ width:'12px', height:'12px', background:s.color, borderRadius:'3px' }}></div>
                {s.emoji} {s.label}
              </div>
            ))}
          </div>

          {/* Timetable */}
          <div className="card" style={{ overflowX:'auto' }}>
            <table style={{ minWidth:'640px' }}>
              <thead>
                <tr>
                  <th>⏰ Time</th>
                  <th>Mon 🗓️</th>
                  <th>Tue 🗓️</th>
                  <th>Wed 🗓️</th>
                  <th>Thu 🗓️</th>
                  <th>Fri 🗓️</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map(row => (
                  <tr key={row.time}>
                    <td style={{ fontWeight:700, color:'var(--navy-dark)', whiteSpace:'nowrap', fontSize:'.82rem' }}>{row.time}</td>
                    {[row.mon, row.tue, row.wed, row.thu, row.fri].map((cell, i) => (
                      <td key={i} style={{ background: getCellBg(cell), fontWeight: cell.includes('🍽️') ? 400 : 500, color: cell.includes('🍽️') ? 'var(--text-muted)' : 'var(--text-dark)', fontSize:'.85rem' }}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="stats-row" style={{ marginTop:'1.5rem' }}>
            <div className="stat-widget"><div className="stat-widget-icon navy">🏫</div><div className="stat-widget-info"><h3>25</h3><p>Classes This Week</p></div></div>
            <div className="stat-widget"><div className="stat-widget-icon gold">⏱️</div><div className="stat-widget-info"><h3>25h</h3><p>Teaching Hours</p></div></div>
            <div className="stat-widget"><div className="stat-widget-icon green">✅</div><div className="stat-widget-info"><h3>5</h3><p>Subjects Covered</p></div></div>
            <div className="stat-widget"><div className="stat-widget-icon purple">🍽️</div><div className="stat-widget-info"><h3>5</h3><p>Lunch Breaks</p></div></div>
          </div>

        </div>
      </main>
    </div>
  )
}

export default Timetable
