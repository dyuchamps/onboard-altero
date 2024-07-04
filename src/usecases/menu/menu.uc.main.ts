import { Injectable, Module } from '@nestjs/common';
import { Menu } from 'src/domains/entities/menu';
import { RepMenu } from 'src/services/repositories/rep.menu';
import { ServicesModule } from 'src/services/services.module';

@Injectable()
export class UCMenu {
  constructor(private repMenu: RepMenu) {}

  // async getMenu(id: bigint): Promise<ResponseBodyDTO_Menu> {
  //   return await this.repMenu.getMenuById(id);
  // }

  async listMenu(): Promise<Array<Menu>> {
    return await this.repMenu.listMenu();
  }

  async getMenu(id: number): Promise<Menu> {
    return await this.repMenu.getMenuById(id);
  }

  async createMenu(
    name: string,
    price: number,
    stock: number,
    description: string,
  ): Promise<string> {
    const response = await this.repMenu.create(name, price, stock, description);

    const timestamp = new Date().getTime();
    const uniqueId = `${response.id}-${timestamp}`;

    return `Menu ${response.name} created successfully`;
  }
}

@Module({
  imports: [ServicesModule],
  providers: [UCMenu],
  exports: [UCMenu],
})
export class UCMenuModule {}
