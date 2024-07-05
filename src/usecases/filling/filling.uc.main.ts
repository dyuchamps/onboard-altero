import { Injectable, Module } from '@nestjs/common';
import { QueryParam_Topping } from 'src/apps/topping/topping.query.params';
import { Filling } from 'src/domains/entities/filling';
import { Topping } from 'src/domains/entities/topping';
import { RepFilling } from 'src/services/repositories/rep.filling';
import { ServicesModule } from 'src/services/services.module';
import { FillingNotFound } from './filling.uc.errors';

@Injectable()
export class UCFilling {
  constructor(private repFilling: RepFilling) {}

  async getFilling(id: string): Promise<Topping> {
    const data = await this.repFilling.getFillingById(id);
    if (!data) {
      throw new FillingNotFound('Topping Not Found');
    }

    return data;
  }

  async listFilling(query: QueryParam_Topping): Promise<Array<Filling>> {
    // if (query instanceof QueryParam_Topping) {
    //   throw new QueryNotFound('Query is not valid');
    // }
    // console.log('line 25:', query);
    const listFilling = await this.repFilling.listFilling(query);
    if (listFilling.length === 0) {
      throw new FillingNotFound('Topping is empty');
    }

    return listFilling;
  }
}

@Module({
  imports: [ServicesModule],
  providers: [UCFilling],
  exports: [UCFilling],
})
export class UCToppingModule {}
