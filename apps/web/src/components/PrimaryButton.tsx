import { Loader2 } from "lucide-react";

interface PrimaryButtonProps {
  label: string;
  isLoading?: boolean;
  onClick: () => void;
}

const PrimaryButton = ({ label, isLoading, onClick }: PrimaryButtonProps) => {
  return (
    <button
      onClick={onClick}
      className="bg-primary text-white font-semibold px-4 py-4 rounded-2xl 
      hover:bg-[#0B5DC9] transition flex items-center justify-center gap-2 
      cursor-pointer w-full"
    >
      {isLoading ? <Loader2 className="animate-spin" /> : label}
    </button>
  );
};

export default PrimaryButton;
