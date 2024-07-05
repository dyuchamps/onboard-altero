import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { ErrorInterceptor } from 'src/middlewares/errors.interceptors';
import { UCMenu } from 'src/usecases/menu/menu.uc.main';
import { RequestBodyDTO_CreateMenu, ResponseBodyDTO_Menu } from './menu.dto';

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

  @Post()
  async createMenu(
    @Body(new ValidationPipe({ transform: true }))
    body: RequestBodyDTO_CreateMenu,
  ) {
    const { name, price, stock, description } = body;

    const response = await this.ucMenu.createMenu(
      name,
      price,
      stock,
      description,
    );

    return response;
  }
}
