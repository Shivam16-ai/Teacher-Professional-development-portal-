import { FC, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { setToken, setUser, validateCredentials, isEmailRegistered } from '../utils/auth'
import Card from '../components/ui/Card'
import CardContent from '../components/ui/CardContent'
import Input from '../components/ui/Input'
import Button from '../components/ui/Button'

const Login: FC = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    // Clear any error when user types
    if (error) {
      setError('')
    }
  }, [email, password])

  const validateForm = (): boolean => {
    if (!email.trim()) {
      setError('Please enter your email address')
      return false
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address')
      return false
    }

    if (!password) {
      setError('Please enter your password')
      return false
    }

    return true
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!validateForm()) {
      return
    }

    setLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      // First check if email is registered
      if (!isEmailRegistered(email)) {
        setError('No account found with this email. Please register first.')
        setLoading(false)
        return
      }

      // Validate credentials
      const user = validateCredentials(email, password)

      if (user) {
        // Login successful
        const token = 'token_' + user.id + '_' + Date.now()
        setToken(token)
        
        // Set user data (without password)
        const { password: _, ...userWithoutPassword } = user
        setUser(userWithoutPassword)

        // Navigate to dashboard
        navigate('/dashboard')
      } else {
        // Invalid password
        setError('Invalid password. Please try again.')
        setLoading(false)
      }
    }, 600)
  }

  return (
    <div>
      <div className="auth-page">
        <Card className="auth-card">
          <CardContent padding="none">
            <div className="auth-logo">
              <div className="auth-logo-icon">
                <img src="/images/logo/logo.svg" alt="TPDP" style={{ width: '48px', height: '48px' }} />
              </div>
              <span>TP<em>DP</em></span>
            </div>
            <h2>Welcome Back!</h2>
            <p className="auth-subtitle">Sign in to your teacher account</p>

            <div className="info-box">
              <i className="fas fa-info-circle"></i>
              <strong> Note:</strong> You must register first before logging in. New user? Click "Create New Account" below.
            </div>

            {error && <div className="error-box"><i className="fas fa-exclamation-circle"></i> {error}</div>}

            <form onSubmit={handleLogin}>
              <Input
                type="email"
                id="loginEmail"
                label="Email Address"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
              
              <div className="form-group">
                <label htmlFor="loginPassword">Password</label>
                <div className="password-wrapper">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    id="loginPassword"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
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
              
              <div className="form-options">
                <label className="remember-me">
                  <input 
                    type="checkbox" 
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={loading}
                  /> Remember me
                </label>
                <a href="#" onClick={(e) => {e.preventDefault(); alert('Password reset: Please contact your administrator or create a new account.')}}>Forgot password?</a>
              </div>
              
              <Button 
                type="submit" 
                variant="primary" 
                fullWidth 
                icon={loading ? <i className="fas fa-spinner fa-spin"></i> : <i className="fas fa-sign-in-alt"></i>}
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login to Dashboard'}
              </Button>
            </form>

            <div className="auth-divider">or</div>

            <Link to="/register" className="btn btn-outline btn-full">
              <i className="fas fa-user-plus"></i> Create New Account
            </Link>

            <div className="auth-footer">
              Don't have an account? <Link to="/register">Register Free</Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Login
