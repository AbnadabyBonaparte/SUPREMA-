// src/components/ui/button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    asChild?: boolean;
    size?: 'default' | 'sm' | 'lg';
    variant?: 'default' | 'outline';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className = '', asChild, size = 'default', variant = 'default', ...props }, ref) => {
        const baseClasses = 'inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none';
        const sizeClasses = {
            default: 'h-10 px-4 py-2',
            sm: 'h-9 px-3',
            lg: 'h-11 px-8'
        };
        const variantClasses = {
            default: 'bg-primary text-primary-foreground hover:bg-primary/90',
            outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground'
        };

        if (asChild) {
            return <span className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`} {...props as any} />;
        }

        return (
            <button
                ref={ref}
                className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
                {...props}
            />
        );
    }
);

Button.displayName = 'Button';
