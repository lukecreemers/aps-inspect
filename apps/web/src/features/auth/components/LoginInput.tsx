import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

interface LoginInputProps {
  label: string;
  placeholder: string;
  value: string;
  type: "text" | "password";
  onChange: (value: string) => void;
}

const LoginInput = ({
  label,
  placeholder,
  value,
  type,
  onChange,
}: LoginInputProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{label}</label>
      <div className="relative">
        <input
          type={isPassword ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          value={value}
          className={`border w-full rounded-2xl px-4 py-4 bg-[var(--color-bg-muted)] outline-none border-none 
            focus:ring-2 focus:ring-[var(--color-primary)]/80 
            hover:ring-2 hover:ring-[var(--color-primary)]/50
            transition-ring duration-200 ${isPassword ? "pr-12" : ""}`}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 cursor-pointer"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginInput;
