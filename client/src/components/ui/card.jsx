export function Card({ className = '', children }) {
  return <div className={`border rounded-lg ${className}`}>{children}</div>;
}

export function CardHeader({ className = '', children }) {
  return <div className={`border-b p-4 ${className}`}>{children}</div>;
}

export function CardTitle({ className = '', children }) {
  return <h3 className={`font-semibold text-lg ${className}`}>{children}</h3>;
}

export function CardContent({ className = '', children }) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

