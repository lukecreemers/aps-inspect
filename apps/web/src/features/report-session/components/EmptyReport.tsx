import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { useCurrentClient } from "@/features/auth/auth.hooks";
import { IconClipboardText } from "@tabler/icons-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const EmptyReport = () => {
  const client = useCurrentClient();
  const navigate = useNavigate();
  const handleCreateSession = () => {
    if (!client) {
      toast.error("No Client Selected");
      return;
    }
    navigate("/app/admin/report-session/create");
  };

  return (
    <div className="flex flex-1 items-center justify-center">
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <IconClipboardText />
          </EmptyMedia>
          <EmptyTitle>No Report Open</EmptyTitle>
          <EmptyDescription>
            You haven&apos;t created any projects yet. Get started by creating
            your first project.
          </EmptyDescription>
        </EmptyHeader>
        <EmptyContent>
          <div className="flex gap-2">
            <Button onClick={handleCreateSession}>Create Session</Button>
            <Button variant="outline" asChild>
              <Link to="/app/admin/archive">View Old Reports</Link>
            </Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  );
};

export default EmptyReport;
