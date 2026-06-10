import { FC } from 'react'
import { Link } from 'react-router-dom'

const Welcome: FC = () => {
  const features = [
    {
      icon: '/images/courses/pedagogy.svg',
      title: 'Professional Courses',
      description: 'Access expert-designed courses to enhance your teaching skills and methodologies.',
      link: '/courses'
    },
    {
      icon: '/images/illustrations/quiz.svg',
      title: 'Interactive Quizzes',
      description: 'Test your knowledge and earn XP points with engaging assessments.',
      link: '/quizzes'
    },
    {
      icon: '/images/illustrations/jobs.svg',
      title: 'Job Portal',
      description: 'Discover teaching opportunities tailored to your expertise and qualifications.',
      link: '/jobs'
    },
    {
      icon: '/images/illustrations/interview.svg',
      title: 'Interview Prep',
      description: 'Practice and prepare for teaching interviews with our comprehensive guides.',
      link: '/interview'
    },
    {
      icon: '/images/illustrations/leaderboard.svg',
      title: 'Leaderboard',
      description: 'Compete with peers and track your progress on our global rankings.',
      link: '/leaderboard'
    },
    {
      icon: '/images/illustrations/analytics.svg',
      title: 'Analytics Dashboard',
      description: 'Monitor your learning journey with detailed insights and reports.',
      link: '/analytics'
    }
  ]

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, #0a1929 0%, #1a3a6b 50%, #2c5282 100%)',
        color: '#fff',
        padding: '5rem 0 4rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background decorations */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '600px',
          height: '600px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(240,180,41,0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}></div>
        
        <div className="container">
          <div className="hero-with-image">
            <div className="hero-content">
              <h1 style={{ color: '#fff' }}>
                Welcome to <span style={{ color: 'var(--gold)' }}>TPDP</span>
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.9)' }}>
                Teacher Professional Development Platform — Your gateway to continuous learning, 
                career advancement, and connecting with educators worldwide.
              </p>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '2rem' }}>
                <Link to="/register" className="btn btn-gold btn-lg">
                  <i className="fas fa-rocket"></i> Get Started Free
                </Link>
                <Link to="/login" className="btn btn-outline" style={{ 
                  background: 'rgba(255,255,255,0.1)', 
                  color: '#fff',
                  border: '2px solid rgba(255,255,255,0.3)'
                }}>
                  <i className="fas fa-sign-in-alt"></i> Login
                </Link>
              </div>
              
              <div style={{ 
                display: 'flex', 
                gap: '2rem', 
                marginTop: '3rem',
                flexWrap: 'wrap' 
              }}>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--gold)' }}>25,000+</div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Teachers Enrolled</div>
                </div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--gold)' }}>100+</div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Professional Courses</div>
                </div>
                <div>
                  <div style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--gold)' }}>500+</div>
                  <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Jobs Posted</div>
                </div>
              </div>
            </div>
            
            <div className="hero-image">
              <img 
                src="/images/illustrations/welcome.svg" 
                alt="Welcome to TPDP"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container" style={{ padding: '4rem 1.5rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ 
            fontSize: '2.2rem', 
            fontWeight: 'bold', 
            color: 'var(--navy-dark)',
            marginBottom: '1rem'
          }}>
            Everything You Need to Advance Your Career
          </h2>
          <p style={{ 
            fontSize: '1.1rem', 
            color: 'var(--text-mid)',
            maxWidth: '600px',
            margin: '0 auto'
          }}>
            Comprehensive tools and resources designed specifically for educators
          </p>
        </div>

        <div className="feature-card-grid">
          {features.map((feature, index) => (
            <Link to={feature.link} key={index} style={{ textDecoration: 'none' }}>
              <div className="feature-card-img">
                <img src={feature.icon} alt={feature.title} />
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <div style={{ 
                  marginTop: '1rem', 
                  color: 'var(--navy-mid)', 
                  fontWeight: 600,
                  fontSize: '0.9rem'
                }}>
                  Learn More <i className="fas fa-arrow-right"></i>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div style={{
        background: 'linear-gradient(135deg, var(--navy-dark), var(--navy-mid))',
        color: '#fff',
        padding: '4rem 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <img 
            src="/images/illustrations/teacher-board.svg" 
            alt="Join TPDP"
            style={{ 
              width: '280px', 
              height: 'auto', 
              margin: '0 auto 2rem',
              opacity: 0.9
            }}
          />
          <h2 style={{ 
            fontSize: '2rem', 
            fontWeight: 'bold', 
            marginBottom: '1rem',
            color: '#fff'
          }}>
            Ready to Transform Your Teaching Career?
          </h2>
          <p style={{ 
            fontSize: '1.1rem', 
            marginBottom: '2rem',
            color: 'rgba(255,255,255,0.9)',
            maxWidth: '600px',
            margin: '0 auto 2rem'
          }}>
            Join thousands of educators who are advancing their careers with TPDP
          </p>
          <Link to="/register" className="btn btn-gold btn-lg">
            <i className="fas fa-rocket"></i> Start Your Journey — It's Free!
          </Link>
          <div style={{ 
            marginTop: '1.5rem', 
            fontSize: '0.9rem',
            color: 'rgba(255,255,255,0.7)'
          }}>
            Already a member? <Link to="/login" style={{ color: 'var(--gold)', fontWeight: 600 }}>Login here</Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div style={{ 
        background: 'var(--bg-card)', 
        borderTop: '1px solid var(--border)',
        padding: '2rem 0',
        textAlign: 'center' 
      }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
            <img src="/images/logo/logo.svg" alt="TPDP" style={{ width: '32px', height: '32px' }} />
            <span style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--navy-dark)' }}>
              TP<span style={{ color: 'var(--gold)' }}>DP</span>
            </span>
          </div>
          <p style={{ color: 'var(--text-light)', fontSize: '0.9rem' }}>
            © 2026 Teacher Professional Development Platform. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Welcome
