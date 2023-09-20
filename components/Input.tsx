import React, { InputHTMLAttributes, forwardRef } from 'react';
import { twMerge } from 'tailwind-merge';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, disabled, type, ...props }, ref) => {
    return (
      <input
        className={twMerge(
          `
            flex
            w-full
            px-3 
            py-3
            rounded-md
            bg-neutral-700
            border
            border-transparent
            text-sm
            file:border-0
            file:bg-transparent
            file:text-sm
            file:font-medium
            placeholder:text-neutral-400
            disabled:cursor-not-allowed
            disabled:opacity-50
            focus:outline-none
          `,
          className
        )}
        disabled={disabled}
        type={type}
        ref={ref}
        {...props}
      />
    );
  }
);

Input.displayName = 'Input';

export default Input;
