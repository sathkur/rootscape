import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import {
  ExtractJwt,
  Strategy,
} from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(
  Strategy,
  'jwt',
) {
  constructor(
    config: ConfigService,
    private prisma: PrismaService,
  ) {
    super({
      jwtFromRequest:
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get('JWT_SECRET'),
    });
  }

  async validate(payload: {
    sub: number;
    email: string;
  }) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },
      include: { profile: true, roles: {include: {role: true}}},
    });

    let roles;
    if (user.roles.length) {
      roles = user.roles.map((role) => role.role.name);
    }

    delete user.hash;
    delete user.profile.id;
    return {...user, ...{roles}};
  }
}
