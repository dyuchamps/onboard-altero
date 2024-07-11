import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthenticationMiddleware } from 'src/middlewares/auth.middleware';
import { ServicesModule } from 'src/services/services.module';
import { UCAuthModule } from 'src/usecases/auth/auth.uc.main';
import { ErrorHandler } from '../error-handler';
import { AuthController } from './auth.controller';
import { AuthErrorHandler } from './auth.error-handler';

@Module({
  imports: [ServicesModule, UCAuthModule],
  providers: [
    UCAuthModule,
    {
      provide: ErrorHandler,
      useClass: AuthErrorHandler,
    },
  ],
  controllers: [AuthController],
})
export class AppAuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthenticationMiddleware)
      .exclude('/admin/auth/login', '/admin/auth/register')
      .forRoutes(AuthController);
  }
}
