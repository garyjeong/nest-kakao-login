import { Strategy } from 'passport-naver';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'Naver') {
  constructor() {
    super({
      clientID: process.env.NAVER_CLIENT_KEY,
      clientSecret: process.env.NAVER_SECRET_KEY,
      callbackURL: process.env.NAVER_CALLBACK_URL,
    });
  }

  validate(accessToken: string, refreshToken: string, profile: any) {
    console.log('------Naver validate Validate');
    return {
      email: profile.emails[0].value,
      password: '1111',
      nickname: profile.displayName,
      userImgURL: profile._json.profile_image,
    };
  }
}
