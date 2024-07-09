import { User } from 'src/domains/entities/user';

export abstract class RepAuth {
  abstract getUserByToken(type: string, token: string): Promise<User>;
}
