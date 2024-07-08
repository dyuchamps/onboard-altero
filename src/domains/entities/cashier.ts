export class Cashier {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    userId: string,
    firstName: string,
    lastName: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    this.id = id;
    this.userId = userId;
    this.firstName = firstName;
    this.lastName = lastName;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
