import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { CreateMenuDto } from './dtos/create-menu.dto';
import { MenuService } from './menu.service';

@Controller('menu')
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Get()
  async listMenus() {
    return this.menuService.findAll();
  }

  @Get('/:id')
  async getMenu(@Param('id') id: string) {
    const menu = await this.menuService.findOne(id);

    if (!menu) {
      throw new NotFoundException('Menu not found');
    }

    return menu;
  }

  @Post()
  async createMenu(@Body() body: CreateMenuDto) {
    return this.menuService.create(body.id);
  }
}
