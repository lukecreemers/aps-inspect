import { ChevronsUpDown, Plus } from "lucide-react";

import {
  useGetClients,
  useSelectClient,
} from "../../../features/clients/client.hooks";
import { useCurrentClient } from "../../../features/auth/auth.hooks";

import tempLogo from "../../../assets/client-logo.svg";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ClientDropdown = () => {
  const { data: clients } = useGetClients();
  const { mutate: selectClient } = useSelectClient();
  const currentClient = useCurrentClient();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent"
            >
              <div className="bg-sidebar-primary overflow-hidden flex aspect-square size-8 items-center justify-center rounded-lg shrink-0">
                <img
                  src={tempLogo}
                  alt="Client Logo"
                  className="w-full h-full object-contain scale-200"
                />
              </div>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">
                  {currentClient?.name}
                </span>
              </div>

              <ChevronsUpDown className="ml-auto text-muted-foreground" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
            align="start"
            side={"right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-muted-foreground text-xs">
              Clients
            </DropdownMenuLabel>
            {clients?.map((client, index) => (
              <DropdownMenuItem
                key={client.name}
                onClick={() => selectClient({ clientId: client.id })}
                className="gap-2 p-2"
              >
                <div className="flex size-6 items-center justify-center rounded-md border overflow-hidden">
                  <img
                    src={tempLogo}
                    alt="Client Logo"
                    className="w-full h-full object-contain scale-200"
                  />
                </div>
                {client.name}
                {/* <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut> */}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="text-muted-foreground font-medium">
                Add client
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default ClientDropdown;
