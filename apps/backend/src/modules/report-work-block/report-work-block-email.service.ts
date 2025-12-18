import { EmailReportWorkBlockDto } from '@aps/shared-types';
import { Injectable } from '@nestjs/common';
import { MailService } from 'src/common/mail/mail.service';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class ReportWorkBlockEmailService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mailService: MailService,
  ) {}

  async emailCredentials(
    id: string,
    dto: EmailReportWorkBlockDto,
  ): Promise<void> {
    const reportWorkBlock = await this.prisma.reportWorkBlock.findUniqueOrThrow(
      {
        where: { id },
      },
    );
    const contractor = await this.prisma.contractor.findUniqueOrThrow({
      where: { id: dto.contractorId },
    });
    const buildings = await this.prisma.building.findMany({
      where: { id: { in: dto.buildings } },
    });

    if (!contractor.email) {
      throw new Error('Contractor does not have an email address');
    }

    if (buildings.length === 0) {
      throw new Error('No buildings found to include in email');
    }
    // Send email to contractor

    /* ------------------------------------------------------------ */
    /* Email content                                                 */
    /* ------------------------------------------------------------ */

    const contractorName = `${contractor.firstName} ${contractor.lastName}`;

    const buildingListText = buildings.map((b) => `• ${b.name}`).join('\n');

    const buildingListHtml = buildings
      .map((b) => `<li>${b.name}</li>`)
      .join('');

    const text = `
Hi ${contractorName},

You have been assigned inspection work for the following buildings:

${buildingListText}

Access credentials:
${reportWorkBlock.loginSecretText}

Please keep these credentials secure.

If you have any questions, contact the admin team.

Thanks,
APS Inspect
`;

    const html = `
<div style="font-family: Arial, sans-serif; line-height: 1.6;">
  <p>Hi ${contractorName},</p>

  <p>
    You have been assigned inspection work for the following buildings:
  </p>

  <ul>
    ${buildingListHtml}
  </ul>

  <h3>Access credentials</h3>
  <pre style="
    background:#f5f5f5;
    padding:12px;
    border-radius:6px;
    font-size:14px;
  ">${reportWorkBlock.loginSecretText}</pre>

  <p style="color:#666;">
    Please keep these credentials secure.
  </p>

  <p>
    If you have any questions, contact the admin team.
  </p>

  <p><strong>APS Inspect</strong></p>
</div>
`;

    /* ------------------------------------------------------------ */
    /* Send                                                          */
    /* ------------------------------------------------------------ */

    await this.mailService.send({
      to: contractor.email,
      subject: 'APS Inspect - Your Inspection Work Credentials',
      text,
      html,
    });
  }
}
