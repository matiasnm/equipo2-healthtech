import { SelectHTMLAttributes } from "react";

interface Option {
  label: string;
  value: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onBlur?: () => void;
  errorMessage?: string;
  variant?: "simple" | "editable";
  options: Option[];
  placeholder?: string;
  register?: any;
}

export const Select = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  errorMessage,
  variant = "simple",
  options,
  placeholder,
  register,
  ...rest
}: SelectProps) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm text-[var(--color-muted)] font-medium">
        {label}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`px-3 py-2.5 text-lg rounded-lg border border-[var(--color-primary)] bg-[var(--color-secondary-ligth)] text-[var(--color-primary)] focus:outline-[var(--color-primary-hover)]`}
        {...(register ? register(name) : {})}
        {...rest}
      >

      {/* Variante editable con placeholder */}
        {variant === "editable" && placeholder && (
          <option value="" className="text-[var(--color-muted)] italic">
            {`Actual: ${placeholder}`}
          </option>
        )}

        {/* Variante simple */}
        {variant === "simple" && <option value="">Seleccionar...</option>}
  

        {/* Opciones */}
        {options.map(({ label, value }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </select>
      {errorMessage && (
        <p className="text-sm text-[var(--color-error)] mt-1">{errorMessage}</p>
      )}
    </div>
  );
};

