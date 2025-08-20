// src/components/molecules/BookCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { Book } from '../../../types';

interface BookCardProps {
  book: Book;
  onEdit: (book: Book) => void;
  onDelete: (book: Book) => void;
}

export default function BookCard({ book, onEdit, onDelete }: BookCardProps) {
  return (
    <div className="border p-4 rounded shadow-sm">
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
            onClick={() => onEdit(book)}
            className="text-sm px-2 py-1 border rounded"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(book)}
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
  );
}
