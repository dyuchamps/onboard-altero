import {
  RequestBodyDTO_CreateMenu,
  ResponseBodyDTO_Menu,
} from 'src/apps/menu/menu.dto';
import { PersistedEntity } from 'src/domains/entities/base';
import { Menu } from 'src/domains/entities/menu';

export class PersistedMenu extends Menu implements PersistedEntity {
  id: bigint;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: bigint,
    createdAt: Date,
    updatedAt: Date,
    name: string,
    price: number,
    description: string,
  ) {
    super(id, name, price, description, createdAt, updatedAt);
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export abstract class RepMenu {
  abstract getMenuById(id: number): Promise<ResponseBodyDTO_Menu>;

  abstract persist(menu: Menu): Promise<PersistedMenu>;

  abstract listMenu(): Promise<PersistedMenu[]>;

  abstract create(
    name: string,
    price: string,
    stock: number,
    description: string,
  ): Promise<RequestBodyDTO_CreateMenu>;
}
