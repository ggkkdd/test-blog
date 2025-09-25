import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Calendar, DollarSign, Users, Home, Settings, Star, TrendingUp } from 'lucide-react'
import './HostDashboard.css'

const HostDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview')
  
  // Mock data - in a real app, this would come from an API
  const hostStats = {
    totalProperties: 3,
    totalBookings: 24,
    totalEarnings: 2840,
    averageRating: 4.8,
    occupancyRate: 78
  }
  
  const properties = [
    {
      id: 1,
      title: 'Cozy apartment in the heart of the city',
      location: 'New York, NY',
      price: 120,
      rating: 4.8,
      bookings: 12,
      earnings: 1440,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=300',
      status: 'active'
    },
    {
      id: 2,
      title: 'Modern loft with city views',
      location: 'Los Angeles, CA',
      price: 200,
      rating: 4.9,
      bookings: 8,
      earnings: 1600,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=300',
      status: 'active'
    },
    {
      id: 3,
      title: 'Beachfront villa with pool',
      location: 'Miami, FL',
      price: 350,
      rating: 4.7,
      bookings: 4,
      earnings: 1400,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=300',
      status: 'inactive'
    }
  ]
  
  const recentBookings = [
    {
      id: 1,
      guest: 'John Doe',
      property: 'Cozy apartment in the heart of the city',
      checkIn: '2024-01-15',
      checkOut: '2024-01-18',
      status: 'confirmed',
      amount: 360
    },
    {
      id: 2,
      guest: 'Jane Smith',
      property: 'Modern loft with city views',
      checkIn: '2024-01-20',
      checkOut: '2024-01-25',
      status: 'pending',
      amount: 1000
    },
    {
      id: 3,
      guest: 'Mike Johnson',
      property: 'Beachfront villa with pool',
      checkIn: '2024-02-01',
      checkOut: '2024-02-05',
      status: 'confirmed',
      amount: 1400
    }
  ]

  return (
    <div className="host-dashboard">
      <div className="dashboard-header">
        <h1>Welcome back, Sarah!</h1>
        <Link to="/new-property" className="add-property-btn">
          <Plus size={20} />
          Add new property
        </Link>
      </div>

      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">
            <Home size={24} />
          </div>
          <div className="stat-info">
            <h3>{hostStats.totalProperties}</h3>
            <p>Total Properties</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <Calendar size={24} />
          </div>
          <div className="stat-info">
            <h3>{hostStats.totalBookings}</h3>
            <p>Total Bookings</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <DollarSign size={24} />
          </div>
          <div className="stat-info">
            <h3>${hostStats.totalEarnings}</h3>
            <p>Total Earnings</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <Star size={24} />
          </div>
          <div className="stat-info">
            <h3>{hostStats.averageRating}</h3>
            <p>Average Rating</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <TrendingUp size={24} />
          </div>
          <div className="stat-info">
            <h3>{hostStats.occupancyRate}%</h3>
            <p>Occupancy Rate</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content">
        <div className="dashboard-tabs">
          <button 
            className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button 
            className={`tab-btn ${activeTab === 'properties' ? 'active' : ''}`}
            onClick={() => setActiveTab('properties')}
          >
            Properties
          </button>
          <button 
            className={`tab-btn ${activeTab === 'bookings' ? 'active' : ''}`}
            onClick={() => setActiveTab('bookings')}
          >
            Bookings
          </button>
          <button 
            className={`tab-btn ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>

        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="overview-tab">
              <div className="overview-section">
                <h2>Your Properties</h2>
                <div className="properties-preview">
                  {properties.slice(0, 2).map(property => (
                    <div key={property.id} className="property-preview">
                      <img src={property.image} alt={property.title} />
                      <div className="property-preview-info">
                        <h4>{property.title}</h4>
                        <p>{property.location}</p>
                        <div className="property-preview-stats">
                          <span>{property.bookings} bookings</span>
                          <span>${property.earnings} earned</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="#" className="view-all-link">View all properties</Link>
              </div>
              
              <div className="overview-section">
                <h2>Recent Bookings</h2>
                <div className="bookings-preview">
                  {recentBookings.slice(0, 3).map(booking => (
                    <div key={booking.id} className="booking-preview">
                      <div className="booking-info">
                        <h4>{booking.guest}</h4>
                        <p>{booking.property}</p>
                        <p className="booking-dates">{booking.checkIn} - {booking.checkOut}</p>
                      </div>
                      <div className="booking-status">
                        <span className={`status ${booking.status}`}>
                          {booking.status}
                        </span>
                        <span className="amount">${booking.amount}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="#" className="view-all-link">View all bookings</Link>
              </div>
            </div>
          )}

          {activeTab === 'properties' && (
            <div className="properties-tab">
              <div className="properties-list">
                {properties.map(property => (
                  <div key={property.id} className="property-item">
                    <img src={property.image} alt={property.title} />
                    <div className="property-item-info">
                      <h3>{property.title}</h3>
                      <p>{property.location}</p>
                      <div className="property-item-stats">
                        <span className="rating">
                          <Star size={14} fill="#ff385c" />
                          {property.rating}
                        </span>
                        <span>{property.bookings} bookings</span>
                        <span>${property.earnings} earned</span>
                      </div>
                    </div>
                    <div className="property-item-actions">
                      <span className={`status-badge ${property.status}`}>
                        {property.status}
                      </span>
                      <button className="edit-btn">Edit</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="bookings-tab">
              <div className="bookings-list">
                {recentBookings.map(booking => (
                  <div key={booking.id} className="booking-item">
                    <div className="booking-item-info">
                      <h3>{booking.guest}</h3>
                      <p>{booking.property}</p>
                      <p className="booking-dates">{booking.checkIn} - {booking.checkOut}</p>
                    </div>
                    <div className="booking-item-status">
                      <span className={`status ${booking.status}`}>
                        {booking.status}
                      </span>
                      <span className="amount">${booking.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="settings-tab">
              <div className="settings-section">
                <h2>Profile Settings</h2>
                <div className="settings-form">
                  <div className="form-group">
                    <label>First Name</label>
                    <input type="text" defaultValue="Sarah" />
                  </div>
                  <div className="form-group">
                    <label>Last Name</label>
                    <input type="text" defaultValue="Johnson" />
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input type="email" defaultValue="sarah@example.com" />
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input type="tel" defaultValue="+1 (555) 123-4567" />
                  </div>
                  <button className="save-btn">Save Changes</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HostDashboard