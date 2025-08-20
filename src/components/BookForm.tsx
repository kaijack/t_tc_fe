import React, { useState, useEffect } from 'react';
import { useBooks } from '../context/BookContext';
import { Book } from '../types';

export default function BookForm({ book, onClose }: { book?: Book; onClose: () => void }) {
  const { addBook, updateBook } = useBooks();
  const [formData, setFormData] = useState({
    title: book?.title ?? '',
    author: book?.author ?? '',
    year: book?.year ? String(book.year) : '',
    description: book?.description ?? '',
  });
  const [errors, setErrors] = useState<{ [k: string]: string }>({});

  const validationPatterns = {
    title: /^[a-zA-Z0-9\s\-',.;:()]{3,100}$/, 
    author: /^[a-zA-Z\s\-']{3,50}$/, 
    year: /^(19|20)\d{2}$/, 
    description: /^.{0,500}$/ 
  };

  const errorMessages = {
    title: 'Title must be 3-100 characters (letters, numbers, spaces)',
    author: 'Author name must be 3-50 characters (letters and spaces only)',
    year: 'Please enter a valid year (1900-2099)',
    description: 'Description too long (max 500 characters)'
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const handleChange = (field: keyof typeof formData, value: string) => {
    
    if (field === 'year') {
      value = value.replace(/\D/g, ''); 
      if (value.length > 4) {
        value = value.slice(0, 4);
      }
    }

    setFormData(prev => ({ ...prev, [field]: value }));
    
    
    if (field !== 'description' || value) { 
      validateField(field, value);
    }
  };

  const validateField = (field: keyof typeof formData, value: string) => {
    if (!value.trim()) {
      setErrors(prev => ({ ...prev, [field]: `${field.charAt(0).toUpperCase() + field.slice(1)} is required` }));
      return false;
    }

    if (!validationPatterns[field].test(value)) {
      setErrors(prev => ({ ...prev, [field]: errorMessages[field] }));
      return false;
    }

    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[field];
      return newErrors;
    });

    return true;
  };

  const validateAll = () => {
    let isValid = true;

    (Object.keys(formData) as Array<keyof typeof formData>).forEach(field => {
      if (field !== 'description' || formData[field]) { 
        if (!validateField(field, formData[field])) {
          isValid = false;
        }
      }
    });

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateAll()) return;

    try {
      const payload = {
        title: formData.title.trim(),
        author: formData.author.trim(),
        year: Number(formData.year),
        description: formData.description.trim() || undefined,
      };
      
      if (book) {
        updateBook({ ...book, ...payload });
      } else {
        addBook(payload);
      }
      onClose();
    } catch (err: any) {
      setErrors(prev => ({ ...prev, form: 'Failed to save. Try again.' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded p-4 w-full max-w-lg mx-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-semibold">{book ? 'Edit Book' : 'Add Book'}</h3>
          <button onClick={onClose} className="text-gray-600 hover:text-gray-800">✕</button>
        </div>

        {errors.form && <div className="text-red-600 mb-2">{errors.form}</div>}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">Title *</label>
            <input
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              className={`w-full border rounded px-3 py-2 ${errors.title ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              placeholder="Book title"
            />
            {errors.title && <p className="mt-1 text-sm text-red-600">{errors.title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Author *</label>
            <input
              value={formData.author}
              onChange={(e) => handleChange('author', e.target.value)}
              className={`w-full border rounded px-3 py-2 ${errors.author ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              placeholder="Author name"
            />
            {errors.author && <p className="mt-1 text-sm text-red-600">{errors.author}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Year *</label>
            <input
              type="text"
              inputMode="numeric"
              maxLength={4}
              value={formData.year}
              onChange={(e) => handleChange('year', e.target.value)}
              className={`w-full border rounded px-3 py-2 ${errors.year ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              placeholder="Publication year"
            />
            {errors.year && <p className="mt-1 text-sm text-red-600">{errors.year}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange('description', e.target.value)}
              className={`w-full border rounded px-3 py-2 ${errors.description ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
              rows={4}
              placeholder="Optional book description"
            />
            {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
              disabled={Object.keys(errors).length > 0}
            >
              {book ? 'Update Book' : 'Add Book'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
