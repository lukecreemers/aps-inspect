import {
  useGetClients,
  useSelectClient,
} from "../../../features/clients/client.hooks";
import tempLogo from "../../../assets/client-logo.svg";
import { ChevronDown } from "lucide-react";
import {
  useCurrentClient,
  useCurrentUser,
} from "../../../features/auth/auth.hooks";
import { useEffect, useRef, useState } from "react";

const ClientDropdown = () => {
  // TODO: Implement client global state
  const { data: clients } = useGetClients();
  const { data: currentUser } = useCurrentUser();
  const { mutate: selectClient } = useSelectClient();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const currentClient = useCurrentClient();

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
    <div ref={ref} className="relative" onClick={() => setOpen(!open)}>
      <div
        className="m-4 flex items-center gap-3 justify-between items-center 
      my-6 cursor-pointer 
      hover:bg-[var(--color-primary)]/10 rounded-md
      hover:text-[var(--color-primary)]"
      >
        <div className="w-18 h-18  overflow-hidden flex items-center justify-center">
          <img
            src={tempLogo}
            alt="Client Logo"
            className="w-18 h-18 object-cover"
          />
        </div>

        <span className="leading-tight font-medium flex-1">
          {currentClient?.name ?? "Select Client"}
        </span>
        <ChevronDown className="mr-2" />
      </div>
      {open && (
        <div className="absolute flex flex-col gap-2 top-full left-0 right-0 mt-2 bg-white border rounded-md shadow-lg z-50">
          {clients?.map((c) => (
            <button key={c.id} onClick={() => selectClient({ clientId: c.id })}>
              {c.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ClientDropdown;
