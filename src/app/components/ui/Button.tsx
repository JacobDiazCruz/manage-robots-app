import { ReactNode } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "tertiary";
  size?: "small" | "medium" | "large";
  loading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  id?: string;
  onClick?: () => void;
}

const buttonVariants: Record<string, string> = {
  primary: "dark:bg-white bg-neutral-900 text-white dark:text-neutral-900",
  secondary:
    "bg-transparent border border-neutral-900 dark:border-neutral-400 dark:text-neutral-400 text-neutral-900",
  tertiary: "bg-neutral-800 border border-neutral-800 text-neutral-200",
};

const buttonSizes: Record<string, string> = {
  large: "text-[16px] px-5 py-3",
  medium: "text-[14px] px-3 py-2",
  small: "text-[12px] px-2",
};

export default function Button({
  variant = "primary",
  size = "medium",
  loading = false,
  startIcon,
  endIcon,
  id,
  className,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      id={id}
      type="button"
      disabled={disabled}
      className={`
        ${buttonVariants[variant]}
        ${buttonSizes[size]}
        ${className}
        font-medium rounded-md hover:opacity-[0.7] transition ease-in-out delay-[300]
      `}
      {...props}
    >
      <div className="flex items-center justify-center">
        {startIcon && <span className="mr-2 text-[16px]">{startIcon}</span>}
        {children}
        {endIcon && <span className="ml-2 text-[16px]">{endIcon}</span>}
      </div>
    </button>
  );
}
