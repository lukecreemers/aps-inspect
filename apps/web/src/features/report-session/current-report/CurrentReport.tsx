import React from "react";
import ReportHeader from "../components/ReportHeader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { useCurrentClient } from "@/features/auth/auth.hooks";
import { useCurrentReport, useCurrentReportTypesAuto } from "../session.hooks";
import ReportTypeOverview from "../components/ReportTypeOverview";

const CurrentReport = () => {
  const reportTypes = useCurrentReportTypesAuto();

  return (
    <div className="mt-4">
      <ReportHeader />
      <div className="mt-6">
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="workblock">Work Blocks</TabsTrigger>
          </TabsList>
          <Separator />
          <TabsContent value="overview">
            {reportTypes.map((type) => (
              <ReportTypeOverview reportType={type} />
            ))}
          </TabsContent>
          <TabsContent value="workblock">Workblock</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CurrentReport;
