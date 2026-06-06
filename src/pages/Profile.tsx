import { FC, useState } from 'react'
import Navigation from '../components/Navigation'

const Profile: FC = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [userInfo, setUserInfo] = useState({
    name: 'Teacher User', email: 'teacher@tpdp.edu',
    subject: 'Mathematics', school: 'Example School', experience: '5 years',
  })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div>
      <Navigation />

      {/* Profile Header */}
      <div className="profile-header">
        <div className="container">
          <div className="profile-header-content">
            <div className="profile-avatar-wrap">
              <img src="/images/avatars/default-avatar.svg" alt="Profile Avatar" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
            </div>
            <div className="profile-info">
              <div className="profile-name">{userInfo.name}</div>
              <div className="profile-role">{userInfo.subject} Teacher</div>
              <div className="profile-school">{userInfo.school}</div>
            </div>
            <div className="profile-stats">
              <div className="profile-stat-item">
                <div className="profile-stat-value">0</div>
                <div className="profile-stat-label">XP Points</div>
              </div>
              <div className="profile-stat-item">
                <div className="profile-stat-value">0</div>
                <div className="profile-stat-label">Courses</div>
              </div>
              <div className="profile-stat-item">
                <div className="profile-stat-value">0</div>
                <div className="profile-stat-label">Quizzes</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <main>
        <div className="container">
          <div className="tabs">
            {['overview','edit','activity'].map(t => (
              <button key={t} className={`tab-btn ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
                {t.charAt(0).toUpperCase() + t.slice(1)}{t === 'edit' ? ' Profile' : t === 'activity' ? ' Log' : ''}
              </button>
            ))}
          </div>

          {activeTab === 'overview' && (
            <div className="two-col">
              <div>
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title"><i className="fas fa-user"></i> About Me</h3>
                  </div>
                  <div className="card-p">
                    <p style={{ color:'var(--text-light)', fontSize:'.9rem', lineHeight:1.7 }}>
                      Welcome to your profile! Update your information to help other educators learn about you.
                    </p>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title"><i className="fas fa-info-circle"></i> Personal Details</h3>
                  </div>
                  <div className="card-p">
                    <div className="details-list">
                      {[
                        ['fas fa-envelope','Email', userInfo.email],
                        ['fas fa-book','Subject', userInfo.subject],
                        ['fas fa-school','School', userInfo.school],
                        ['fas fa-briefcase','Experience', userInfo.experience],
                      ].map(([icon, key, val]) => (
                        <div key={key} className="detail-item">
                          <i className={icon as string} style={{ color:'var(--navy-mid)', width:'16px' }}></i>
                          <strong>{key}:</strong> {val}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title"><i className="fas fa-certificate"></i> Achievements</h3>
                  </div>
                  <div className="card-p">
                    <div className="empty-state">
                      <div className="empty-state-icon">🏆</div>
                      <p>No achievements yet. Start learning to earn badges!</p>
                    </div>
                  </div>
                </div>
                <div className="card">
                  <div className="card-header">
                    <h3 className="card-title"><i className="fas fa-star"></i> Skills</h3>
                  </div>
                  <div className="card-p">
                    <div className="skill-tags">
                      <span className="skill-tag">Pedagogy</span>
                      <span className="skill-tag">Digital Teaching</span>
                      <span className="skill-tag">Mathematics</span>
                      <span className="skill-tag">Curriculum Design</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'edit' && (
            <div className="card" style={{ maxWidth:'600px' }}>
              <div className="card-header">
                <h3 className="card-title"><i className="fas fa-edit"></i> Edit Profile</h3>
              </div>
              <div className="card-p">
                {saved && <div className="success-box"><i className="fas fa-check-circle"></i> Profile updated successfully!</div>}
                <form onSubmit={e => { e.preventDefault(); handleSave() }}>
                  <div className="form-group">
                    <label><i className="fas fa-user"></i> Full Name</label>
                    <input type="text" value={userInfo.name} onChange={e => setUserInfo({...userInfo, name: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label><i className="fas fa-envelope"></i> Email</label>
                    <input type="email" value={userInfo.email} onChange={e => setUserInfo({...userInfo, email: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label><i className="fas fa-book"></i> Subject</label>
                    <input type="text" value={userInfo.subject} onChange={e => setUserInfo({...userInfo, subject: e.target.value})} />
                  </div>
                  <div className="form-group">
                    <label><i className="fas fa-school"></i> School</label>
                    <input type="text" value={userInfo.school} onChange={e => setUserInfo({...userInfo, school: e.target.value})} />
                  </div>
                  <button type="submit" className="btn btn-primary">
                    <i className="fas fa-save"></i> Save Changes
                  </button>
                </form>
              </div>
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="card">
              <div className="card-header">
                <h3 className="card-title"><i className="fas fa-history"></i> Activity Log</h3>
              </div>
              <div className="card-p">
                <div className="empty-state">
                  <div className="empty-state-icon">📋</div>
                  <p>No recent activity. Start a course or take a quiz!</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default Profile
