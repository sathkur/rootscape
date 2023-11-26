import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { AccessControlModule } from 'src/access-control/access-control.module';

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [AccessControlModule]
})
export class UserModule {}
