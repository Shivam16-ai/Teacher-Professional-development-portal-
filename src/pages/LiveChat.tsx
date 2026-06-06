import { FC, useState, useRef, useEffect } from 'react'
import Navigation from '../components/Navigation'

interface Msg { id: number; user: string; text: string; time: string }

const seedMessages: Msg[] = [
  { id:1, user:'Priya Sharma',  text:'Good morning everyone! 👋 Has anyone tried the new NEP 2020 curriculum yet?', time:'9:02 AM' },
  { id:2, user:'Rahul Kumar',   text:'Yes! The activity-based learning approach is really engaging for students 📚', time:'9:05 AM' },
  { id:3, user:'Maya Desai',    text:'I found the Bloom\'s Taxonomy integration very helpful for lesson planning 🎯', time:'9:08 AM' },
]

const onlineUsers = ['👩‍🏫 Priya S.', '👨‍🏫 Rahul K.', '👩‍🏫 Maya D.', '👨‍🏫 Suresh N.', '👩‍🏫 Anita P.']

const LiveChat: FC = () => {
  const [messages, setMessages] = useState<Msg[]>(seedMessages)
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior:'smooth' })
  }, [messages])

  const send = () => {
    if (!input.trim()) return
    const now = new Date()
    setMessages(prev => [...prev, {
      id: Date.now(),
      user: 'You',
      text: input,
      time: now.toLocaleTimeString([], { hour:'2-digit', minute:'2-digit' }),
    }])
    setInput('')
  }

  return (
    <div>
      <Navigation />

      <div className="page-header">
        <div className="page-header-content">
          <div className="breadcrumb"><span>Live Chat</span></div>
          <h1>💬 Teacher Community Chat</h1>
          <p>🤝 Connect, share, and collaborate with educators across India in real time</p>
        </div>
      </div>

      <main>
        <div className="container">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 240px', gap:'1.5rem', alignItems:'start' }}>

            {/* Chat Window */}
            <div className="chat-wrapper">
              <div className="chat-header">
                <div className="chat-header-info">
                  <div className="chat-avatar">💬</div>
                  <div>
                    <div className="chat-name"># general-teachers-chat</div>
                    <div className="chat-status">{onlineUsers.length} teachers online</div>
                  </div>
                </div>
                <span className="badge badge-green">🟢 Live</span>
              </div>

              <div className="chat-messages">
                {messages.map(msg => (
                  <div key={msg.id} style={{ display:'flex', gap:'.75rem', alignItems:'flex-start' }}>
                    <div style={{ width:'36px', height:'36px', borderRadius:'50%', background:'linear-gradient(135deg, var(--navy-dark), var(--navy-mid))', display:'flex', alignItems:'center', justifyContent:'center', color:'#fff', fontSize:'.75rem', fontWeight:700, flexShrink:0 }}>
                      {msg.user === 'You' ? '👤' : msg.user.split(' ').map(w => w[0]).join('').slice(0,2)}
                    </div>
                    <div style={{ flex:1 }}>
                      <div style={{ display:'flex', alignItems:'center', gap:'.5rem', marginBottom:'.2rem' }}>
                        <span style={{ fontWeight:700, fontSize:'.85rem', color: msg.user === 'You' ? 'var(--navy)' : 'var(--navy-dark)' }}>{msg.user}</span>
                        <span style={{ fontSize:'.72rem', color:'var(--text-muted)' }}>🕒 {msg.time}</span>
                      </div>
                      <div style={{ fontSize:'.88rem', color:'var(--text-dark)', lineHeight:1.5, background: msg.user === 'You' ? 'var(--navy-faint)' : 'var(--bg)', padding:'.6rem .9rem', borderRadius:'0 10px 10px 10px', border:'1px solid var(--border)', display:'inline-block', maxWidth:'100%' }}>
                        {msg.text}
                      </div>
                    </div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>

              <div className="chat-input-row">
                <input
                  type="text"
                  placeholder="💬 Type your message..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && send()}
                />
                <button className="btn btn-primary" onClick={send}>📤</button>
              </div>
            </div>

            {/* Online Users */}
            <div>
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">🟢 Online Now</h3>
                  <span className="badge badge-green">{onlineUsers.length}</span>
                </div>
                <div className="card-p">
                  <div style={{ display:'flex', flexDirection:'column', gap:'.5rem' }}>
                    {onlineUsers.map(u => (
                      <div key={u} style={{ display:'flex', alignItems:'center', gap:'.6rem', padding:'.5rem .75rem', borderRadius:'var(--radius-sm)', background:'var(--bg)', fontSize:'.85rem', fontWeight:500 }}>
                        <span style={{ width:'8px', height:'8px', borderRadius:'50%', background:'var(--green)', flexShrink:0 }}></span>
                        {u}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">📌 Channels</h3>
                </div>
                <div className="card-p">
                  {['# general', '# pedagogy', '# job-tips', '# quizzes', '# resources'].map(c => (
                    <div key={c} style={{ padding:'.5rem .75rem', borderRadius:'var(--radius-sm)', fontSize:'.85rem', color:'var(--text-mid)', cursor:'pointer', transition:'var(--transition)' }}
                      onMouseOver={e => (e.currentTarget.style.background = 'var(--navy-faint)')}
                      onMouseOut={e => (e.currentTarget.style.background = 'transparent')}
                    >{c}</div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}

export default LiveChat
