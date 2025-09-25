import React from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Star } from 'lucide-react'
import './Home.css'

const Home = () => {
  const featuredProperties = [
    {
      id: 1,
      title: 'Cozy apartment in the heart of the city',
      location: 'New York, NY',
      price: 120,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400'
    },
    {
      id: 2,
      title: 'Modern loft with city views',
      location: 'Los Angeles, CA',
      price: 200,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400'
    },
    {
      id: 3,
      title: 'Beachfront villa with pool',
      location: 'Miami, FL',
      price: 350,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400'
    }
  ]

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <h1>Find your next stay</h1>
          <p>Search deals on hotels, homes, and much more...</p>
        </div>
      </section>

      <section className="featured-properties">
        <h2>Popular destinations</h2>
        <div className="properties-grid">
          {featuredProperties.map(property => (
            <Link to={`/property/${property.id}`} key={property.id} className="property-card">
              <div className="property-image">
                <img src={property.image} alt={property.title} />
                <div className="property-overlay">
                  <div className="property-rating">
                    <Star size={16} fill="white" />
                    <span>{property.rating}</span>
                  </div>
                </div>
              </div>
              <div className="property-info">
                <div className="property-location">
                  <MapPin size={14} />
                  <span>{property.location}</span>
                </div>
                <h3>{property.title}</h3>
                <div className="property-price">
                  <strong>${property.price}</strong>
                  <span> / night</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Home