import { ChangeEvent, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: boolean;
  errorMessage?: string | undefined;
  variant?: "full" | "auto" | "centered";
}

const getAutoComplete = (type?: string, autoComplete?: string): string => {
  if (autoComplete) return autoComplete;
  switch (type) {
    case "email": return "email";
    case "tel": return "tel";
    case "password": return "current-password";
    case "name": return "name";
    default: return "off";
  }
};


export const Input = ({
  label,
  error = false,
  errorMessage,
  variant = "full",
  ...rest
}: InputProps) => {
  const inputId = rest.id ?? rest.name ?? label.toLowerCase().replace(/\s+/g, "-");

  const variantClasses = {
    full: "w-full",
    auto: "w-auto",
    centered: "w-[300px] mx-auto",
  };

  const inputVariant = variantClasses[variant];

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={inputId} className="text-sm text-[var(--color-muted)] font-medium">
        {label}
      </label>
      <input
        id={inputId}
        autoComplete={getAutoComplete(rest.type, rest.autoComplete)}
        className={`px-3 py-2.5 text-lg font-[var(--font-poppins)] rounded-lg border bg-white text-[var(--color-primary)] ${
          error
            ? "border-[var(--color-error)] ring-0.5 ring-[var(--color-error)] focus:outline-[var(--color-error-hover)]"
            : "border-[#0770cb] focus:outline-[#0894e5]"
        } ${inputVariant}`}
        {...rest}
      />
      {errorMessage && (
        <p className="text-sm text-[var(--color-error)] mt-1">{errorMessage}</p>
      )}
    </div>
  );
};
