import { Module } from '@nestjs/common';
import { DBModule } from 'src/infras/db/db.service';
import { RepPGMenu } from 'src/infras/repositories-pg/rep.pg.menu';
import { RepPGTopping } from 'src/infras/repositories-pg/rep.pg.topping';
import { RepMenu } from './rep.menu';
import { RepTopping } from './rep.topping';

@Module({
  imports: [DBModule],
  providers: [
    {
      provide: RepMenu,
      useClass: RepPGMenu,
    },
    {
      provide: RepTopping,
      useClass: RepPGTopping,
    },
  ],
  exports: [RepMenu, RepTopping],
})
export class RepositoryModule {}
