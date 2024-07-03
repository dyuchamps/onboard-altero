import { ConfigService } from '@nestjs/config';
import * as dotenv from 'dotenv';
import { validateConfig } from './config-validate';
dotenv.config();

export class Config {
  constructor(private configService: ConfigService) {}
  getEnvironment(path: string) {
    return this.configService.get(path);
  }
}

const configService = new ConfigService({
  isGlobal: true,
  validate: validateConfig,
});

const configs = new Config(configService);

export const config = {
  DB_CONNECTION_STRING: configs.getEnvironment('DB_CONNECTION_STRING'),
};
