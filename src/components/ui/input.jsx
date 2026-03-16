import React from 'react';

export function Input({ className = '', ...props }) {
  return (
    <input
      className={`w-full rounded-2xl border input-surface px-3 py-2 text-sm placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent transition-all duration-200 hover:border-[color:var(--accent-primary)] ${className}`}
      {...props}
    />
  );
}
