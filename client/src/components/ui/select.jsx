import { useState } from 'react';

export function Select({ value, onValueChange, children }) {
  return <div data-value={value} data-onchange={!!onValueChange}>{children}</div>;
}

export function SelectTrigger({ children, className = '' }) {
  return <button className={`border rounded px-2 py-1 ${className}`}>{children}</button>;
}

export function SelectValue({ placeholder }) {
  return <span>{placeholder}</span>;
}

export function SelectContent({ children }) {
  return <div className="border rounded p-2 bg-white shadow">{children}</div>;
}

export function SelectItem({ value, children, onSelect }) {
  return (
    <div
      role="option"
      onClick={() => onSelect?.(value)}
      className="px-2 py-1 hover:bg-gray-100 cursor-pointer"
    >
      {children}
    </div>
  );
}

