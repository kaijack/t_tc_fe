import React, { useState } from 'react'
import { useBooks } from '../context/BookContext'
import BookForm from './BookForm'
import DeleteModal from './DeleteModal'
import { Link } from 'react-router-dom'
import { Book } from '../types'

export default function BookList() {
  const { books, deleteBook, isLoading, isError } = useBooks()
  const [editing, setEditing] = useState<Book | null>(null)
  const [creating, setCreating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [bookToDelete, setBookToDelete] = useState<Book | null>(null)

  if (isLoading) {
    return <div className="p-4">Loading books...</div>
  }

  if (isError) {
    return <div className="p-4 text-red-600">Failed to load books.</div>
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Books</h1>
        <div>
          <button
            onClick={() => setCreating(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            + Add Book
          </button>
        </div>
      </div>

      {error && <div className="mb-2 text-red-600">{error}</div>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {books.length === 0 && (
          <div className="text-gray-500">No books yet. Add one.</div>
        )}
        {books.map((book) => (
          <div key={book.id} className="border p-4 rounded shadow-sm">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-semibold">{book.title}</h2>
                <div className="text-sm text-gray-600">
                  {book.author} — {book.year}
                </div>
              </div>
              <div className="flex space-x-2">
                <Link
                  to={`/books/${book.id}`}
                  className="text-sm px-2 py-1 border rounded"
                >
                  View
                </Link>
                <button
                  onClick={() => setEditing(book)}
                  className="text-sm px-2 py-1 border rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => setBookToDelete(book)}
                  className="text-sm px-2 py-1 border rounded text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
            {book.description && (
              <p className="mt-2 text-sm text-gray-700">{book.description}</p>
            )}
          </div>
        ))}
      </div>

      {creating && <BookForm onClose={() => setCreating(false)} />}
      {editing && <BookForm book={editing} onClose={() => setEditing(null)} />}

      {bookToDelete && (
        <DeleteModal
          title={bookToDelete.title}
          onConfirm={async () => {
            try {
              await deleteBook(bookToDelete.id)
              setBookToDelete(null)
            } catch {
              setError('Failed to delete book.')
            }
          }}
          onCancel={() => setBookToDelete(null)}
        />
      )}
    </div>
  )
}
