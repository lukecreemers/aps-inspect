import { Building, Issue, IssueView, SubIssueView } from '@aps/shared-types';
import { Injectable } from '@nestjs/common';
import { Prisma, ReportType, SubIssue } from '@prisma/client';
import { IssueInspectionService } from 'src/modules/inspections/issue-inspections.service';
import { SubIssueInspectionService } from 'src/modules/inspections/sub-issue-inspections.service';

@Injectable()
export class IssueViewHandler {
  constructor(
    private readonly subIssueInspectionService: SubIssueInspectionService,
    private readonly issueInspectionService: IssueInspectionService,
  ) {}
  async getIssueViews(
    tx: Prisma.TransactionClient,
    building: Building,
    type: ReportType,
  ): Promise<IssueView[]> {
    const issues = await this.getIssues(tx, building, type);
    const issueViews = await Promise.all(
      issues.map((issue) => this.getIssueView(tx, issue)),
    );
    return issueViews.filter((view) => view !== null);
  }

  private async getIssueView(
    tx: Prisma.TransactionClient,
    issue: Issue,
  ): Promise<IssueView | null> {
    const insp = await this.issueInspectionService.getLatestInspection(
      tx,
      issue.id,
    );
    if (!insp) {
      return null;
    }

    const subIssues = await this.getSubIssues(tx, issue);
    const subIssueViews = await Promise.all(
      subIssues.map((subIssue) => this.getSubIssueView(tx, subIssue)),
    );
    const filteredSubIssueViews = subIssueViews.filter((view) => view !== null);

    return {
      id: issue.id,
      action: insp.action,
      description: insp.description,
      toFix: insp.toFix,
      xCoord: insp.xCoord,
      yCoord: insp.yCoord,
      timeframe: insp.timeframe,
      subIssues: filteredSubIssueViews,
    };
  }

  private async getSubIssueView(
    tx: Prisma.TransactionClient,
    subIssue: SubIssue,
  ): Promise<SubIssueView | null> {
    const insp = await this.subIssueInspectionService.getLatestInspection(
      tx,
      subIssue.id,
    );

    if (!insp) {
      return null;
    }

    return {
      id: subIssue.id,
      action: insp.action,
      xCoord: insp.xCoord,
      yCoord: insp.yCoord,
    };
  }

  private async getSubIssues(
    tx: Prisma.TransactionClient,
    issue: Issue,
  ): Promise<SubIssue[]> {
    return tx.subIssue.findMany({
      where: {
        issueId: issue.id,
        resolvedAt: null,
      },
    });
  }

  private async getIssues(
    tx: Prisma.TransactionClient,
    building: Building,
    type: ReportType,
  ): Promise<Issue[]> {
    return tx.issue.findMany({
      where: {
        buildingId: building.id,
        type: type,
        resolvedAt: null,
      },
    });
  }
}
