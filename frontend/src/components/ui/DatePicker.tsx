import { forwardRef } from "react";

type Props = {
  label: string;
  name: string;
  value?: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  errorMessage?: string;
};

export const DatePicker = forwardRef<HTMLInputElement, Props>(
  ({ label, name, value, onChange, onBlur, errorMessage }, ref) => {
    return (
      <div className="space-y-1">
        <label htmlFor={name} className="block font-medium">
          {label}
        </label>
        <input
          type="date"
          name={name}
          id={name}
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          className={`input ${errorMessage ? "border-red-500" : ""}`}
        />
        {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
      </div>
    );
  }
);



