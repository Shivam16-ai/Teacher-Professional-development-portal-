import { FC, useState, useRef, useEffect } from 'react'
import Navigation from '../components/Navigation'

interface Message { id: number; text: string; sender: 'user' | 'bot' }

const suggestions = [
  { emoji: '🏫', label: 'Teaching Jobs' },
  { emoji: '📚', label: 'Available Courses' },
  { emoji: '🧠', label: 'Quiz Tips' },
  { emoji: '📖', label: "Bloom's Taxonomy" },
  { emoji: '📄', label: 'Resume Help' },
  { emoji: '🎓', label: 'Pedagogy' },
]

const topics = [
  '📖 Teaching Methods', '🏫 Classroom Management', '📜 NEP 2020',
  '💼 Interview Tips', '💰 Teacher Salary', '⭐ Earn XP',
]

const botReplies: Record<string, string> = {
  'teaching jobs': 'We have 200+ verified teaching jobs across India! Go to the Jobs section to filter by subject, location, and salary.',
  'available courses': 'We offer 50+ professional development courses — Pedagogy, ICT, Leadership, and more. All free with certificates!',
  'quiz tips': 'Read the question carefully, eliminate wrong answers first, and review your weak areas in Analytics.',
  "bloom's taxonomy": "Bloom's Taxonomy has 6 levels: Remember → Understand → Apply → Analyze → Evaluate → Create. Use it to design better lesson plans!",
  'resume help': 'Use our Resume Builder to create an ATS-friendly teacher resume. Go to Resume Builder in the menu.',
  'pedagogy': 'Pedagogy is the art and science of teaching. Explore our Pedagogy courses to master constructivism, inquiry-based learning, and more!',
}

const Chatbot: FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const sendMessage = (text: string) => {
    if (!text.trim()) return
    const userMsg: Message = { id: Date.now(), text, sender: 'user' }
    setMessages(prev => [...prev, userMsg])
    setInput('')

    setTimeout(() => {
      const key = text.toLowerCase()
      const reply = Object.entries(botReplies).find(([k]) => key.includes(k))?.[1]
        ?? "Thanks for your question! I'm EduBot, your AI teaching assistant. I can help with jobs, courses, quizzes, pedagogy, and more. Try one of the suggestions above!"
      setMessages(prev => [...prev, { id: Date.now() + 1, text: reply, sender: 'bot' }])
    }, 600)
  }

  return (
    <div>
      <Navigation />

      <div className="page-header">
        <div className="page-header-content">
          <div className="breadcrumb"><span>AI Chatbot</span></div>
          <h1>🤖 EduBot — AI Teaching Assistant</h1>
          <p>💬 Ask anything about jobs, courses, quizzes, pedagogy, and your professional development</p>
        </div>
      </div>

      <main>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '1.5rem', alignItems: 'start' }}>

            {/* Chat Window */}
            <div className="chat-wrapper">
              <div className="chat-header">
                <div className="chat-header-info">
                  <div className="chat-avatar">🤖</div>
                  <div>
                    <div className="chat-name">EduBot</div>
                    <div className="chat-status">Online — AI Teaching Assistant</div>
                  </div>
                </div>
                <button className="btn btn-ghost btn-sm" onClick={() => setMessages([])}>
                  🗑️ Clear
                </button>
              </div>

              <div className="chat-suggestions">
                <span>Try:</span>
                {suggestions.map(s => (
                  <button key={s.label} className="chat-chip" onClick={() => sendMessage(s.label)}>
                    {s.emoji} {s.label}
                  </button>
                ))}
              </div>

              <div className="chat-messages">
                {messages.length === 0 && (
                  <div className="chat-welcome">
                    <p style={{ fontSize: '2rem' }}>👋</p>
                    <p style={{ fontWeight: 600, color: 'var(--navy-dark)' }}>Hi! I'm EduBot.</p>
                    <p>How can I help you today? Ask about courses, jobs, quizzes, or pedagogy!</p>
                  </div>
                )}
                {messages.map(msg => (
                  <div key={msg.id} className={`msg-bubble ${msg.sender}`}>{msg.text}</div>
                ))}
                <div ref={bottomRef} />
              </div>

              <div className="chat-input-row">
                <input
                  type="text"
                  placeholder="Type your message..."
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                />
                <button className="btn btn-primary" onClick={() => sendMessage(input)}>
                  📤
                </button>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="card">
                <div className="card-header">
                  <h3 className="card-title">🔥 Popular Topics</h3>
                </div>
                <div className="card-p">
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
                    {topics.map(t => (
                      <button
                        key={t}
                        className="chat-chip"
                        style={{ textAlign: 'left', borderRadius: 'var(--radius-sm)', padding: '.6rem .9rem' }}
                        onClick={() => sendMessage(t.replace(/^[^\s]+ /, ''))}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  )
}

export default Chatbot
