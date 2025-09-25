import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Star, Heart, Share, MapPin, Wifi, Car, Home, Users, Calendar, User } from 'lucide-react'
import './PropertyDetails.css'

const PropertyDetails = () => {
  const { id } = useParams()
  const [selectedImage, setSelectedImage] = useState(0)
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1,
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  })
  const [bookingStep, setBookingStep] = useState('dates') // 'dates', 'details', 'confirmation'
  
  // Mock data - in a real app, this would come from an API based on the id
  const property = {
    id: parseInt(id),
    title: 'Cozy apartment in the heart of the city',
    location: 'New York, NY',
    price: 120,
    rating: 4.8,
    reviews: 127,
    host: {
      name: 'Sarah',
      image: 'https://images.unsplash.com/photo-1494790108755-2616c6f5c8e8?w=150',
      joinedDate: 'March 2019',
      responseRate: '98%'
    },
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800',
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800',
      'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800'
    ],
    description: 'Enjoy your stay in this cozy apartment located in the heart of Manhattan. Perfect for couples or solo travelers looking to explore the city.',
    amenities: [
      { icon: Wifi, name: 'WiFi' },
      { icon: Car, name: 'Parking' },
      { icon: Home, name: 'Kitchen' },
      { icon: Users, name: 'Max 4 guests' }
    ],
    highlights: [
      'Great location',
      'Fast WiFi',
      'Self check-in',
      'Great for couples'
    ]
  }

  const handleBookingInputChange = (field, value) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleReserve = () => {
    if (bookingStep === 'dates') {
      if (bookingData.checkIn && bookingData.checkOut) {
        setBookingStep('details')
      } else {
        alert('Please select both check-in and check-out dates')
      }
    } else if (bookingStep === 'details') {
      if (bookingData.firstName && bookingData.lastName && bookingData.email) {
        setBookingStep('confirmation')
        // In a real app, this would make an API call to create the booking
        setTimeout(() => {
          alert('Booking confirmed! You will receive a confirmation email shortly.')
          setBookingStep('dates')
          setBookingData({
            checkIn: '',
            checkOut: '',
            guests: 1,
            firstName: '',
            lastName: '',
            email: '',
            phone: ''
          })
        }, 2000)
      } else {
        alert('Please fill in all required fields')
      }
    }
  }

  const calculateNights = () => {
    if (bookingData.checkIn && bookingData.checkOut) {
      const checkIn = new Date(bookingData.checkIn)
      const checkOut = new Date(bookingData.checkOut)
      const diffTime = Math.abs(checkOut - checkIn)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
      return diffDays
    }
    return 0
  }

  const calculateTotal = () => {
    const nights = calculateNights()
    const subtotal = nights * property.price
    const serviceFee = subtotal * 0.14 // 14% service fee
    const taxes = subtotal * 0.12 // 12% taxes
    return {
      subtotal,
      serviceFee,
      taxes,
      total: subtotal + serviceFee + taxes
    }
  }

  return (
    <div className="property-details">
      <div className="property-images">
        <div className="main-image">
          <img src={property.images[selectedImage]} alt={property.title} />
        </div>
        <div className="image-thumbnails">
          {property.images.map((image, index) => (
            <button
              key={index}
              className={`thumbnail ${selectedImage === index ? 'active' : ''}`}
              onClick={() => setSelectedImage(index)}
            >
              <img src={image} alt={`${property.title} ${index + 1}`} />
            </button>
          ))}
        </div>
        <div className="image-actions">
          <button className="action-btn">
            <Share size={20} />
            Share
          </button>
          <button className="action-btn">
            <Heart size={20} />
            Save
          </button>
        </div>
      </div>

      <div className="property-content">
        <div className="property-header">
          <div className="property-title">
            <h1>{property.title}</h1>
            <div className="property-meta">
              <div className="rating">
                <Star size={16} fill="#ff385c" />
                <span>{property.rating}</span>
                <span>({property.reviews} reviews)</span>
              </div>
              <div className="location">
                <MapPin size={16} />
                <span>{property.location}</span>
              </div>
            </div>
          </div>
          <div className="host-info">
            <img src={property.host.image} alt={property.host.name} />
            <div>
              <div className="host-name">Hosted by {property.host.name}</div>
              <div className="host-since">Host since {property.host.joinedDate}</div>
            </div>
          </div>
        </div>

        <div className="property-booking">
          <div className="price-section">
            <div className="price">
              <strong>${property.price}</strong>
              <span> / night</span>
            </div>
            
            {bookingStep === 'dates' && (
              <div className="booking-form">
                <div className="date-inputs">
                  <div className="input-group">
                    <label>Check in</label>
                    <input 
                      type="date" 
                      value={bookingData.checkIn}
                      onChange={(e) => handleBookingInputChange('checkIn', e.target.value)}
                    />
                  </div>
                  <div className="input-group">
                    <label>Check out</label>
                    <input 
                      type="date"
                      value={bookingData.checkOut}
                      onChange={(e) => handleBookingInputChange('checkOut', e.target.value)}
                    />
                  </div>
                </div>
                <div className="guests-input">
                  <label>Guests</label>
                  <select
                    value={bookingData.guests}
                    onChange={(e) => handleBookingInputChange('guests', parseInt(e.target.value))}
                  >
                    <option value={1}>1 guest</option>
                    <option value={2}>2 guests</option>
                    <option value={3}>3 guests</option>
                    <option value={4}>4 guests</option>
                  </select>
                </div>
                <button 
                  className="reserve-btn"
                  onClick={handleReserve}
                  disabled={!bookingData.checkIn || !bookingData.checkOut}
                >
                  {calculateNights() > 0 ? `Reserve ${calculateNights()} night${calculateNights() > 1 ? 's' : ''}` : 'Reserve'}
                </button>
              </div>
            )}

            {bookingStep === 'details' && (
              <div className="booking-form">
                <div className="booking-summary">
                  <h3>Your trip</h3>
                  <div className="summary-row">
                    <span>Dates</span>
                    <span>{bookingData.checkIn} to {bookingData.checkOut}</span>
                  </div>
                  <div className="summary-row">
                    <span>Guests</span>
                    <span>{bookingData.guests} guest{bookingData.guests > 1 ? 's' : ''}</span>
                  </div>
                </div>
                
                <div className="guest-details">
                  <h3>Guest details</h3>
                  <div className="name-inputs">
                    <input
                      type="text"
                      placeholder="First name"
                      value={bookingData.firstName}
                      onChange={(e) => handleBookingInputChange('firstName', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Last name"
                      value={bookingData.lastName}
                      onChange={(e) => handleBookingInputChange('lastName', e.target.value)}
                    />
                  </div>
                  <input
                    type="email"
                    placeholder="Email address"
                    value={bookingData.email}
                    onChange={(e) => handleBookingInputChange('email', e.target.value)}
                  />
                  <input
                    type="tel"
                    placeholder="Phone number (optional)"
                    value={bookingData.phone}
                    onChange={(e) => handleBookingInputChange('phone', e.target.value)}
                  />
                </div>

                <button className="reserve-btn" onClick={handleReserve}>
                  Continue to payment
                </button>
              </div>
            )}

            {bookingStep === 'confirmation' && (
              <div className="booking-confirmation">
                <div className="confirmation-icon">
                  <Calendar size={48} color="#ff385c" />
                </div>
                <h3>Confirming your reservation...</h3>
                <p>Processing your booking for {calculateNights()} night{calculateNights() > 1 ? 's' : ''}</p>
              </div>
            )}

            {bookingStep !== 'confirmation' && (
              <div className="price-breakdown">
                {bookingData.checkIn && bookingData.checkOut && (
                  <>
                    <div className="breakdown-row">
                      <span>${property.price} × {calculateNights()} night{calculateNights() > 1 ? 's' : ''}</span>
                      <span>${calculateTotal().subtotal}</span>
                    </div>
                    <div className="breakdown-row">
                      <span>Service fee</span>
                      <span>${calculateTotal().serviceFee.toFixed(2)}</span>
                    </div>
                    <div className="breakdown-row">
                      <span>Taxes</span>
                      <span>${calculateTotal().taxes.toFixed(2)}</span>
                    </div>
                    <hr />
                    <div className="breakdown-row total">
                      <span>Total</span>
                      <span>${calculateTotal().total.toFixed(2)}</span>
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="property-description">
          <h2>About this place</h2>
          <p>{property.description}</p>
          
          <div className="amenities">
            <h3>What this place offers</h3>
            <div className="amenities-grid">
              {property.amenities.map((amenity, index) => (
                <div key={index} className="amenity">
                  <amenity.icon size={20} />
                  <span>{amenity.name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="highlights">
            <h3>Highlights</h3>
            <ul>
              {property.highlights.map((highlight, index) => (
                <li key={index}>{highlight}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetails