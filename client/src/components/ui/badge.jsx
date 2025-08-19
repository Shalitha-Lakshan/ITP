export function Badge({ children, variant = 'default' }) {
  const styles = variant === 'secondary' ? 'bg-gray-200 text-gray-800' : 'bg-black text-white';
  return <span className={`inline-block text-xs px-2 py-1 rounded ${styles}`}>{children}</span>;
}

