import { Controller, Get, UseGuards } from '@nestjs/common';
import { BaseAuthGuard } from '../guards/base.auth.guard';
import { NaverAuthGuard } from '../guards/naver.auth.guard';
import { KakaoAuthGuard } from '../guards/kakao.auth.guard';

@Controller('auth')
export class AuthController {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  @Get('/')
  @UseGuards(BaseAuthGuard)
  async baseLogin(email: string): Promise<any> {
    console.log('///////////base login');
    // return this.userService.findOneSNS(email);
  }
  @Get('naver')
  @UseGuards(NaverAuthGuard)
  async naverLogin(email: string): Promise<any> {
    console.log('///////////naver login');
    // return this.userService.findOneSNS(email);
  }
  @Get('kakao')
  @UseGuards(KakaoAuthGuard)
  async kakaoLogin(email: string): Promise<any> {
    console.log('///////////kakao login');
    // return this.userService.findOneSNS(email);
  }
}
