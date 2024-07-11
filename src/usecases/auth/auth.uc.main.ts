import { Injectable, Module } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { config } from 'src/configs';
import { RepAuth } from 'src/services/repositories/rep.auth';
import { ServicesModule } from 'src/services/services.module';
import { generateRandomString } from 'src/utils/random-string';
import { signJWT } from 'src/utils/token';
import { UserNotFound } from './auth.uc.errors';

@Injectable()
export class UCAuth {
  constructor(private repAuth: RepAuth) {}

  async login(email: string, password: string): Promise<any> {
    const user = await this.repAuth.findUserByEmail(email);
    if (!user) {
      throw new UserNotFound('User not found');
    }

    const userLogin = await this.repAuth.login(email, password);
    if (!userLogin) {
      throw new Error('Failed to login');
    }
    console.log('line 47: ', userLogin[0].email);
    const signed = signJWT(
      config.JWT_SECRET_KEY,
      { sub: userLogin[0].id },
      // config.JWT_EXPIRES,
      '1 minutes',
    );
    const signToTakeExpiresAt = signJWT(
      config.JWT_SECRET_KEY,
      { sub: userLogin[0].id },
      // config.JWT_EXPIRES,
      '3 minutes',
    );

    const idTokenData = jwt.decode(signed);
    const tokenToTakeExpiresData = jwt.decode(signToTakeExpiresAt);

    const accessToken = generateRandomString(100);
    const refreshToken = generateRandomString(100);

    const accessTokenRecord = await this.repAuth.createAccess(
      accessToken,
      userLogin[0].email,
      idTokenData,
    );
    if (!accessTokenRecord || accessTokenRecord.id === null) {
      throw new Error('Failed to create access token record');
    }

    const refrestTokenRecord = await this.repAuth.createRefresh(
      refreshToken,
      accessTokenRecord[0].id,
      tokenToTakeExpiresData,
    );

    if (!refrestTokenRecord) {
      throw new Error('Failed to create refresh token');
    }

    return {
      email: userLogin[0].email,
      access_token: accessToken,
      refresh_token: refreshToken,
      token: signed,
      iat: (idTokenData as jwt.JwtPayload).iat,
      exp: (idTokenData as jwt.JwtPayload).exp,
    };
  }

  async register(email: string, password: string): Promise<string> {
    const newUser = await this.repAuth.register(email, password);
    if (!newUser) {
      throw new Error('Failed to create user');
    }

    return newUser[0];
  }
}

@Module({
  imports: [ServicesModule],
  providers: [UCAuth],
  exports: [UCAuth],
})
export class UCAuthModule {}
