import { PersistedEntity } from 'src/domains/entities/base';
import { Topping } from 'src/domains/entities/topping';

export class PersistedTopping extends Topping implements PersistedEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    menuId: string,
    name: string,
    price: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(id, menuId, name, price, createdAt, updatedAt);
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export abstract class RepTopping {
  abstract getToppingById(id: string): Promise<PersistedTopping>;
}
