import { Controller, Get, MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validateConfig } from 'src/configs/config-validate';
import { DBModule } from 'src/infras/db/db.service';
import { LoggerMiddleware } from 'src/middlewares/logger.middleware';
import { ServicesModule } from 'src/services/services.module';
import { AppMenuModule } from './menu/menu.app';
import { AppToppingModule } from './topping/topping.app';

@Controller()
export class MainController {
  @Get()
  async check() {
    return 'server is running...';
  }
}

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateConfig,
    }),
    DBModule,
    ServicesModule,
    AppMenuModule,
    AppToppingModule,
  ],
  providers: [DBModule, ServicesModule, AppMenuModule, AppToppingModule],
  controllers: [MainController],
})
export class ApplicationModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
