export class Menu {
  id: bigint;
  name: string;
  price: number;
  description: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: bigint,
    name: string,
    price: number,
    description: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.description = description;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
