import { plainToClass } from 'class-transformer';
import { IsDefined, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsDefined()
  DB_CONNECTION_STRING: string;
}

export function validateConfig(configuration: Record<string, unknown>) {
  const finalConfig = plainToClass(EnvironmentVariables, configuration, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(finalConfig, { skipMissingProperties: false });
  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
}
