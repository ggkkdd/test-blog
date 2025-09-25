import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>Support</h3>
          <a href="#">Help Center</a>
          <a href="#">AirCover</a>
          <a href="#">Anti-discrimination</a>
          <a href="#">Disability support</a>
        </div>
        <div className="footer-section">
          <h3>Hosting</h3>
          <a href="#">Airbnb your home</a>
          <a href="#">AirCover for Hosts</a>
          <a href="#">Hosting resources</a>
          <a href="#">Community forum</a>
        </div>
        <div className="footer-section">
          <h3>Airbnb</h3>
          <a href="#">Newsroom</a>
          <a href="#">New features</a>
          <a href="#">Careers</a>
          <a href="#">Investors</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; 2024 Airbnb Clone. Not affiliated with Airbnb, Inc.</p>
      </div>
    </footer>
  )
}

export default Footer