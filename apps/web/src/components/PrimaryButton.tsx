import { Loader2 } from "lucide-react";
import React from "react";

interface PrimaryButtonProps {
  label: string;
  isLoading?: boolean;
  onClick: () => void;
}

const PrimaryButton = ({ label, isLoading, onClick }: PrimaryButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-[var(--color-primary)] text-white font-semibold px-4 py-4 rounded-2xl 
      hover:bg-[var(--color-primary-hover)] transition flex items-center justify-center gap-2 
      cursor-pointer w-full"
    >
      {isLoading ? <Loader2 className="animate-spin" /> : label}
    </button>
  );
};

export default PrimaryButton;
