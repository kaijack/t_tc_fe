import React from 'react';
import Modal from './Modal';

interface DeleteModalProps {
  title: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteModal({ title, onConfirm, onCancel }: DeleteModalProps) {
  return (
    <Modal isOpen={true} onClose={onCancel} title="Confirm Delete" size="sm">
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
    </Modal>
  );
}
