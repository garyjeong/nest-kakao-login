import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BaseAuthGuard } from '../guards/base.auth.guard';
import { NaverAuthGuard } from '../guards/naver.auth.guard';
import { KakaoAuthGuard } from '../guards/kakao.auth.guard';
import { Users } from '@prisma/client';
import { AuthService } from './auth.service';
import {
  BaseSignInRequestDto,
  BaseSignUpRequestDto,
  BaseSignResponseDto,
} from './dto/auth.dto';
import { GoogleAuthGuard } from 'src/guards/google.auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Get('/login')
  async baseSignIn(
    @Body() body: BaseSignInRequestDto,
  ): Promise<BaseSignResponseDto> {
    return this.authService.validateUser(body);
  }

  @HttpCode(200)
  @Post('/regist')
  async baseRegist(
    @Body() body: BaseSignUpRequestDto,
  ): Promise<BaseSignResponseDto> {
    return this.authService.createUser(body);
  }

  // 참고 URL : https://velog.io/@eslerkang/TIL-NestJSpassport-kakao
  @HttpCode(200)
  @Get('login/naver')
  @UseGuards(NaverAuthGuard)
  async naverLogin(email: string): Promise<any> {
    const str = '------Naver Login';
    console.log(str);
    return str;
  }

  @HttpCode(200)
  @Get('/naver/callback')
  async naverLoginCallback(@Query() query: any): Promise<any> {
    const str = '------Naver Login Callback';
    console.log(str);
    console.log(query?.code);
    return str;
  }

  @HttpCode(200)
  @Get('login/kakao')
  @UseGuards(KakaoAuthGuard)
  async kakaoLogin(email: string): Promise<any> {
    const str = '------Kakao Login';
    console.log(str);
    return str;
  }

  @HttpCode(200)
  @Get('/kakao/callback')
  async kakaoLoginCallback(@Query() query: any): Promise<any> {
    const str = '------Kakao Login Callback';
    console.log(str);
    console.log(query?.code);
    return str;
  }

  @HttpCode(200)
  @Get('login/google')
  @UseGuards(GoogleAuthGuard)
  async googleLogin(email: string): Promise<any> {
    const str = '------Google Login';
    console.log(str);
    return str;
  }

  @HttpCode(200)
  @Get('/google/callback')
  async googleLoginCallback(@Query() query: any): Promise<any> {
    const str = '------Google Login';
    console.log(str);
    console.log(query?.code);
    return str;
  }
}
