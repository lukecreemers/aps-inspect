import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { LogOut, MoreVertical } from "lucide-react";
import { useCurrentUser } from "@/features/auth/auth.hooks";
import tempLogo from "../../../assets/client-logo.svg";

type ProfileMenuProps = {
  onLogout: () => void;
};

export function ProfileMenu({ onLogout }: ProfileMenuProps) {
  const currentUser = useCurrentUser();
  const name = `${currentUser?.data?.firstName} ${currentUser?.data?.lastName}`;
  const email = currentUser?.data?.email;
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-3 p-2 h-auto w-full justify-start"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={tempLogo} />
            <AvatarFallback>
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .slice(0, 2)}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col items-start text-left">
            <span className="text-sm font-medium">{name}</span>
            <span className="text-xs text-muted-foreground">{email}</span>
          </div>
          <MoreVertical className="w-4 h-4 ml-auto" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        side="right"
        align="start"
        alignOffset={-50}
        sideOffset={5}
        // avoidCollisions={false}
        className="w-56"
      >
        <DropdownMenuLabel className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarImage src={tempLogo} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span className="text-sm font-medium">{name}</span>
            <span className="text-xs text-muted-foreground">{email}</span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={onLogout}
          className="text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
