import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input: React.FC<InputProps> = ({ error, className, ...props }) => {
  return (
    <div>
      <input
        {...props}
        className={`w-full border rounded px-3 py-2 ${
          error ? "border-red-500 bg-red-50" : "border-gray-300"
        } ${className}`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;
