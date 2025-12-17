import { useCurrentClient } from "@/features/auth/auth.hooks";
import { useCurrentReport, useReportWorkBlocks } from "../session.hooks";
import WorkBlockRow from "./WorkBlockRow";

const WorkBlocks = () => {
  const client = useCurrentClient();
  const { data: report } = useCurrentReport(client?.id);
  const { data: workBlocks } = useReportWorkBlocks(report?.id);
  console.log(workBlocks);
  // Title, filter (by assigned, completed etc.)
  return (
    <div>
      <h1>Work Blocks</h1>
      <div>
        {workBlocks?.map((workBlock) => (
          <WorkBlockRow key={workBlock.id} workBlock={workBlock} />
        ))}
      </div>
    </div>
  );
};

export default WorkBlocks;
