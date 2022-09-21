import { Strategy } from 'passport-naver';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class NaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: process.env.NAVER_CLIENT_KEY,
      clientSecret: process.env.NAVER_SECRET_KEY,
      callbackURL: process.env.NAVER_CALLBACK_URL,
    });
  }

  validate(accessToken: string, refreshToken: string, profile: any) {
    const profileJson = profile._json;
    
    return {
      service: profile.provider,
      id: profile.id,
      username: profile.username ?? '',
      email: profileJson.email,
      birthday: profileJson.birthday ?? '',
      accessToken: accessToken,
      refreshToken: refreshToken
    };
  }
}
