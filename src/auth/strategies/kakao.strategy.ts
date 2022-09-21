import { Strategy } from 'passport-kakao';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class KakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: process.env.KAKAO_CLIENT_KEY,
      callbackURL: process.env.KAKAO_CALLBACK_URL,
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
