import { Module } from '@nestjs/common';
import { Topping } from 'src/domains/entities/topping';
import { RepTopping } from 'src/services/repositories/rep.topping';
import { ServicesModule } from 'src/services/services.module';
import { ToppingNotFound } from './topping.uc.errors';

export class UCTopping {
  constructor(private repTopping: RepTopping) {}

  async getTopping(id: string): Promise<Topping> {
    const data = await this.repTopping.getToppingById(id);
    if (!data) {
      throw new ToppingNotFound('Topping Not Found');
    }

    return data;
  }
}

@Module({
  imports: [ServicesModule],
  providers: [UCTopping],
  exports: [UCTopping],
})
export class UCToppingModule {}
