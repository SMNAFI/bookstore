import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navigation from './components/Navigation'
import AddBook from './pages/AddBook'
import EditBook from './pages/EditBook'
import Home from './pages/Home'

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add-book' element={<AddBook />} />
        <Route path='/edit-book/:bookId' element={<EditBook />} />
      </Routes>
    </Router>
  )
}

export default App
