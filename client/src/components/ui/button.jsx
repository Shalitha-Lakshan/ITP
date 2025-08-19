export function Button({ children, className = '', variant = 'default', size = 'md', ...props }) {
  const base = 'inline-flex items-center justify-center rounded-md border px-3 py-2 text-sm font-medium';
  const variants = {
    default: 'bg-black text-white border-black',
    outline: 'bg-transparent text-black border-black',
    secondary: 'bg-gray-200 text-black border-gray-300',
    ghost: 'bg-transparent text-black border-transparent',
  };
  return (
    <button className={`${base} ${variants[variant] || variants.default} ${className}`} {...props}>
      {children}
    </button>
  );
}

