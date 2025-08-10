import React, { createContext, useContext, ReactNode } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { Book } from '../types'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080'

async function fetchBooks(): Promise<Book[]> {
  const res = await fetch(`${API_URL}/books`)
  if (!res.ok) throw new Error('Failed to load books')
  return res.json()
}

async function addBookAPI(b: Omit<Book, 'id'>): Promise<Book> {
  const res = await fetch(`${API_URL}/books`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(b),
  })
  if (!res.ok) throw new Error('Failed to add book')
  return res.json()
}

async function updateBookAPI(b: Book): Promise<Book> {
  const res = await fetch(`${API_URL}/books/${b.id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(b),
  })
  if (!res.ok) throw new Error('Failed to update book')
  return res.json()
}

async function deleteBookAPI(id: string): Promise<void> {
  const res = await fetch(`${API_URL}/books/${id}`, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to delete book')
}

type BookContextType = {
  books: Book[]
  isLoading: boolean
  isError: boolean
  addBook: (b: Omit<Book, 'id'>) => void
  updateBook: (b: Book) => void
  deleteBook: (id: string) => void
}

const BookContext = createContext<BookContextType | undefined>(undefined)

export const BookProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient()

  // Queries
  const { data: books = [], isLoading, isError } = useQuery({
    queryKey: ['books'],
    queryFn: fetchBooks,
  })

  // Mutations
  const addBookMutation = useMutation({
    mutationFn: addBookAPI,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['books'] }),
  })

  const updateBookMutation = useMutation({
    mutationFn: updateBookAPI,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['books'] }),
  })

  const deleteBookMutation = useMutation({
    mutationFn: deleteBookAPI,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['books'] }),
  })

  return (
    <BookContext.Provider
      value={{
        books,
        isLoading,
        isError,
        addBook: (b) => addBookMutation.mutate(b),
        updateBook: (b) => updateBookMutation.mutate(b),
        deleteBook: (id) => deleteBookMutation.mutate(id),
      }}
    >
      {children}
    </BookContext.Provider>
  )
}

export const useBooks = () => {
  const ctx = useContext(BookContext)
  if (!ctx) throw new Error('useBooks must be used inside BookProvider')
  return ctx
}
