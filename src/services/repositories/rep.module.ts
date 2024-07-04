import { Module } from '@nestjs/common';
import { DBModule } from 'src/infras/db/db.service';
import { RepPGMenu } from 'src/infras/repositories-pg/rep.pg.menu';
import { RepMenu } from './rep.menu';

@Module({
  imports: [DBModule],
  providers: [
    {
      provide: RepMenu,
      useClass: RepPGMenu,
    },
  ],
  exports: [RepMenu],
})
export class RepositoryModule {}
