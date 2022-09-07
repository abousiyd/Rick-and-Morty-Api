import React from 'react'
import { Routes, Route, HashRouter as Router } from "react-router-dom";
import Gallery from './pages/gallery';
import './styles/main.scss'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Gallery />} />
      </Routes>
    </Router>
  )
}

export default App