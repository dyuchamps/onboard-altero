import { Injectable } from '@nestjs/common';
import { and, eq, SQL } from 'drizzle-orm';
import { ResponseBodyDTO_Topping } from 'src/apps/topping/topping.dto';
import { QueryParam_Topping } from 'src/apps/topping/topping.query.params';
import {
  PersistedFilling,
  RepFilling,
} from 'src/services/repositories/rep.filling';
import { fillings } from '../db/schema/filling';
import { menus } from '../db/schema/menu';
import { RepPG } from './rep.pg';

@Injectable()
export class RepPGFilling extends RepPG implements RepFilling {
  persist(): Promise<PersistedFilling> {
    throw new Error('Method not implemented.');
  }

  async getFillingById(id: string): Promise<any> {
    try {
      const data = await this.getDBContext()
        .select()
        .from(fillings)
        .where(eq(fillings.id, id))
        .limit(1);

      if (!data.length) return null;
      else return data[0];
    } catch (error) {
      throw error;
    }
  }

  async listFilling(
    query: QueryParam_Topping,
  ): Promise<ResponseBodyDTO_Topping[]> {
    const whereQuery: SQL[] = [];

    const queryFields = {
      id: fillings.id,
      menuId: fillings.menuId,
    };

    for (const key in queryFields) {
      if (query[key]) {
        whereQuery.push(eq(queryFields[key], query[key]));
      }
    }

    const response = await this.getDBContext()
      .select()
      .from(fillings)
      .leftJoin(menus, eq(menus.id, fillings.menuId))
      .where(and(...whereQuery));

    const filteredResponseDTO = [];

    for (const event of response) {
      const dto = new ResponseBodyDTO_Topping(event);
      filteredResponseDTO.push(dto);
    }
    return filteredResponseDTO;
  }
}
