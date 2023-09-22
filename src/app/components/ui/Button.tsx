import { ReactNode } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "tertiary" | "danger";
  size?: "small" | "medium" | "large";
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
    "bg-neutral-100 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 dark:text-neutral-200 text-neutral-700",
  tertiary: "bg-neutral-800 border border-neutral-800 text-neutral-200",
  danger: "bg-red-500 text-white",
};

const buttonSizes: Record<string, string> = {
  large: "text-[16px] px-5 py-3",
  medium: "text-[14px] px-3 py-2",
  small: "text-[12px] px-2",
};

export default function Button({
  variant = "primary",
  size = "medium",
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
        font-medium rounded-md hover:opacity-[0.7] transition ease-in-out delay-[300] disabled:opacity-[0.5]
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
