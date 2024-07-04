import { Module } from '@nestjs/common';
import { ServicesModule } from 'src/services/services.module';
import { UCMenuModule } from 'src/usecases/menu/menu.uc.main';
import { ErrorHandler } from '../error-handler';
import { MenuController } from './menu.controller';
import { MenuErrorHandler } from './menu.error-handler';

@Module({
  imports: [ServicesModule, UCMenuModule],
  providers: [
    UCMenuModule,
    {
      provide: ErrorHandler,
      useClass: MenuErrorHandler,
    },
  ],
  controllers: [MenuController],
})
export class AppMenuModule {}
