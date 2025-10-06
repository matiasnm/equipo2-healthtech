interface InputProps {
    label: string;
    type?: string;
    placeholder?: string;
}

export const Input = ({ label, type = 'text', placeholder }: InputProps) => (
    <div className="flex flex-col gap-1">
        <label className="text-sm text-text-muted">{label}</label>
        <input
            type={type}
            placeholder={placeholder}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
        />
    </div>
);
