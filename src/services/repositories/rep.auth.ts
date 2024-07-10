import { PersistedEntity } from 'src/domains/entities/base';
import { User } from 'src/domains/entities/user';

export class PersistedAuth extends User implements PersistedEntity {
  id: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: string,
    email: string,
    password: string,
    createdAt: Date,
    updatedAt: Date,
  ) {
    super(id, email, password, createdAt, updatedAt);
    this.id = id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }
}

export abstract class RepAuth {
  abstract persist(user: User): Promise<PersistedAuth>;

  abstract login(email: string, password: string): Promise<User>;

  abstract register(email: string, password: string): Promise<User>;
}
