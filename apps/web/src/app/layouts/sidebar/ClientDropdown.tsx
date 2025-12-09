import { useGetClients } from "../../../features/clients/client.hooks";
import tempLogo from "../../../assets/client-logo.svg";
import { ChevronDown } from "lucide-react";
import useAppStore from "../../store/app.store";
import { useEffect, useRef, useState } from "react";

const ClientDropdown = () => {
  // TODO: Implement client global state
  const { data: clients } = useGetClients();
  const { client, setClient } = useAppStore();
  const [isOpen, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!client && clients?.[0]) {
      setClient(clients[0]);
    }
  }, [clients, setClient]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} onClick={() => setOpen(!isOpen)} className="relative">
      <div className="m-4 flex items-center gap-3 justify-between items-center my-6 cursor-pointer">
        <div className="w-18 h-18  overflow-hidden flex items-center justify-center bg-gray-100">
          <img
            src={tempLogo}
            alt="Client Logo"
            className="w-18 h-18 object-cover"
          />
        </div>

        <span className="leading-tight font-medium flex-1">{client?.name}</span>
        <ChevronDown />
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border rounded-md shadow-lg z-50">
          {clients?.map((c) => (
            <button
              key={c.id}
              onClick={() => {
                setClient(c);
                setOpen(false);
              }}
              className={`w-full text-left px-4 py-2 hover:bg-gray-100 ${
                client?.id === c.id ? "bg-gray-50 font-medium" : ""
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientDropdown;
