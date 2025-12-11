import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface LoginInputProps {
  label: string;
  placeholder: string;
  value: string;
  type: "text" | "password";
  onChange: (value: string) => void;
  isError?: boolean;
  errorMessage?: string;
}

const LoginInput = ({
  label,
  placeholder,
  value,
  type,
  onChange,
  isError,
  errorMessage,
}: LoginInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-[var(--color-text-muted)]">
        {label}
      </label>
      <div className="relative">
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          value={value}
          className={`border w-full rounded-2xl px-4 py-4 bg-[#F4F4F4] outline-none border-none 
            transition-all duration-200 
            ${
              isError
                ? "ring-2 ring-red-500 animate-shake bg-red-50"
                : "focus:ring-2 focus:ring-[var(--color-primary)]/80 hover:ring-2 hover:ring-[var(--color-primary)]/50"
            }
            ${isPassword ? "pr-12" : ""}`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        )}
        {isError && (
          <div className="absolute -bottom-6 text-red-500 text-xs font-medium animate-slide-down">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginInput;
