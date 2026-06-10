import { FC, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { setToken, setUser, saveRegisteredUser, isEmailRegistered } from '../utils/auth'
import Card from '../components/ui/Card'
import CardContent from '../components/ui/CardContent'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

const Register: FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
    subject: '',
    qualification: '',
    school: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const navigate = useNavigate()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const fieldName = e.target.id.replace(/^reg/, '').toLowerCase()
    setFormData({...formData, [fieldName]: e.target.value})
    setError('') // Clear error on input change
  }

  const validateForm = (): boolean => {
    if (!formData.name.trim()) {
      setError('Please enter your full name')
      return false
    }

    if (!formData.email.trim()) {
      setError('Please enter your email address')
      return false
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address')
      return false
    }

    // Check if email is already registered
    if (isEmailRegistered(formData.email)) {
      setError('This email is already registered. Please login instead.')
      return false
    }

    if (!formData.password) {
      setError('Please enter a password')
      return false
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long')
      return false
    }

    if (formData.password !== formData.confirm) {
      setError('Passwords do not match')
      return false
    }

    if (!formData.subject) {
      setError('Please select your subject specialization')
      return false
    }

    if (!formData.qualification.trim()) {
      setError('Please enter your qualification')
      return false
    }

    return true
  }

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!validateForm()) {
      return
    }

    setLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      try {
        // Create new user
        const newUser = {
          id: 'user_' + Date.now(),
          name: formData.name.trim(),
          email: formData.email.toLowerCase().trim(),
          password: formData.password,
          subject: formData.subject,
          qualification: formData.qualification.trim(),
          school: formData.school.trim(),
          createdAt: new Date().toISOString()
        }

        // Save to registered users
        saveRegisteredUser(newUser)

        // Set success message
        setSuccess('Registration successful! Redirecting to dashboard...')

        // Auto-login the user
        const token = 'token_' + newUser.id + '_' + Date.now()
        setToken(token)
        
        // Set user data (without password)
        const { password, ...userWithoutPassword } = newUser
        setUser(userWithoutPassword)

        // Redirect to dashboard after 1.5 seconds
        setTimeout(() => {
          navigate('/dashboard')
        }, 1500)

      } catch (err) {
        setError('Registration failed. Please try again.')
        setLoading(false)
      }
    }, 800)
  }

  return (
    <div className="auth-page">
      <Card className="auth-card wide">
        <CardContent padding="none">
          <div className="auth-logo">
            <div className="auth-logo-icon">
              <img src="/images/logo/logo.svg" alt="TPDP" style={{ width: '36px', height: '36px' }} />
            </div>
            <span>TP<em>DP</em></span>
          </div>
          <h2>Create Your Account 🚀</h2>
          <p className="auth-subtitle">Join 25,000+ educators advancing their careers with TPDP — it's completely free!</p>

          {error && <div className="error-box"><i className="fas fa-exclamation-circle"></i> {error}</div>}
          {success && <div className="success-box"><i className="fas fa-check-circle"></i> {success}</div>}

          <form onSubmit={handleRegister}>
            <div className="form-row">
              <Input
                type="text"
                id="regName"
                label="Full Name *"
                placeholder="e.g. Priya Sharma"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
              />
              <Input
                type="email"
                id="regEmail"
                label="Email Address *"
                placeholder="your@email.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="regPassword">Password *</label>
                <div className="password-wrapper">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    id="regPassword"
                    placeholder="Min 6 characters"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                  <button 
                    type="button" 
                    className="password-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={loading}
                  >
                    <i className={`fas fa-${showPassword ? 'eye-slash' : 'eye'}`}></i>
                  </button>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="regConfirm">Confirm Password *</label>
                <div className="password-wrapper">
                  <Input
                    type={showConfirm ? 'text' : 'password'}
                    id="regConfirm"
                    placeholder="Repeat password"
                    value={formData.confirm}
                    onChange={handleChange}
                    required
                    disabled={loading}
                  />
                  <button 
                    type="button" 
                    className="password-toggle"
                    onClick={() => setShowConfirm(!showConfirm)}
                    disabled={loading}
                  >
                    <i className={`fas fa-${showConfirm ? 'eye-slash' : 'eye'}`}></i>
                  </button>
                </div>
              </div>
            </div>
            
            <div className="form-row">
              <div className="form-group">
                <label><i className="fas fa-book"></i> Subject Specialization *</label>
                <select 
                  id="regSubject" 
                  required 
                  value={formData.subject}
                  onChange={handleChange}
                  className="form-control"
                  disabled={loading}
                >
                  <option value="">Select subject</option>
                  <option value="Mathematics">Mathematics</option>
                  <option value="Science / Physics">Science / Physics</option>
                  <option value="Science / Chemistry">Science / Chemistry</option>
                  <option value="Science / Biology">Science / Biology</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Social Studies / History">Social Studies / History</option>
                  <option value="Social Studies / Geography">Social Studies / Geography</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Commerce / Accountancy">Commerce / Accountancy</option>
                  <option value="Economics">Economics</option>
                  <option value="Physical Education">Physical Education</option>
                  <option value="Art & Craft">Art & Craft</option>
                  <option value="Music">Music</option>
                  <option value="Special Education">Special Education</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <Input
                type="text"
                id="regQualification"
                label="Qualification *"
                placeholder="e.g. B.Ed, M.Ed, PhD"
                value={formData.qualification}
                onChange={handleChange}
                required
                disabled={loading}
              />
            </div>
            
            <Input
              type="text"
              id="regSchool"
              label="Current School / Institution (optional)"
              placeholder="e.g. DAV Public School, Mumbai"
              value={formData.school}
              onChange={handleChange}
              disabled={loading}
            />

            <div className="info-box">
              <i className="fas fa-shield-alt" style={{color:'var(--navy)'}}></i>
              By registering, you agree to our Terms of Service. Your data is stored securely on this device.
            </div>

            <Button 
              type="submit" 
              variant="primary" 
              fullWidth 
              icon={loading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-rocket"></i>}
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create My Account'}
            </Button>
          </form>

          <div className="auth-footer">
            Already a member? <Link to="/login">Login here</Link>
          </div>
        </CardContent>
      </Card>
      
      {/* Decorative images */}
      <div style={{
        position: 'fixed',
        right: '5%',
        top: '15%',
        zIndex: 0,
        opacity: 0.5,
        pointerEvents: 'none'
      }}>
        <img 
          src="/images/illustrations/jobs.svg" 
          alt="" 
          style={{ width: '200px', height: 'auto' }}
        />
      </div>
      <div style={{
        position: 'fixed',
        left: '5%',
        bottom: '10%',
        zIndex: 0,
        opacity: 0.6,
        pointerEvents: 'none'
      }}>
        <img 
          src="/images/illustrations/analytics.svg" 
          alt="" 
          style={{ width: '180px', height: 'auto' }}
        />
      </div>
    </div>
  )
}

export default Register
