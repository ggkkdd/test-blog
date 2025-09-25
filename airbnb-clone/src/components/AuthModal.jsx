import React, { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { X } from 'lucide-react'
import './AuthModal.css'

const AuthModal = ({ isOpen, onClose, initialMode = 'login' }) => {
  const [mode, setMode] = useState(initialMode)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  
  const { login, signup } = useAuth()

  const handleInputChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      let result
      if (mode === 'login') {
        result = await login(formData.email, formData.password)
      } else {
        if (formData.password !== formData.confirmPassword) {
          setError('Passwords do not match')
          setLoading(false)
          return
        }
        result = await signup(formData.name, formData.email, formData.password)
      }

      if (result.success) {
        onClose()
      } else {
        setError(result.error)
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    }

    setLoading(false)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
    setError('')
  }

  const switchMode = (newMode) => {
    setMode(newMode)
    resetForm()
  }

  if (!isOpen) return null

  return (
    <div className="auth-modal-overlay" onClick={onClose}>
      <div className="auth-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <X size={24} />
        </button>
        
        <div className="auth-header">
          <h2>{mode === 'login' ? 'Log in' : 'Sign up'}</h2>
          <p>
            {mode === 'login' 
              ? 'Welcome back! Please enter your details.'
              : 'Welcome! Please fill in the details to get started.'
            }
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'signup' && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your full name"
                required
              />
            </div>
          )}

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {mode === 'signup' && (
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="Confirm your password"
                required
              />
            </div>
          )}

          {error && <div className="error-message">{error}</div>}

          <button 
            type="submit" 
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading ? 'Please wait...' : (mode === 'login' ? 'Log in' : 'Sign up')}
          </button>
        </form>

        <div className="auth-footer">
          {mode === 'login' ? (
            <p>
              Don't have an account?{' '}
              <button 
                type="button" 
                className="auth-link"
                onClick={() => switchMode('signup')}
              >
                Sign up
              </button>
            </p>
          ) : (
            <p>
              Already have an account?{' '}
              <button 
                type="button" 
                className="auth-link"
                onClick={() => switchMode('login')}
              >
                Log in
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthModal