import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { useBooks } from '../context/BookContext'

export default function BookDetails() {
  const { id } = useParams<{ id: string }>()
  const { books, isLoading, isError } = useBooks()

  if (isLoading) {
    return <div className="p-4">Loading book...</div>
  }

  if (isError) {
    return (
      <div className="p-4 text-red-600">
        Failed to load books.
        <div>
          <Link to="/" className="text-blue-600">Back</Link>
        </div>
      </div>
    )
  }

  const book = books.find(b => String(b.id) === id)

  if (!book) {
    return (
      <div className="p-4">
        <div className="text-red-600">Book not found.</div>
        <Link to="/" className="text-blue-600">Back</Link>
      </div>
    )
  }

  return (
    <div className="p-4">
      <Link to="/" className="text-blue-600">← Back</Link>
      <h1 className="text-2xl font-bold mt-2">{book.title}</h1>
      <div className="text-sm text-gray-600">
        {book.author} — {book.year}
      </div>
      <p className="mt-4">{book.description ?? 'No description'}</p>
    </div>
  )
}
