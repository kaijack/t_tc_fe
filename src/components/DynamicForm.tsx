// src/components/DynamicForm.tsx
import React, { useState } from 'react';
import { FormConfig, validateField, validateForm } from '../utils/formHelpers';

type DynamicFormProps = {
  config: FormConfig;
  initialValues?: Record<string, string>;
  onSubmit: (values: Record<string, string>) => void;
  onCancel?: () => void;
  submitLabel?: string;
  cancelLabel?: string;
};

const DynamicForm: React.FC<DynamicFormProps> = ({
  config,
  initialValues,
  onSubmit,
  onCancel,
  submitLabel = 'Submit',
  cancelLabel = 'Cancel'
}) => {
  const [formData, setFormData] = useState(() =>
    Object.fromEntries(
      config.fields.map(field => [
        field.name,
        initialValues?.[field.name] || ''
      ])
    )
  );
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Validate on change
    const field = config.fields.find(f => f.name === name);
    if (field) {
      setErrors(prev => ({
        ...prev,
        [name]: validateField(field, value)
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { isValid, errors: validationErrors } = validateForm(config.fields, formData);
    setErrors(validationErrors);
    
    if (isValid) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {config.fields.map(field => (
        <div key={field.name}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          
          {field.type === 'textarea' ? (
            <textarea
              value={formData[field.name]}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className={`w-full border rounded px-3 py-2 ${
                errors[field.name] ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder={field.placeholder}
              rows={4}
            />
          ) : (
            <input
              type={field.type}
              value={formData[field.name]}
              onChange={(e) => handleChange(field.name, e.target.value)}
              className={`w-full border rounded px-3 py-2 ${
                errors[field.name] ? 'border-red-500 bg-red-50' : 'border-gray-300'
              }`}
              placeholder={field.placeholder}
            />
          )}
          
          {errors[field.name] && (
            <p className="mt-1 text-sm text-red-600">{errors[field.name]}</p>
          )}
        </div>
      ))}

      <div className="flex justify-end space-x-3 pt-2">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            {cancelLabel}
          </button>
        )}
        
        <button
          type="submit"
          className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50"
          disabled={Object.keys(errors).some(key => errors[key])}
        >
          {submitLabel}
        </button>
      </div>
    </form>
  );
};

export default DynamicForm;
