import { ServicesModule } from 'src/services/services.module';
import { UCToppingModule } from 'src/usecases/topping/topping.uc.main';
import { MenuErrorHandler } from '../menu/menu.error-handler';

@Module({
  imports: [ServicesModule, UCToppingModule],
  providers: [
    UCToppingModule,
    {
      provide: MenuErrorHandler,
      useClass: MenuErrorHandler,
    },
  ],
  controllers: [MenuController],
})
export class AppMenuModule {}
