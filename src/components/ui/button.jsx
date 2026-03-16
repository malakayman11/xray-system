import React from 'react';

const base =
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent-primary)] focus-visible:ring-offset-2 focus-visible:ring-offset-transparent disabled:pointer-events-none disabled:opacity-50';

const variants = {
  primary:
    'btn-primary hover:btn-primary-hover hover:shadow-soft-elevated',
  secondary:
    'btn-secondary border text-[color:var(--text-primary)] hover:shadow-soft-elevated',
  outline:
    'btn-outline border bg-transparent hover:bg-[color:var(--bg-surface-subtle)] hover:shadow-soft-elevated',
  ghost:
    'btn-ghost hover:bg-[color:var(--bg-surface-subtle)] hover:text-[color:var(--text-primary)]',
  destructive:
    'bg-destructive text-destructive-foreground shadow-soft-card hover:bg-rose-600',
};

const sizes = {
  sm: 'h-8 px-3',
  md: 'h-10 px-4',
  lg: 'h-11 px-6 text-base',
  pill: 'h-9 px-4 text-sm',
};

export function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}) {
  const variantClasses = variants[variant] || variants.primary;
  const sizeClasses = sizes[size] || sizes.md;

  return (
    <button
      className={`${base} ${variantClasses} ${sizeClasses} ${className}`}
      {...props}
    />
  );
}
