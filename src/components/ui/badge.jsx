import React from 'react';

const variants = {
  default: 'badge-surface',
  success:
    'bg-emerald-500/15 text-emerald-300 border border-emerald-500/40 shadow-soft-card',
  warning:
    'bg-amber-500/15 text-amber-200 border border-amber-500/40 shadow-soft-card',
  danger:
    'bg-rose-500/15 text-rose-200 border border-rose-500/40 shadow-soft-card',
  info:
    'bg-sky-500/15 text-sky-200 border border-sky-500/40 shadow-soft-card',
};

export function Badge({ variant = 'default', className = '', ...props }) {
  const variantClasses = variants[variant] || variants.default;

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide ${variantClasses} ${className}`}
      {...props}
    />
  );
}
