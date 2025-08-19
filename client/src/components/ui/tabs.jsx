import { createContext, useContext } from 'react';

const TabsContext = createContext({ value: '', onValueChange: () => {} });

export function Tabs({ value, onValueChange, children, className = '' }) {
  return (
    <TabsContext.Provider value={{ value, onValueChange }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children, className = '' }) {
  return <div className={className}>{children}</div>;
}

export function TabsTrigger({ value, children }) {
  const ctx = useContext(TabsContext);
  const selected = ctx.value === value;
  return (
    <button
      onClick={() => ctx.onValueChange?.(value)}
      aria-selected={selected}
      style={{ padding: 8, borderBottom: selected ? '2px solid black' : '2px solid transparent' }}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children, className = '' }) {
  const ctx = useContext(TabsContext);
  if (ctx.value !== value) return null;
  return <div className={className}>{children}</div>;
}

