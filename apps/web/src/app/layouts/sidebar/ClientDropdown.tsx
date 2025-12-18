import { ChevronsUpDown, Plus, Check, Building2 } from "lucide-react";
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
  useSidebar,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const ClientDropdown = () => {
  const { data: clients } = useGetClients();
  const { mutate: selectClient } = useSelectClient();
  const currentClient = useCurrentClient();
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground transition-colors"
            >
              <div className="flex overflow-hidden aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground border border-sidebar-border">
                <img
                  src={tempLogo}
                  alt={currentClient?.name}
                  className="size-5 object-contain scale-280"
                />
              </div>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold text-foreground">
                  {currentClient?.name}
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  Client Portal
                </span>
              </div>

              <ChevronsUpDown className="ml-auto size-4 text-muted-foreground/50" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg shadow-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground  tracking-wider font-medium px-2 py-1.5">
              Switch Client
            </DropdownMenuLabel>

            {clients?.map((client) => {
              const isActive = currentClient?.id === client.id;

              return (
                <DropdownMenuItem
                  key={client.id}
                  onClick={() => selectClient({ clientId: client.id })}
                  className={cn(
                    "gap-3 p-2 cursor-pointer focus:bg-accent",
                    isActive && "bg-accent/50"
                  )}
                >
                  <div className="flex size-6 items-center justify-center rounded-sm border bg-background overflow-hidden">
                    <img
                      src={tempLogo}
                      alt="logo"
                      className="size-4 object-contain  scale-280"
                    />
                  </div>

                  <span
                    className={cn(
                      "flex-1 truncate text-sm",
                      isActive
                        ? "font-medium text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {client.name}
                  </span>

                  {isActive && <Check className="size-4 text-primary" />}
                </DropdownMenuItem>
              );
            })}

            <DropdownMenuSeparator className="my-2" />

            <DropdownMenuItem className="gap-3 p-2 cursor-pointer text-muted-foreground hover:text-foreground">
              <div className="flex size-6 items-center justify-center rounded-md border border-dashed bg-background">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-sm">Add new client</div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default ClientDropdown;
