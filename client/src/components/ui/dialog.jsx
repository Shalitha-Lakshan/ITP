import { useState } from 'react';

export function Dialog({ open, onOpenChange, children }) {
  return open ? <div className="fixed inset-0 bg-black/30 flex items-center justify-center">{children}</div> : null;
}

export function DialogTrigger({ asChild, children }) {
  return children;
}

export function DialogContent({ children }) {
  return <div className="bg-white text-black p-4 rounded shadow max-w-lg w-full">{children}</div>;
}

export function DialogHeader({ children }) {
  return <div className="mb-2">{children}</div>;
}

export function DialogTitle({ children }) {
  return <h3 className="font-semibold text-lg">{children}</h3>;
}

