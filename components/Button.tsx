import React, { forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, children, disabled, type = 'button', ...props }, ref) => {
    return (
      <button
        className={twMerge(
          'rounded-full px-3 py-3 bg-green-500 border border-transparent disabled:cursor-pointer disabled:opacity-50 text-black font-bold hover:opacity-75 transition',
          className
        )}
        type={type}
        disabled={disabled}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
