export class ResponseBodyDTO_Menu {
  id: bigint;
  name: string;
  price: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any) {
    this.id = data.menu.id;
    this.name = data.menu.name;
    this.price = data.menu.price;
    this.description = data.menu.description;
    this.createdAt = data.menu.createdAt;
    this.updatedAt = data.menu.updatedAt;
  }
}
