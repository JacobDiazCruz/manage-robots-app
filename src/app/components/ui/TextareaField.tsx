"use client";

import { ChangeEvent, ReactElement, ReactNode } from "react";
interface Props {
  value: string | number;
  className?: string;
  rows?: number;
  startIcon?: ReactElement | ReactNode | SVGAElement | null;
  placeholder?: string;
  onChange: (_event: ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
}

export default function TextareaField({
  value,
  className,
  startIcon = null,
  rows = 4,
  placeholder,
  onChange,
  required = false,
}: Props) {
  return (
    <div className="text-field relative">
      <textarea
        rows={rows}
        cols={60}
        className={`
          ${startIcon && "pl-10"}
          ${className}
          bg-white
          dark:bg-neutral-950 dark:border-neutral-800 border-gray-200 dark:placeholder-neutral-500 placeholder-neutral-400
          border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-300 block w-full p-2.5 border-gray-200 placeholder-gray-400`}
        placeholder={placeholder}
        required={required}
        onChange={onChange}
        value={value}
      />
    </div>
  );
}
