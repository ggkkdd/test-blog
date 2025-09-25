import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Search, Menu, User } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import AuthModal from './AuthModal'
import './Header.css'

const Header = ({ onSearch }) => {
  const [searchData, setSearchData] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  })
  const [showAuthModal, setShowAuthModal] = useState(false)
  const [authMode, setAuthMode] = useState('login')
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleSearch = (e) => {
    e.preventDefault()
    if (onSearch) {
      onSearch(searchData)
    }
    navigate('/listings')
  }

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleAuthClick = (mode = 'login') => {
    setAuthMode(mode)
    setShowAuthModal(true)
  }

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          <span>airbnb</span>
        </Link>
        
        <form onSubmit={handleSearch} className="search-bar">
          <div className="search-input-group">
            <input
              type="text"
              className="search-section"
              placeholder="Where are you going?"
              value={searchData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
            />
            <input
              type="date"
              className="search-section"
              placeholder="Check in"
              value={searchData.checkIn}
              onChange={(e) => handleInputChange('checkIn', e.target.value)}
            />
            <input
              type="date"
              className="search-section"
              placeholder="Check out"
              value={searchData.checkOut}
              onChange={(e) => handleInputChange('checkOut', e.target.value)}
            />
            <select
              className="search-section"
              value={searchData.guests}
              onChange={(e) => handleInputChange('guests', parseInt(e.target.value))}
            >
              <option value={1}>1 guest</option>
              <option value={2}>2 guests</option>
              <option value={3}>3 guests</option>
              <option value={4}>4 guests</option>
              <option value={5}>5 guests</option>
              <option value={6}>6+ guests</option>
            </select>
          </div>
          <button type="submit" className="search-button">
            <Search size={18} />
          </button>
        </form>
        
        <div className="header-right">
          <Link to="/host" className="host-link">
            Switch to hosting
          </Link>
          {user ? (
            <div className="user-menu" onClick={handleLogout}>
              <img src={user.avatar} alt={user.name} className="user-avatar" />
              <span className="user-name">{user.name.split(' ')[0]}</span>
            </div>
          ) : (
            <div className="user-menu" onClick={() => handleAuthClick('login')}>
              <Menu size={20} />
              <User size={20} />
            </div>
          )}
        </div>
      </div>
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </header>
  )
}

export default Header