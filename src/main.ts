import { NestFactory } from '@nestjs/core';
import { MenuModule } from './apps/menu/menu.module';

async function bootstrap() {
  const app = await NestFactory.create(MenuModule);
  await app.listen(3333);
}
bootstrap();
