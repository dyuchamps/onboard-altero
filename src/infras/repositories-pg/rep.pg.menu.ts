import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { PersistedMenu, RepMenu } from 'src/services/repositories/rep.menu';
import { menus } from '../db/schema/menu';
import { RepPG } from './rep.pg';

@Injectable()
export class RepPGMenu extends RepPG implements RepMenu {
  persist(): Promise<PersistedMenu> {
    throw new Error('Method not implemented.');
  }

  async getMenuById(id: number): Promise<any> {
    try {
      const data = await this.getDBContext()
        .select()
        .from(menus)
        .where(eq(menus.id, id))
        .limit(1);

      if (!data.length) return null;
      else return data[0];
    } catch (error) {
      throw error;
    }
  }

  async listMenu(): Promise<any> {
    try {
      const data = this.getDBContext().select().from(menus);
      if (!(await data).length) return null;
      else return data;
    } catch (error) {
      throw error;
    }
  }

  async create(
    name: string,
    price: number,
    stock: number,
    description: string,
  ): Promise<any> {
    try {
      const uniqueId = Math.floor(Math.random() * 1000);
      const newMenu = {
        id: uniqueId,
        name,
        price,
        stock,
        description,
        created_at: new Date(),
        updated_at: new Date(),
      };

      const createMenu = await this.getDBContext()
        .insert(menus)
        .values(newMenu)
        .returning();

      if (!createMenu) {
        throw new HttpException(
          'Failed to create new menu :',
          HttpStatus.NOT_FOUND,
        );
      }
      return createMenu;
    } catch (error) {
      throw error;
    }
  }
}
