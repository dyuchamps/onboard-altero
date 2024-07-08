export class User {
  id: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(id: string, email: string, createdAt: Date, updatedAt: Date) {
    this.id = id;
    this.email = email;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}
