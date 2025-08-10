import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import BookDetails from './pages/BookDetails'
import About from './pages/About'

export default function App(){
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto p-4 flex justify-between items-center">
          <Link to="/" className="font-bold text-xl">Books Dashboard</Link>
          <nav className="space-x-4">
            <Link to="/" className="text-sm">Home</Link>
            <Link to="/about" className="text-sm">About</Link>
          </nav>
        </div>
      </header>

      <main className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books/:id" element={<BookDetails />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  )
}
