import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { MapPin, Star, Filter, SlidersHorizontal } from 'lucide-react'
import './PropertyListing.css'

const PropertyListing = () => {
  const [filterOpen, setFilterOpen] = useState(false)
  const [filteredProperties, setFilteredProperties] = useState([])
  const [filters, setFilters] = useState({
    priceMin: '',
    priceMax: '',
    propertyType: [],
    amenities: []
  })
  const [searchParams, setSearchParams] = useState({
    location: '',
    checkIn: '',
    checkOut: '',
    guests: 1
  })
  
  const location = useLocation()

  // Get search parameters from navigation state
  useEffect(() => {
    const searchData = location.state?.searchData
    if (searchData) {
      setSearchParams(searchData)
    }
  }, [location.state])

  // Mock data - in a real app, this would come from an API
  const properties = [
    {
      id: 1,
      title: 'Cozy apartment in the heart of the city',
      location: 'New York, NY',
      price: 120,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400',
      host: 'Sarah',
      type: 'Entire apartment'
    },
    {
      id: 2,
      title: 'Modern loft with city views',
      location: 'Los Angeles, CA',
      price: 200,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400',
      host: 'Michael',
      type: 'Entire loft'
    },
    {
      id: 3,
      title: 'Beachfront villa with pool',
      location: 'Miami, FL',
      price: 350,
      rating: 4.7,
      image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400',
      host: 'Emma',
      type: 'Entire villa'
    },
    {
      id: 4,
      title: 'Charming cottage in the woods',
      location: 'Portland, OR',
      price: 95,
      rating: 4.6,
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400',
      host: 'David',
      type: 'Entire cottage'
    },
    {
      id: 5,
      title: 'Luxury penthouse downtown',
      location: 'Chicago, IL',
      price: 280,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
      host: 'Lisa',
      type: 'Entire penthouse'
    },
    {
      id: 6,
      title: 'Rustic cabin by the lake',
      location: 'Lake Tahoe, CA',
      price: 150,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
      host: 'John',
      type: 'Entire cabin'
    }
  ]

  // Filter properties based on search params and filters
  useEffect(() => {
    let filtered = properties

    // Filter by location
    if (searchParams.location) {
      filtered = filtered.filter(property => 
        property.location.toLowerCase().includes(searchParams.location.toLowerCase()) ||
        property.title.toLowerCase().includes(searchParams.location.toLowerCase())
      )
    }

    // Filter by price range
    if (filters.priceMin) {
      filtered = filtered.filter(property => property.price >= parseInt(filters.priceMin))
    }
    if (filters.priceMax) {
      filtered = filtered.filter(property => property.price <= parseInt(filters.priceMax))
    }

    // Filter by property type
    if (filters.propertyType.length > 0) {
      filtered = filtered.filter(property => 
        filters.propertyType.some(type => property.type.toLowerCase().includes(type.toLowerCase()))
      )
    }

    setFilteredProperties(filtered)
  }, [searchParams, filters, properties])

  const handleFilterChange = (filterType, value) => {
    if (filterType === 'priceMin' || filterType === 'priceMax') {
      setFilters(prev => ({
        ...prev,
        [filterType]: value
      }))
    } else if (filterType === 'propertyType' || filterType === 'amenities') {
      setFilters(prev => ({
        ...prev,
        [filterType]: prev[filterType].includes(value)
          ? prev[filterType].filter(item => item !== value)
          : [...prev[filterType], value]
      }))
    }
  }

  const clearFilters = () => {
    setFilters({
      priceMin: '',
      priceMax: '',
      propertyType: [],
      amenities: []
    })
  }

  return (
    <div className="property-listing">
      <div className="listing-header">
        <div>
          <h1>
            {searchParams.location ? `Stays in ${searchParams.location}` : 'Stays in popular destinations'}
          </h1>
          {searchParams.location && (
            <p className="search-summary">
              {filteredProperties.length} stays • {searchParams.guests} guest{searchParams.guests > 1 ? 's' : ''}
              {searchParams.checkIn && searchParams.checkOut && ` • ${searchParams.checkIn} to ${searchParams.checkOut}`}
            </p>
          )}
        </div>
        <button 
          className="filter-toggle"
          onClick={() => setFilterOpen(!filterOpen)}
        >
          <SlidersHorizontal size={18} />
          Filters
        </button>
      </div>

      <div className="listing-content">
        <aside className={`filters ${filterOpen ? 'open' : ''}`}>
          <div className="filter-actions">
            <button onClick={clearFilters} className="clear-filters">
              Clear all filters
            </button>
          </div>
          
          <div className="filter-section">
            <h3>Price range</h3>
            <div className="price-inputs">
              <input 
                type="number" 
                placeholder="Min price"
                value={filters.priceMin}
                onChange={(e) => handleFilterChange('priceMin', e.target.value)}
              />
              <input 
                type="number" 
                placeholder="Max price"
                value={filters.priceMax}
                onChange={(e) => handleFilterChange('priceMax', e.target.value)}
              />
            </div>
          </div>
          <div className="filter-section">
            <h3>Property type</h3>
            <label>
              <input 
                type="checkbox" 
                checked={filters.propertyType.includes('Entire')}
                onChange={() => handleFilterChange('propertyType', 'Entire')}
              /> 
              Entire place
            </label>
            <label>
              <input 
                type="checkbox"
                checked={filters.propertyType.includes('Private')}
                onChange={() => handleFilterChange('propertyType', 'Private')}
              /> 
              Private room
            </label>
            <label>
              <input 
                type="checkbox"
                checked={filters.propertyType.includes('Shared')}
                onChange={() => handleFilterChange('propertyType', 'Shared')}
              /> 
              Shared room
            </label>
          </div>
          <div className="filter-section">
            <h3>Amenities</h3>
            <label>
              <input 
                type="checkbox"
                checked={filters.amenities.includes('WiFi')}
                onChange={() => handleFilterChange('amenities', 'WiFi')}
              /> 
              WiFi
            </label>
            <label>
              <input 
                type="checkbox"
                checked={filters.amenities.includes('Kitchen')}
                onChange={() => handleFilterChange('amenities', 'Kitchen')}
              /> 
              Kitchen
            </label>
            <label>
              <input 
                type="checkbox"
                checked={filters.amenities.includes('Pool')}
                onChange={() => handleFilterChange('amenities', 'Pool')}
              /> 
              Pool
            </label>
          </div>
        </aside>

        <div className="properties-container">
          <div className="properties-grid">
            {filteredProperties.length > 0 ? (
              filteredProperties.map(property => (
              <Link to={`/property/${property.id}`} key={property.id} className="property-card">
                <div className="property-image">
                  <img src={property.image} alt={property.title} />
                  <div className="property-overlay">
                    <div className="property-rating">
                      <Star size={14} fill="white" />
                      <span>{property.rating}</span>
                    </div>
                  </div>
                </div>
                <div className="property-info">
                  <div className="property-header">
                    <div className="property-location">
                      <MapPin size={12} />
                      <span>{property.location}</span>
                    </div>
                    <div className="property-type">{property.type}</div>
                  </div>
                  <h3>{property.title}</h3>
                  <div className="property-host">Hosted by {property.host}</div>
                  <div className="property-price">
                    <strong>${property.price}</strong>
                    <span> / night</span>
                  </div>
                </div>
              </Link>
              ))
            ) : (
              <div className="no-results">
                <p>No properties found matching your criteria.</p>
                <button onClick={clearFilters} className="clear-filters">
                  Clear filters
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyListing