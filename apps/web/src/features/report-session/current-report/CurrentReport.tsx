import ReportHeader from "../components/ReportHeader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useCurrentReportTypesAuto } from "../session.hooks";
import ReportTypeOverview from "../components/ReportTypeOverview";
import ReportBuildingProgress from "../components/ReportBuildingProgress";
import WorkBlocks from "../components/WorkBlocks";

const CurrentReport = () => {
  const reportTypes = useCurrentReportTypesAuto();

  return (
    <div className="mt-4 max-w-5xl w-full mx-auto">
      <ReportHeader />
      <div className="mt-4">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="workblocks">Workblocks</TabsTrigger>
            <TabsTrigger value="map">Map</TabsTrigger>
          </TabsList>
          <Separator />
          <div className="mt-2">
            <TabsContent value="overview">
              <>
                <div className="mb-4">
                  <h2 className="text-xl font-semibold tracking-tight text-foreground">
                    Overview
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    View the overview of the report session.
                  </p>
                </div>
                <div className="flex gap-4 flex-col">
                  <div className="flex gap-4 flex-wrap">
                    {reportTypes.map((type) => (
                      <ReportTypeOverview key={type.id} reportType={type} />
                    ))}
                  </div>
                  <ReportBuildingProgress />
                </div>
              </>
            </TabsContent>
            <TabsContent value="workblocks">
              <WorkBlocks />
            </TabsContent>
          </div>
          <TabsContent value="map">Map</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CurrentReport;
