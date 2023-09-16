import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from '../auth/decorator';
import { JwtGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';
import { AccessControlService } from 'src/access-control/access-control.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService, private readonly ac: AccessControlService) {}

  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  editUser(@GetUser('id') userId: number, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }

  @Get()
  async findAll(
    @Query('page', ParseIntPipe) page = 1, // ParseIntPipe ensures page is an integer
    @Query('limit', ParseIntPipe) limit = 10, // ParseIntPipe ensures limit is an integer
  ) {
    return this.userService.findAll(page, limit);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteBookmarkById(@GetUser() user: User, @Param('id', ParseIntPipe) userIdToDelete: number) {
    const permission = this.ac.canUser({
        resource: "profile",
        action: "update"
      },
      user,
      userIdToDelete
    );

    if (!permission) {
      throw new ForbiddenException('Permission Denied');
    }

    return this.userService.deleteUser(userIdToDelete);
  }

  
}
