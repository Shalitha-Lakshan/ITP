import { useState } from 'react';

export function Sheet({ children }) {
  return <div>{children}</div>;
}

export function SheetTrigger({ asChild, children, onClick }) {
  return (
    <span onClick={onClick} style={{ display: 'inline-flex' }}>
      {children}
    </span>
  );
}

export function SheetContent({ side = 'right', children, open, onOpenChange }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/30" onClick={() => onOpenChange?.(false)} />
      <div className={`absolute top-0 ${side === 'right' ? 'right-0' : 'left-0'} h-full w-80 bg-white text-black shadow-lg p-4 overflow-auto`}>
        {children}
      </div>
    </div>
  );
}

