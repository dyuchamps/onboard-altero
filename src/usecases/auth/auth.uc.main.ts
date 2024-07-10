import { Injectable, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { RepAuth } from 'src/services/repositories/rep.auth';
import { ServicesModule } from 'src/services/services.module';

@Injectable()
export class UCAuth {
  constructor(
    private repAuth: RepAuth,
    private jwtService: JwtService,
  ) {}

  async login(
    email: string,
    password: string,
  ): Promise<{ user: string; access_token: string }> {
    const userLogin = await this.repAuth.login(email, password);
    if (!userLogin) {
      throw new Error('Failed to login');
    }

    const payload = {
      sub: userLogin[0].id,
      email: userLogin[0].email,
    };
    return {
      user: userLogin[0].id,
      access_token: await this.jwtService.signAsync(payload),
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
