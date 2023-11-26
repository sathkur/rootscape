import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { AccessControlModule } from 'src/access-control/access-control.module';

@Module({
  providers: [ProfileService],
  controllers: [ProfileController],
  imports: [AccessControlModule],
})
export class ProfileModule {}
