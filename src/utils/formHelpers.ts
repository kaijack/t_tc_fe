// src/utils/formHelpers.ts
import { Book } from '../types';

// Types
type FormField = {
  name: string;
  label: string;
  type: string;
  required?: boolean;
  placeholder?: string;
  validation?: RegExp;
  errorMessage?: string;
};

export type FormConfig = {
  fields: FormField[];
  initialValues?: Record<string, string>;
};

// Validation patterns
const validationPatterns = {
  title: /^[a-zA-Z0-9\s\-',.;:()]{3,100}$/,
  author: /^[a-zA-Z\s\-']{3,50}$/,
  year: /^(19|20)\d{2}$/,
  description: /^.{0,500}$/,
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  password: /^(?=.*[A-Za-z])(?=.*\d).{8,}$/
};

// Error messages
const errorMessages = {
  title: 'Title must be 3-100 characters (letters, numbers, spaces)',
  author: 'Author name must be 3-50 characters (letters and spaces only)',
  year: 'Please enter a valid year (1900-2099)',
  description: 'Description too long (max 500 characters)',
  default: 'This field is invalid',
  required: 'This field is required'
};

// Field validation
export const validateField = (field: FormField, value: string): string => {
  if (field.required && !value.trim()) {
    return errorMessages.required;
  }

  if (value && field.validation && !field.validation.test(value)) {
    return field.errorMessage || errorMessages.default;
  }

  return '';
};

// Form validation
export const validateForm = (
  fields: FormField[],
  values: Record<string, string>
): { isValid: boolean; errors: Record<string, string> } => {
  const errors: Record<string, string> = {};
  let isValid = true;

  fields.forEach(field => {
    const error = validateField(field, values[field.name] || '');
    if (error) {
      errors[field.name] = error;
      isValid = false;
    }
  });

  return { isValid, errors };
};

// Initialize form data
export const getInitialFormData = (
  fields: FormField[],
  initialValues?: Record<string, string>
): Record<string, string> => {
  return fields.reduce((acc, field) => {
    acc[field.name] = initialValues?.[field.name] || '';
    return acc;
  }, {} as Record<string, string>);
};

// Book form configuration (example)
export const bookFormConfig: FormConfig = {
  fields: [
    {
      name: 'title',
      label: 'Title',
      type: 'text',
      required: true,
      validation: validationPatterns.title,
      errorMessage: errorMessages.title
    },
    {
      name: 'author',
      label: 'Author',
      type: 'text',
      required: true,
      validation: validationPatterns.author,
      errorMessage: errorMessages.author
    },
    {
      name: 'year',
      label: 'Year',
      type: 'number',
      required: true,
      validation: validationPatterns.year,
      errorMessage: errorMessages.year
    },
    {
      name: 'description',
      label: 'Description',
      type: 'textarea',
      required: false,
      validation: validationPatterns.description,
      errorMessage: errorMessages.description
    }
  ]
};

// Generic form data preparation
export const prepareFormData = (values: Record<string, string>) => {
  return Object.fromEntries(
    Object.entries(values).map(([key, value]) => [key, value.trim()])
  );
};
