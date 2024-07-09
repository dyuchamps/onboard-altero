import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/services.module';
import { UCAuthModule } from 'src/usecases/auth/auth.uc.main';
import { ErrorHandler } from '../error-handler';
import { AuthController } from './auth.controller';

@Module({
  imports: [ServicesModule, UCAuthModule],
  providers: [
    UCAuthModule,
    {
      provide: ErrorHandler,
      useClass: AuthController,
    },
  ],
  controllers: [AuthController],
})
export class AppAuthModule {}
