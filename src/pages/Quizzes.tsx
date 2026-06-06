import { FC, useState } from 'react'
import Navigation from '../components/Navigation'

const quizzes = [
  { id:'pedagogy',    title:'Pedagogy & Teaching',  icon:'📖', questions:10, time:10, xp:100, desc:'Test your knowledge of modern teaching methods and classroom strategies.' },
  { id:'mathematics', title:'Mathematics',           icon:'🔢', questions:10, time:10, xp:100, desc:'Solve problems covering algebra, geometry, and arithmetic concepts.' },
  { id:'general',     title:'General Knowledge',     icon:'🌍', questions:10, time:10, xp:100, desc:'Broad questions on current affairs, science, history, and culture.' },
  { id:'ict',         title:'ICT in Education',      icon:'💻', questions:10, time:10, xp:100, desc:'Test your knowledge of digital tools and technology integration.' },
  { id:'psychology',  title:'Child Psychology',      icon:'🧒', questions:10, time:10, xp:100, desc:'Questions on child development, learning styles, and behaviour.' },
  { id:'nep',         title:'NEP 2020',              icon:'📜', questions:10, time:10, xp:100, desc:'Test your understanding of India\'s National Education Policy 2020.' },
]

const Quizzes: FC = () => {
  const [selected, setSelected] = useState<string | null>(null)

  const quiz = quizzes.find(q => q.id === selected)

  return (
    <div>
      <Navigation />

      <div className="page-header">
        <div className="page-header-content">
          <div className="breadcrumb"><span>Quizzes</span></div>
          <h1>🧠 Knowledge Quizzes</h1>
          <p>⭐ Test your knowledge, earn XP, and compete with teachers nationwide</p>
        </div>
      </div>

      <main>
        <div className="container">

          {!selected ? (
            <>
              {/* Stats */}
              <div className="stats-row mb-3">
                <div className="stat-widget">
                  <div className="stat-widget-icon gold">⭐</div>
                  <div className="stat-widget-info"><h3>0</h3><p>XP from Quizzes</p></div>
                </div>
                <div className="stat-widget">
                  <div className="stat-widget-icon navy">✅</div>
                  <div className="stat-widget-info"><h3>0</h3><p>Quizzes Taken</p></div>
                </div>
                <div className="stat-widget">
                  <div className="stat-widget-icon green">🎯</div>
                  <div className="stat-widget-info"><h3>0%</h3><p>Avg Score</p></div>
                </div>
                <div className="stat-widget">
                  <div className="stat-widget-icon purple">🏆</div>
                  <div className="stat-widget-info"><h3>#—</h3><p>Your Rank</p></div>
                </div>
              </div>

              {/* Quiz Cards */}
              <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px, 1fr))', gap:'1.25rem' }}>
                {quizzes.map(q => (
                  <div key={q.id} className="card mb-0" style={{ cursor:'pointer' }} onClick={() => setSelected(q.id)}>
                    <div className="card-p">
                      <div style={{ fontSize:'2.8rem', marginBottom:'.75rem' }}>{q.icon}</div>
                      <h3 style={{ color:'var(--navy-dark)', marginBottom:'.4rem', fontSize:'1.05rem' }}>{q.title}</h3>
                      <p style={{ fontSize:'.85rem', color:'var(--text-light)', lineHeight:1.6, marginBottom:'1rem' }}>{q.desc}</p>
                      <div style={{ display:'flex', gap:'.5rem', flexWrap:'wrap', marginBottom:'1rem' }}>
                        <span className="badge badge-navy">❓ {q.questions} Questions</span>
                        <span className="badge badge-gold">⏱️ {q.time} mins</span>
                        <span className="badge badge-green">⭐ +{q.xp} XP</span>
                      </div>
                      <button className="btn btn-primary btn-full btn-sm">🚀 Start Quiz</button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="card" style={{ maxWidth:'700px', margin:'0 auto' }}>
              <div className="card-header">
                <h3 className="card-title">{quiz?.icon} {quiz?.title}</h3>
                <button className="btn btn-outline btn-sm" onClick={() => setSelected(null)}>← Back</button>
              </div>
              <div className="card-p" style={{ textAlign:'center', padding:'3rem 1.5rem' }}>
                <div style={{ fontSize:'4rem', marginBottom:'1rem' }}>{quiz?.icon}</div>
                <h2 style={{ color:'var(--navy-dark)', marginBottom:'.5rem' }}>{quiz?.title}</h2>
                <p style={{ color:'var(--text-light)', marginBottom:'2rem' }}>{quiz?.desc}</p>
                <div style={{ display:'flex', gap:'1rem', justifyContent:'center', flexWrap:'wrap', marginBottom:'2rem' }}>
                  <span className="badge badge-navy">❓ {quiz?.questions} Questions</span>
                  <span className="badge badge-gold">⏱️ {quiz?.time} mins</span>
                  <span className="badge badge-green">⭐ +{quiz?.xp} XP</span>
                </div>
                <button className="btn btn-primary btn-lg">🚀 Begin Quiz</button>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}

export default Quizzes
