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
    console.log('------Kakao validate Validate');
    return {
      email: profile.emails[0].value,
      password: '1111',
      nickname: profile.displayName,
      userImgURL: profile._json.profile_image,
    };
  }
}
