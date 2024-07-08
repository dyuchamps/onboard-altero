import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { and, eq, SQL } from 'drizzle-orm';
import { ResponseBodyDTO_Order } from 'src/apps/order/order.dto';
import { QueryParam_Order } from 'src/apps/order/order.query.params';
import { PersistedOrder, RepOrder } from 'src/services/repositories/rep.order';
import { generateRandomString } from 'src/utils/randomString';
import { cashiers } from '../db/schema/cashier';
import { fillings } from '../db/schema/filling';
import { menus } from '../db/schema/menu';
import { orders } from '../db/schema/order';
import { toppings } from '../db/schema/topping';
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
    cashierId: string,
    menuId: string,
    customerName: string,
    quantity: number,
    toppingId?: string,
    fillingId?: string,
  ): Promise<any> {
    try {
      const menu = await this.getDBContext()
        .select()
        .from(menus)
        .where(eq(menus.id, menuId))
        .limit(1);
      if (!menu.length) {
        throw new HttpException('Menu not found', 404);
      }

      const firstItemPrice = Number(menu[0].price);

      const addOns = { topping: null, filling: null };
      let totalAmount = 0;

      const isNotNull = toppingId && fillingId ? true : false;
      if (isNotNull) {
        throw new HttpException('Please choose just one add-on', 400);
      }

      if (toppingId) {
        const topping = await this.getDBContext()
          .select()
          .from(toppings)
          .leftJoin(menus, eq(menus.id, menuId))
          .where(eq(toppings.id, toppingId))
          .limit(1);
        if (!topping.length) {
          throw new HttpException('Topping not found', 404);
        }

        addOns.topping = Number(topping[0]);
      }

      if (fillingId) {
        const filling = await this.getDBContext()
          .select()
          .from(fillings)
          .leftJoin(menus, eq(menus.id, menuId))
          .where(eq(fillings.id, fillingId))
          .limit(1);
        if (!filling.length) {
          throw new HttpException('Filling not found', 404);
        }

        addOns.filling = Number(filling[0]);
      }

      if (addOns.topping && typeof addOns.topping === 'number') {
        totalAmount += addOns.topping;
      }
      if (addOns.filling && typeof addOns.filling === 'number') {
        totalAmount += addOns.filling;
      }

      totalAmount += firstItemPrice;
      totalAmount *= quantity;

      const uniqueId = generateRandomString(10);

      const newOrder = {
        id: uniqueId,
        cashierId,
        menuId,
        toppingId,
        fillingId,
        customerName,
        quantity,
        totalAmount,
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

  async getCashierId(userId: string): Promise<string> {
    try {
      const data = await this.getDBContext()
        .select()
        .from(cashiers)
        .where(eq(cashiers.userId, userId))
        .limit(1);

      if (!data.length) return null;
      else return data[0].id;
    } catch (error) {
      throw error;
    }
  }
}
