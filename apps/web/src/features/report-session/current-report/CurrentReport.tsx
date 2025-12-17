import ReportHeader from "../components/ReportHeader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useCurrentReportTypesAuto } from "../session.hooks";
import ReportTypeOverview from "../components/ReportTypeOverview";
import ReportBuildingProgress from "../components/ReportBuildingProgress";
import WorkBlocks from "../components/WorkBlockRow";
import WorkBlockRow from "../components/WorkBlockRow";

const CurrentReport = () => {
  const reportTypes = useCurrentReportTypesAuto();

  return (
    <div className="mt-4 max-w-5xl w-full mx-auto">
      <ReportHeader />
      <div className="mt-6">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="map">Map</TabsTrigger>
          </TabsList>
          <Separator />
          <TabsContent value="overview">
            <div className="flex gap-4 flex-col">
              <div className="flex gap-4 flex-wrap">
                {reportTypes.map((type) => (
                  <ReportTypeOverview key={type.id} reportType={type} />
                ))}
              </div>
              <ReportBuildingProgress />
              <WorkBlockRow />
            </div>
          </TabsContent>
          <TabsContent value="map">Map</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CurrentReport;
