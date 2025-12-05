import { useGetClients } from "../../../features/clients/client.hooks";
import tempLogo from "../../../assets/client-logo.svg";
import { ChevronDown } from "lucide-react";

const ClientDropdown = () => {
  // TODO: Implement client global state
  const { data: clients } = useGetClients();

  return (
    <div className="m-4 flex items-center gap-3 justify-between items-center my-6 cursor-pointer">
      <div className="w-18 h-18  overflow-hidden flex items-center justify-center bg-gray-100">
        <img
          src={tempLogo}
          alt="Client Logo"
          className="w-18 h-18 object-cover"
        />
      </div>

      <span className="leading-tight font-medium">{clients?.[0]?.name}</span>
      <ChevronDown />
    </div>
  );
};

export default ClientDropdown;
