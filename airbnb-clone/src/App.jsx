import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import PropertyListing from './pages/PropertyListing'
import PropertyDetails from './pages/PropertyDetails'
import HostDashboard from './pages/HostDashboard'
import './App.css'

function App() {
  const [searchData, setSearchData] = useState(null)

  const handleSearch = (searchParams) => {
    setSearchData(searchParams)
  }

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header onSearch={handleSearch} />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/listings" element={<PropertyListing />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
              <Route path="/host" element={<HostDashboard />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App