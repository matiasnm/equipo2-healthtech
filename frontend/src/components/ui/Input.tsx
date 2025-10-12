interface InputProps {
  label: string;
  name?: string;
  id?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  autoComplete?: string;
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
  name,
  id,
  type = "text",
  placeholder,
  value,
  onChange,
  autoComplete,
  variant = "full",
}: InputProps) => {
  const inputId = id ?? name ?? label.toLowerCase().replace(/\s+/g, "-");

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
        name={name ?? inputId}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete={getAutoComplete(type, autoComplete)}
        className={`px-3 py-2.5 text-lg font-[var(--font-poppins)] rounded-lg border bg-white text-[var(--color-primary)] border-[#0770cb] focus:outline-2 focus:outline-offset-1 focus:outline-[#0894e5] ${inputVariant}`}
      />
    </div>
  );
};

