import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import './index.css'
import { BookProvider } from './context/BookContext'

// Create one QueryClient for the whole app
const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <BookProvider>
          <App />
        </BookProvider>
      </BrowserRouter>
    </QueryClientProvider>
  </React.StrictMode>
)
