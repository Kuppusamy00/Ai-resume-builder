import React from 'react';

// FIX: Made label optional to support inputs that don't need a visible label (e.g., when using aria-label).
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  wrapperClassName?: string;
}

const commonInputStyles = "w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 bg-slate-900 text-slate-100 placeholder-slate-400 border-slate-700 focus:ring-purple-500 focus:border-purple-500";

export const Input: React.FC<InputProps> = ({ label, id, wrapperClassName, ...props }) => (
  <div className={wrapperClassName}>
    {/* FIX: Conditionally render the label only if the prop is provided. */}
    {label && <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>}
    <input
      id={id}
      className={commonInputStyles}
      {...props}
    />
  </div>
);

interface TextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
}

export const TextArea: React.FC<TextAreaProps> = ({ label, id, ...props }) => (
  <div>
    <label htmlFor={id} className="block text-sm font-medium text-slate-700 mb-1">{label}</label>
    <textarea
      id={id}
      rows={4}
      className={commonInputStyles}
      {...props}
    />
  </div>
);

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ai';
}

export const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', ...props }) => {
  const baseClasses = 'px-4 py-2 rounded-md font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-slate-200 text-slate-800 hover:bg-slate-300 focus:ring-slate-400',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    ai: 'bg-gradient-to-r from-purple-500 to-indigo-600 text-white hover:from-purple-600 hover:to-indigo-700 focus:ring-indigo-500 flex items-center gap-2',
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`} {...props}>
      {children}
    </button>
  );
};