// export class ResponseBodyDTO_Topping {
//   @IsString()
//   id: string;

//   @IsString()
//   menuId: string;

//   @IsString()
//   name: string;

//   @IsInt()
//   price: number;

//   @IsDate()
//   createdAt: Date;
//   updatedAt: Date;
// }

export class ResponseBodyDTO_Topping {
  id: string;
  menuId: string;
  name: string;
  price: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any) {
    this.id = data.toppings.id;
    this.menuId = data.toppings.menuId;
    this.name = data.toppings.name;
    this.price = data.toppings.price;
    this.createdAt = data.toppings.createdAt;
    this.updatedAt = data.toppings.updatedAt;
  }
}
