import { Injectable, Module } from '@nestjs/common';
import { RepAuth } from 'src/services/repositories/rep.auth';

@Injectable()
export class UCAuth {
  constructor(private repAuth: RepAuth) {}

  async login(email: string, password: string) {
    console.log('login', email, password);
    return this.repAuth.login(email, password);
  }
}

@Module({
  providers: [UCAuth],
  exports: [UCAuth],
})
export class UCAuthModule {}
