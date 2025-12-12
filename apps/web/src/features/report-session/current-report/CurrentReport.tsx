import React from "react";
import ReportHeader from "../components/ReportHeader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";

const CurrentReport = () => {
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
          <TabsContent value="overview">Overview</TabsContent>
          <TabsContent value="workblock">Workblock</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CurrentReport;
