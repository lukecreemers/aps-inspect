import {
  useGetClients,
  useSelectClient,
} from "../../../features/clients/client.hooks";
import tempLogo from "../../../assets/client-logo.svg";
import { ChevronDown, Check } from "lucide-react";
import {
  useCurrentClient,
  useCurrentUser,
} from "../../../features/auth/auth.hooks";
import { useEffect, useRef, useState } from "react";

const ClientDropdown = () => {
  const { data: clients } = useGetClients();
  const { mutate: selectClient } = useSelectClient();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const currentClient = useCurrentClient();

  const handleSelectClient = (clientId: string) => {
    selectClient({ clientId });
    setOpen(false);
  };

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
    <div ref={ref} className="relative z-50">
      <div
        className="
          m-4 flex items-center gap-3 justify-between 
          my-6 cursor-pointer 
          hover:bg-[var(--color-primary)]/20 rounded-md
          hover:text-[var(--color-primary)]
          transition-colors
          data-[open=true]:border-[var(--color-primary)] border-2 border-transparent
          data-[open=true]:text-[var(--color-primary)]
          data-[open=true]:bg-[var(--color-primary)]/20
          data-[open=true]:shadow-md
        "
        data-open={open}
        onClick={() => setOpen(!open)}
      >
        <div className="w-18 h-18 overflow-hidden flex items-center justify-center">
          <img
            src={tempLogo}
            alt="Client Logo"
            className="w-18 h-18 object-cover"
          />
        </div>

        <span className="leading-tight font-medium flex-1">
          {currentClient?.name ?? "Select Client"}
        </span>

        <ChevronDown
          className="mr-2 transition-transform"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </div>

      {open && (
        <div
          className="
            absolute left-4 right-4 mt-[-16px] 
            bg-white rounded-md overflow-hidden
            /* IMPROVEMENT: Deep shadow + subtle border for pop */
            shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)]
            border border-slate-100
            animate-in fade-in zoom-in-95 duration-200
          "
        >
          <div className="flex flex-col py-1">
            {clients?.map((c) => {
              const isActive = currentClient?.id === c.id;

              return (
                <button
                  key={c.id}
                  onClick={() => handleSelectClient(c.id)}
                  className={`
                    w-full text-left px-4 py-3 
                    flex items-center justify-between
                    transition-all border-l-4
                    ${
                      isActive
                        ? "bg-[var(--color-primary)]/5 text-[var(--color-primary)] font-semibold border-[var(--color-primary)]"
                        : "border-transparent text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    }
                  `}
                >
                  <span className="truncate">{c.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientDropdown;
