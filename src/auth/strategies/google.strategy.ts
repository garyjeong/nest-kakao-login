import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: process.env.GOOGLE_CLIENT_KEY,
      clientSecret: process.env.GOOGLE_SECRET_KEY,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
      scope: ['email', 'profile'],
    });
  }

  validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
    console.log('------Google validate Validate');
    return {
      email: profile.emails[0].value,
      password: '1111',
      nickname: profile.displayName,
      userImgURL: profile._json.profile_image,
    };
  }
}
