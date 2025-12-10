import * as React from "react";
import { Check, ChevronDown } from "lucide-react";

import {
  useGetClients,
  useSelectClient,
} from "../../../features/clients/client.hooks";
import { useCurrentClient } from "../../../features/auth/auth.hooks";

import tempLogo from "../../../assets/client-logo.svg";

import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const ClientDropdown = () => {
  const { data: clients } = useGetClients();
  const { mutate: selectClient } = useSelectClient();
  const currentClient = useCurrentClient();

  const [open, setOpen] = React.useState(false);

  const handleSelectClient = (clientId: string) => {
    selectClient({ clientId });
    setOpen(false);
  };

  return (
    <div className="relative z-50">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          {/* TRIGGER: same structure/classes as your original */}
          <div
            className={cn(
              `
              m-4 flex items-center gap-3 justify-between 
              my-6 cursor-pointer 
              hover:bg-[var(--color-primary)]/20 rounded-md
              hover:text-[var(--color-primary)]
              transition-colors
              border-2 border-transparent
            `,
              open &&
                `
                border-[var(--color-primary)]
                text-[var(--color-primary)]
                bg-[var(--color-primary)]/20
                shadow-md
              `
            )}
            data-open={open}
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
        </PopoverTrigger>

        {/* DROPDOWN: same feel as original, but using Popover + Command */}
        <PopoverContent
          align="center"
          sideOffset={-24} // like your mt-[-16px] overlap
          className="
            w-[var(--radix-popover-trigger-width)]
            bg-white rounded-md overflow-hidden
            shadow-[0_10px_30px_-10px_rgba(0,0,0,0.2)]
            border border-slate-100
            p-2
            mt-8
            animate-in fade-in zoom-in-95 duration-200
          "
        >
          <Command>
            <CommandInput placeholder="Search clients..." className="" />

            <CommandList>
              <CommandEmpty>No client found.</CommandEmpty>

              <CommandGroup>
                {clients?.map((c) => {
                  const isActive = currentClient?.id === c.id;

                  return (
                    <CommandItem
                      key={c.id}
                      value={c.name}
                      onSelect={() => handleSelectClient(c.id)}
                      className="flex items-center justify-between p-2"
                    >
                      <span>{c.name}</span>

                      <Check
                        className={cn(
                          "ml-4 h-8 w-8 text-[var(--color-primary)]",
                          isActive ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </CommandItem>
                  );
                })}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default ClientDropdown;
