import React, { forwardRef } from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
  className?: string;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = false, className = '', containerClassName = '', ...props }, ref) => {
    const id = props.id || `input-${Math.random().toString(36).substring(2, 11)}`;
    const widthClass = fullWidth ? 'w-full' : '';
    
    const inputClasses = `
      rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 
      focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
      disabled:cursor-not-allowed disabled:opacity-50
      dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100
      ${error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''}
      ${className}
    `;

    return (
      <div className={`${widthClass} ${containerClassName}`}>
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {label}
          </label>
        )}
        <input ref={ref} id={id} className={inputClasses} {...props} />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';