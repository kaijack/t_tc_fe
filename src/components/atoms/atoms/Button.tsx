import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

const Button: React.FC<ButtonProps> = ({ variant = "primary", className, children, ...props }) => {
  const baseStyles = "px-4 py-2 rounded-md disabled:opacity-50";
  const variants = {
    primary: "bg-green-600 text-white hover:bg-green-700",
    secondary: "border border-gray-300 text-gray-700 hover:bg-gray-50",
  };

  return (
    <button
      {...props}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
