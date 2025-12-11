import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { IconClipboardText } from "@tabler/icons-react";

const EmptyReport = () => {
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
            <Button>Create Report</Button>
            <Button variant="outline">View Old Reports</Button>
          </div>
        </EmptyContent>
      </Empty>
    </div>
  );
};

export default EmptyReport;
