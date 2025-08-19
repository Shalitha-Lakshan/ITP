export function Label(props) {
  return <label {...props} className={`block text-sm font-medium mb-1 ${props.className || ''}`} />;
}

