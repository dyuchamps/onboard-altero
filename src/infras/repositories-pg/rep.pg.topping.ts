import { eq } from 'drizzle-orm';
import { RepTopping } from 'src/services/repositories/rep.topping';
import { toppings } from '../db/schema/topping';
import { RepPG } from './rep.pg';

export class RepPGTopping extends RepPG implements RepTopping {
  async getToppingById(id: string): Promise<any> {
    try {
      const data = await this.getDBContext()
        .select()
        .from(toppings)
        .where(eq(toppings.id, id))
        .limit(1);

      if (!data.length) return null;
      else return data[0];
    } catch (error) {
      throw error;
    }
  }
}
