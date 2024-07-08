import { Injectable, Module } from '@nestjs/common';
import { QueryParam_Order } from 'src/apps/order/order.query.params';
import { Order } from 'src/domains/entities/order';
import { RepOrder } from 'src/services/repositories/rep.order';
import { ServicesModule } from 'src/services/services.module';
import { OrderNotFound } from './order.uc.error';

@Injectable()
export class UCOrder {
  constructor(private repOrder: RepOrder) {}

  async listOrder(query: QueryParam_Order): Promise<Array<Order>> {
    const data = await this.repOrder.listOrder(query);
    if (data.length === 0) {
      throw new OrderNotFound('Order is empty');
    }

    return data;
  }

  async createOrder(
    customerId: string,
    cashierId: string,
    menuId: string,
    toppingId: string,
    fillingId: string,
    quantity: number,
    totalAmount: number,
  ): Promise<string> {
    const data = await this.repOrder.create(
      customerId,
      cashierId,
      menuId,
      toppingId,
      fillingId,
      quantity,
      totalAmount,
    );

    return data[0];
  }
}

@Module({
  imports: [ServicesModule],
  providers: [UCOrder],
  exports: [UCOrder],
})
export class UCOrderModule {}
