import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthenticationMiddleware } from 'src/middlewares/auth.middleware';
import { ServicesModule } from 'src/services/services.module';
import { UCOrderModule } from 'src/usecases/order/order.uc.main';
import { ErrorHandler } from '../error-handler';
import { OrderController } from './order.controller';
import { OrderErrorHandler } from './order.error-handler';

@Module({
  imports: [ServicesModule, UCOrderModule],
  providers: [
    UCOrderModule,
    {
      provide: ErrorHandler,
      useClass: OrderErrorHandler,
    },
  ],
  controllers: [OrderController],
})
export class AppOrderModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes(OrderController);
  }
}
