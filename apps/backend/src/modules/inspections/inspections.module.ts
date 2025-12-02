import { Module } from '@nestjs/common';
import { InspectionsService } from './inspections.service';

@Module({
  providers: [InspectionsService],
})
export class InspectionsModule {}
