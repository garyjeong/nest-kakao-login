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
    });
  }

  validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
    console.log('------Google validate Validate');
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
