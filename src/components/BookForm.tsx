import React, { useState, useEffect } from 'react'
import { useBooks } from '../context/BookContext'
import { Book } from '../types'

export default function BookForm({ book, onClose }: { book?: Book, onClose: () => void }) {
  const { addBook, updateBook } = useBooks()
  const [title, setTitle] = useState(book?.title ?? '')
  const [author, setAuthor] = useState(book?.author ?? '')
  const [year, setYear] = useState(book?.year ? String(book.year) : '')
  const [description, setDescription] = useState(book?.description ?? '')
  const [errors, setErrors] = useState<{[k:string]:string}>({})

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const validate = () => {
    const errs: {[k:string]:string} = {}
    if (!title.trim()) errs.title = 'Title is required'
    if (!author.trim()) errs.author = 'Author is required'
    if (!year.trim() || Number.isNaN(Number(year))) errs.year = 'Valid year is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    try {
      const payload = { title: title.trim(), author: author.trim(), year: Number(year), description: description.trim() || undefined }
      if (book) updateBook({ ...book, ...payload })
      else addBook(payload)
      onClose()
    } catch (err:any) {
      setErrors({ form: 'Failed to save. Try again.' })
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded p-4 w-full max-w-lg mx-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{book ? 'Edit Book' : 'Add Book'}</h3>
          <button onClick={onClose} className="text-gray-600">✕</button>
        </div>

        {errors.form && <div className="text-red-600 mb-2">{errors.form}</div>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm">Title</label>
            <input value={title} onChange={e=>setTitle(e.target.value)} className={`w-full border rounded px-2 py-1 ${errors.title ? 'border-red-500' : ''}`} />
            {errors.title && <div className="text-red-600 text-sm">{errors.title}</div>}
          </div>

          <div>
            <label className="block text-sm">Author</label>
            <input value={author} onChange={e=>setAuthor(e.target.value)} className={`w-full border rounded px-2 py-1 ${errors.author ? 'border-red-500' : ''}`} />
            {errors.author && <div className="text-red-600 text-sm">{errors.author}</div>}
          </div>

          <div>
            <label className="block text-sm">Year</label>
            <input value={year} onChange={e=>setYear(e.target.value)} className={`w-full border rounded px-2 py-1 ${errors.year ? 'border-red-500' : ''}`} />
            {errors.year && <div className="text-red-600 text-sm">{errors.year}</div>}
          </div>

          <div>
            <label className="block text-sm">Description (optional)</label>
            <textarea value={description} onChange={e=>setDescription(e.target.value)} className="w-full border rounded px-2 py-1" />
          </div>

          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">{book ? 'Save' : 'Add'}</button>
          </div>
        </form>
      </div>
    </div>
  )
}
