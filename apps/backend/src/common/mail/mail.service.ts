import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class MailService {
  // TEMPORARY
  private readonly logger = new Logger(MailService.name);

  async send({ to, subject, text, html }) {
    this.logger.log(`Sending email to ${to} with subject ${subject}`);
    this.logger.log(`Text: ${text}`);
    this.logger.log(`HTML: ${html}`);
  }
}
