export class ResponseBodyDTO_Order {
  id: string;
  customerId: string;
  cashierId: string;
  menuId: string;
  toppingId: string;
  fillingId: string;
  quantity: number;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any) {
    this.id = data.orders.id;
    this.customerId = data.orders.customerId;
    this.cashierId = data.orders.cashierId;
    this.menuId = data.orders.menuId;
    this.toppingId = data.orders.toppingId;
    this.fillingId = data.orders.fillingId;
    this.quantity = data.orders.quantity;
    this.totalAmount = data.orders.totalAmount;
    this.createdAt = data.orders.createdAt;
    this.updatedAt = data.orders.updatedAt;
  }
}

export class RequestBodyDTO_CreateOrder {
  customerId: string;
  cashierId: string;
  menuId: string;
  toppingId: string;
  fillingId: string;
  quantity: number;
  totalAmount: number;

  constructor(data: any) {
    this.customerId = data.orders.customerId;
    this.cashierId = data.orders.cashierId;
    this.menuId = data.orders.menuId;
    this.toppingId = data.orders.toppingId;
    this.fillingId = data.orders.fillingId;
    this.quantity = data.orders.quantity;
    this.totalAmount = data.orders.totalAmount;
  }
}
