import { forwardRef, ButtonHTMLAttributes } from "react";

const variants = {
  primary:
    "bg-primary-500 text-white hover:bg-primary-600 focus:ring-primary-300 shadow-sm",
  secondary:
    "bg-accent-500 text-white hover:bg-accent-600 focus:ring-accent-300 shadow-sm",
  outline:
    "border border-sage-300 text-sage-700 hover:bg-sage-50 hover:border-sage-400 focus:ring-sage-200",
  ghost: "text-sage-700 hover:bg-sage-100 focus:ring-sage-200",
  link: "text-primary-600 hover:text-primary-700 underline-offset-4 hover:underline",
};

const sizes = {
  xs: "px-2.5 py-1.5 text-xs",
  sm: "px-3.5 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
  xl: "px-8 py-4 text-lg",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center gap-2 font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";