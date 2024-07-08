import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { and, eq, SQL } from 'drizzle-orm';
import { ResponseBodyDTO_Order } from 'src/apps/order/order.dto';
import { QueryParam_Order } from 'src/apps/order/order.query.params';
import { PersistedOrder, RepOrder } from 'src/services/repositories/rep.order';
import { generateRandomString } from 'src/utils/randomString';
import { cashiers } from '../db/schema/cashier';
import { customers } from '../db/schema/customer';
import { menus } from '../db/schema/menu';
import { orders } from '../db/schema/order';
import { RepPG } from './rep.pg';

@Injectable()
export class RepPGOrder extends RepPG implements RepOrder {
  persist(): Promise<PersistedOrder> {
    throw new Error('Method not implemented.');
  }

  async listOrder(query: QueryParam_Order): Promise<ResponseBodyDTO_Order[]> {
    const whereQuery: SQL[] = [];

    const queryFields = {
      id: orders.id,
      menu_id: orders.menuId,
      customer_id: orders.customerId,
      cashier_id: orders.cashierId,
    };

    for (const key in queryFields) {
      if (query[key]) {
        whereQuery.push(eq(queryFields[key], query[key]));
      }
    }

    const data = await this.getDBContext()
      .select()
      .from(orders)
      .leftJoin(menus, eq(menus.id, orders.menuId))
      .leftJoin(customers, eq(customers.id, orders.customerId))
      .leftJoin(cashiers, eq(cashiers.id, orders.cashierId))
      .where(and(...whereQuery));

    const filteredResponseDTO = [];

    for (const event of data) {
      const dto = new ResponseBodyDTO_Order(event);
      filteredResponseDTO.push(dto);
    }

    return filteredResponseDTO;
  }

  async create(
    customerId: string,
    cashierId: string,
    menuId: string,
    toppingId: string,
    fillingId: string,
    quantity: number,
    totalAmount: number,
  ): Promise<any> {
    try {
      const uniqueId = generateRandomString(10);

      const newOrder = {
        id: uniqueId,
        customerId: customerId,
        cashierId: cashierId,
        menuId: menuId,
        toppingId: toppingId,
        fillingId: fillingId,
        quantity: quantity,
        totalAmount: totalAmount,
        updatedAt: new Date(),
      };

      const createOrder = await this.getDBContext()
        .insert(orders)
        .values(newOrder as any)
        .returning();

      if (!createOrder) {
        throw new HttpException(
          'Failed to create new order :',
          HttpStatus.NOT_FOUND,
        );
      }

      return createOrder;
    } catch (error) {
      throw error;
    }
  }
}
