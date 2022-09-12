import {
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma, Users } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  BaseSignInRequestDto,
  BaseSignUpRequestDto,
  BaseSignResponseDto,
} from './dto/auth.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async duplicationEmail(email: string): Promise<boolean> {
    return (await this.prisma.users.findUnique({
      where: {
        email: email,
      },
    }))
      ? true
      : false;
  }

  async validateUser(data: BaseSignInRequestDto): Promise<BaseSignResponseDto> {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          email: data.email,
        },
      });

      if (user) {
        if (user.password === data.password) {
          // 정상적인 로그인
          const payload = {
            id: user.id,
            username: user.username,
          };

          return {
            access_token: this.jwtService.sign(payload),
          };
        } else {
          // Email 계정에 대한 비밀번호가 일치하지 않음.
          throw new UnauthorizedException();
        }
      } else {
        // 일치하는 Email이 없음.
        throw new NotFoundException();
      }
    } catch (e) {
      return e;
    }
  }

  async createUser(data: BaseSignUpRequestDto): Promise<BaseSignResponseDto> {
    try {
      const user = await this.prisma.users.findUnique({
        where: {
          email: data.email,
        },
      });

      if (!user) {
        // 중복되는 Email이 없음.
        await this.prisma.users.create({ data });

        const user = await this.prisma.users.findUnique({
          where: {
            email: data.email,
          },
        });

        const payload = {
          id: user.id,
          username: user.username,
        };

        return {
          access_token: this.jwtService.sign(payload),
        };
      } else {
        // 중복되는 Email이 있음.
        throw new ForbiddenException();
      }
    } catch (e) {
      return e;
    }
  }
}
