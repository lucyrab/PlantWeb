import './styles/App.css'
import React from "react"
import { BrowserRouter, Route, Routes, Link } from 'react-router-dom'
import Listings from './pages/Listings.jsx'
import Details from './pages/Details.jsx'

export default function App() {
  return (
    <BrowserRouter>
          <Routes>
            <Route path="/" element={ <Listings/> } />
            <Route path="/:page" element={ <Listings/> } />
            <Route path="/details/:id" element={<Details/>} />
          </Routes>
    </BrowserRouter>
  )
}

