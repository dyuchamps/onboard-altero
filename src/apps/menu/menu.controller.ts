import { Controller, Get, Param, UseInterceptors } from '@nestjs/common';
import { ErrorInterceptor } from 'src/middlewares/errors.interceptors';
import { UCMenu } from 'src/usecases/menu/menu.uc.main';
import { ResponseBodyDTO_Menu } from './menu.dto';

@Controller('menus')
@UseInterceptors(ErrorInterceptor)
export class MenuController {
  constructor(private ucMenu: UCMenu) {}

  @Get()
  async listMenu(): Promise<ResponseBodyDTO_Menu[]> {
    return await this.ucMenu.listMenu();
  }

  @Get(':id')
  async getMenu(@Param(':id') id: number): Promise<ResponseBodyDTO_Menu> {
    return await this.ucMenu.getMenu(id);
  }
}
