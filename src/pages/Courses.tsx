import { FC, useState } from 'react'
import Navigation from '../components/Navigation'

const allCourses = [
  { id:1, cat:'pedagogy',  icon:'📖', title:'Modern Pedagogy & Teaching Methods',   desc:'Master constructivism, inquiry-based learning, and differentiated instruction.',  duration:'8 weeks', lessons:24, level:'Intermediate', enrolled:1240, image:'/images/courses/pedagogy.svg' },
  { id:2, cat:'digital',   icon:'💻', title:'ICT Integration in Education',          desc:'Leverage technology tools: Google Classroom, Kahoot, Canva, Padlet, and more.',   duration:'6 weeks', lessons:18, level:'Beginner',     enrolled:980,  image:'/images/courses/digital-teaching.svg' },
  { id:3, cat:'inclusive', icon:'🌟', title:'Inclusive Classroom Strategies',        desc:'Create a welcoming environment for students with diverse learning needs.',         duration:'5 weeks', lessons:15, level:'Beginner',     enrolled:760,  image:'/images/courses/inclusive.svg' },
  { id:4, cat:'leadership',icon:'🏆', title:'School Leadership & Management',        desc:'Develop leadership skills to manage classrooms, teams, and school culture.',       duration:'10 weeks',lessons:30, level:'Advanced',     enrolled:540,  image:'/images/courses/leadership.svg' },
  { id:5, cat:'subject',   icon:'🔢', title:'Advanced Mathematics for Teachers',     desc:'Deepen your subject knowledge with problem-solving strategies and pedagogy.',      duration:'7 weeks', lessons:21, level:'Advanced',     enrolled:430,  image:'/images/courses/mathematics.svg' },
  { id:6, cat:'pedagogy',  icon:'🧠', title:'Child Psychology & Development',        desc:'Understand cognitive, emotional, and social development stages in children.',      duration:'6 weeks', lessons:18, level:'Intermediate', enrolled:890,  image:'/images/courses/psychology.svg' },
]

const tabs = [
  { id:'all',       label:'All Courses' },
  { id:'pedagogy',  label:'Pedagogy' },
  { id:'digital',   label:'Digital Teaching' },
  { id:'leadership',label:'Leadership' },
  { id:'subject',   label:'Subject Mastery' },
  { id:'inclusive', label:'Inclusive Ed' },
]

const levelColor: Record<string, string> = {
  Beginner: 'var(--green)', Intermediate: 'var(--navy-mid)', Advanced: 'var(--purple)',
}

const Courses: FC = () => {
  const [activeTab, setActiveTab] = useState('all')

  const filtered = activeTab === 'all' ? allCourses : allCourses.filter(c => c.cat === activeTab)

  return (
    <div>
      <Navigation />

      <div className="page-header">
        <div className="page-header-content">
          <div className="breadcrumb"><span>Courses</span></div>
          <h1><i className="fas fa-book-open"></i> Professional Development Courses</h1>
          <p>Enhance your teaching skills with expert-designed courses. Earn certificates and XP points.</p>
        </div>
      </div>

      <main>
        <div className="container">

          <div className="tabs">
            {tabs.map(t => (
              <button key={t.id} className={`tab-btn ${activeTab === t.id ? 'active' : ''}`} onClick={() => setActiveTab(t.id)}>
                {t.label}
              </button>
            ))}
          </div>

          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(300px, 1fr))', gap:'1.5rem' }}>
            {filtered.map(course => (
              <div key={course.id} className="card mb-0" style={{ cursor:'pointer' }}>
                {/* Course Banner */}
                <div style={{
                  height:'130px', position:'relative', overflow:'hidden', borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0'
                }}>
                  <img src={course.image} alt={course.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <span style={{
                    position:'absolute', top:'.75rem', right:'.75rem',
                    background: levelColor[course.level], color:'#fff',
                    fontSize:'.7rem', fontWeight:700, padding:'.2rem .6rem', borderRadius:'99px',
                  }}>{course.level}</span>
                </div>

                <div className="card-p">
                  <h3 style={{ fontSize:'1rem', fontWeight:700, color:'var(--navy-dark)', marginBottom:'.5rem', lineHeight:1.4 }}>
                    {course.title}
                  </h3>
                  <p style={{ fontSize:'.85rem', color:'var(--text-light)', lineHeight:1.6, marginBottom:'1rem' }}>
                    {course.desc}
                  </p>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:'.8rem', color:'var(--text-light)', paddingTop:'.75rem', borderTop:'1px solid var(--border)' }}>
                    <span><i className="fas fa-clock" style={{ marginRight:'.3rem', color:'var(--navy-mid)' }}></i>{course.duration}</span>
                    <span><i className="fas fa-play-circle" style={{ marginRight:'.3rem', color:'var(--navy-mid)' }}></i>{course.lessons} lessons</span>
                    <span><i className="fas fa-users" style={{ marginRight:'.3rem', color:'var(--navy-mid)' }}></i>{course.enrolled.toLocaleString()}</span>
                  </div>
                  <button className="btn btn-primary btn-full mt-2" style={{ marginTop:'.75rem' }}>
                    <i className="fas fa-play"></i> Enroll Free
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>
    </div>
  )
}

export default Courses
