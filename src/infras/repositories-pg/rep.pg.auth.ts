import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { PersistedAuth, RepAuth } from 'src/services/repositories/rep.auth';
import { comparePlainAndEncrypt } from 'src/utils/crypto';
import { generateRandomString } from 'src/utils/randomString';
import { users } from '../db/schema/user';
import { RepPG } from './rep.pg';

@Injectable()
export class RepPGAuth extends RepPG implements RepAuth {
  persist(): Promise<PersistedAuth> {
    throw new Error('Method not implemented.');
  }

  async login(email: string, password: string): Promise<any> {
    try {
      const user = await this.getDBContext()
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (!user) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }

      const isMatch = await comparePlainAndEncrypt(password, user[0].password);
      if (!isMatch) {
        throw new HttpException(
          'Invalid email and password',
          HttpStatus.BAD_REQUEST,
        );
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  async register(email: string, password: string): Promise<any> {
    try {
      const userExist = await this.getDBContext()
        .select()
        .from(users)
        .where(eq(users.email, email))
        .limit(1);

      if (userExist.length > 0) {
        throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
      }

      const newUser = {
        id: generateRandomString(10),
        email,
        password,
        updatedAt: new Date(),
      };

      const user = await this.getDBContext()
        .insert(users)
        .values(newUser)
        .returning();

      if (!user) {
        throw new HttpException(
          'Failed to create user',
          HttpStatus.BAD_REQUEST,
        );
      }

      return user;
    } catch (error) {
      throw error;
    }
  }
}
