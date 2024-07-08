export class Order {
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

  constructor(
    id: string,
    customerId: string,
    cashierId: string,
    menuId: string,
    toppingId: string,
    fillingId: string,
    quantity: number,
    totalAmount: number,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.customerId = customerId;
    this.cashierId = cashierId;
    this.menuId = menuId;
    this.toppingId = toppingId;
    this.fillingId = fillingId;
    this.quantity = quantity;
    this.totalAmount = totalAmount;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
