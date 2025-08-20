import React, { useState } from "react";
import { FormConfig, validateField, validateForm } from "../../../utils/formHelpers";
import Input from "../atoms/Input";
import TextArea from "../atoms/TextArea";
import Button from "../atoms/Button";

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
  submitLabel = "Submit",
  cancelLabel = "Cancel",
}) => {
  const [formData, setFormData] = useState(() =>
    Object.fromEntries(
      config.fields.map((field) => [field.name, initialValues?.[field.name] || ""])
    )
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    const field = config.fields.find((f) => f.name === name);
    if (field) {
      setErrors((prev) => ({
        ...prev,
        [name]: validateField(field, value),
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
      {config.fields.map((field) => (
        <div key={field.name}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>

          {field.type === "textarea" ? (
            <TextArea
              value={formData[field.name]}
              onChange={(e) => handleChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              error={errors[field.name]}
              rows={4}
            />
          ) : (
            <Input
              type={field.type}
              value={formData[field.name]}
              onChange={(e) => handleChange(field.name, e.target.value)}
              placeholder={field.placeholder}
              error={errors[field.name]}
            />
          )}
        </div>
      ))}

      <div className="flex justify-end space-x-3 pt-2">
        {onCancel && (
          <Button type="button" variant="secondary" onClick={onCancel}>
            {cancelLabel}
          </Button>
        )}

        <Button
          type="submit"
          variant="primary"
          disabled={Object.keys(errors).some((key) => errors[key])}
        >
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};

export default DynamicForm;
