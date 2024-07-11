import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthenticationMiddleware } from 'src/middlewares/auth.middleware';
import { ServicesModule } from 'src/services/services.module';
import { UCToppingModule } from 'src/usecases/topping/topping.uc.main';
import { ErrorHandler } from '../error-handler';
import { ToppingController } from './topping.controller';
import { ToppingErrorHandler } from './topping.error-handler';

@Module({
  imports: [ServicesModule, UCToppingModule],
  providers: [
    UCToppingModule,
    {
      provide: ErrorHandler,
      useClass: ToppingErrorHandler,
    },
  ],
  controllers: [ToppingController],
})
export class AppToppingModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes(ToppingController);
  }
}
