import { IsInt, IsString } from 'class-validator';

export class ResponseBodyDTO_Menu {
  id: bigint;
  name: string;
  price: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any) {
    this.id = data.menus.id;
    this.name = data.menus.name;
    this.price = data.menus.price;
    this.description = data.menus.description;
    this.createdAt = data.menus.createdAt;
    this.updatedAt = data.menus.updatedAt;
  }
}

export class RequestBodyDTO_CreateMenu {
  @IsString()
  name: string;
  price: string;

  @IsInt()
  stock: number;

  @IsString()
  description: string;
}
