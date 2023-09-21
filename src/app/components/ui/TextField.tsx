"use client";
import { ChangeEvent, KeyboardEvent, ReactElement, ReactNode } from "react";

interface TextFieldProps {
  value?: string | number;
  type?: string;
  inputRef?: any;
  startIcon?: ReactElement | ReactNode | null;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  size?: "large" | "medium" | "small";
  onChange?: (_event: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (_event: KeyboardEvent<HTMLInputElement>) => void;
  className?: string;
}

const textfieldSize: Record<string, string> = {
  large: "h-[60px]",
  medium: "h-[45px]",
  small: "h-[10px]",
};

export default function TextField({
  value = "",
  type = "text",
  inputRef = null,
  startIcon = null,
  disabled = false,
  placeholder = "",
  required = false,
  size = "medium",
  onChange,
  onKeyDown,
  className,
}: TextFieldProps) {
  return (
    <div className={`${className} text-field relative`}>
      {startIcon && (
        <div className="startIcon-container z-[11] absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          {startIcon}
        </div>
      )}
      <input
        type={type}
        ref={inputRef}
        className={[
          textfieldSize[size],
          "dark:bg-neutral-900 border dark:border-none rounded-md relative text-sm rounded-lg focus:gray-300 focus:gray-300 block w-full p-2.5",
        ].join(" ")}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={value}
      />
    </div>
  );
}
