import React from 'react'

interface DeleteModalProps {
  title: string
  onConfirm: () => void
  onCancel: () => void
}

export default function DeleteModal({ title, onConfirm, onCancel }: DeleteModalProps) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded p-4 w-full max-w-sm shadow-lg">
        <h3 className="text-lg font-semibold mb-2">Confirm Delete</h3>
        <p className="mb-4">Are you sure you want to delete <strong>{title}</strong>?</p>
        <div className="flex justify-end space-x-2">
          <button onClick={onCancel} className="px-4 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  )
}
