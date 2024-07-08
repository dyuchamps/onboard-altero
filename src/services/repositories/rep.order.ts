import {
  RequestBodyDTO_CreateOrder,
  ResponseBodyDTO_Order,
} from 'src/apps/order/order.dto';
import { PersistedEntity } from 'src/domains/entities/base';
import { Order } from 'src/domains/entities/order';

export class PersistedOrder extends Order implements PersistedEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    customerId: string,
    cashierId: string,
    menuId: string,
    toppingId: string,
    fillingId: string,
    quantity: number,
    totalAmount: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(
      id,
      customerId,
      cashierId,
      menuId,
      toppingId,
      fillingId,
      quantity,
      totalAmount,
      createdAt,
      updatedAt,
    );
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export abstract class RepOrder {
  abstract persist(order: Order): Promise<PersistedOrder>;

  abstract listOrder(query): Promise<ResponseBodyDTO_Order[]>;

  abstract create(
    customerId: string,
    cashierId: string,
    menuId: string,
    toppingId: string,
    fillingId: string,
    quantity: number,
    totalAmount: number,
  ): Promise<RequestBodyDTO_CreateOrder>;
}
