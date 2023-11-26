import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async editUser(
    userId: number,
    dto: EditUserDto,
  ) {
    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    delete user.hash;

    return user;
  }

  async findAll(page = 1, limit = 10) {
    const maxLimit = 100;
    limit = Math.min(limit, maxLimit);

    // Calculate the offset based on the page and limit
    const offset = (page - 1) * limit;

    const [users, count] = await this.prisma.$transaction([
      this.prisma.user.findMany({
          skip: offset,
          take: limit,
          select: {
            id: true,
            status: true,
            email: true,
            profile: true, roles: {select: {role: {select: {name: true}}}}},
        }),
        this.prisma.user.count({})
    ]);

  
    return ({
      pagination: {
        total: count
      },
      data: users
    });
  }

  async deleteUser(userIdToDelete: number) {
    const userToDelete = await this.prisma.user.findUnique({
      where: {
        id: userIdToDelete
      }
    });

    if(!userToDelete) {
      throw new NotFoundException('User not found');
    }

    try{
      await this.prisma.$transaction(async (tx) => {
        const deletedRoles = await tx.userRole.deleteMany({
          where: {
            userId: userToDelete.id
          }
        });

        const deletedProfile = await tx.profile.delete({
          where: {
            userId: userToDelete.id
          }
        });

        const deletedUser = await tx.user.delete({ 
          where: {
            id: userToDelete.id
          }
        });

        return true;
      });
    } catch(error) {
      throw error;
    }


  }


}
