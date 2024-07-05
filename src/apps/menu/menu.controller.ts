import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ErrorInterceptor } from 'src/middlewares/errors.interceptors';
import { UCMenu } from 'src/usecases/menu/menu.uc.main';
import {
  RequestBodyDTO_CreateMenu,
  RequestBodyDTO_UpdateMenu,
  ResponseBodyDTO_Menu,
} from './menu.dto';

@Controller('menus')
@UseInterceptors(ErrorInterceptor)
export class MenuController {
  constructor(private ucMenu: UCMenu) {}

  @Get()
  async listMenu(@Res() response): Promise<ResponseBodyDTO_Menu[]> {
    const data = await this.ucMenu.listMenu();

    return response.json({
      status: 200,
      message: 'Successfull get all menu',
      data,
    });
  }

  @Get(':id')
  async getMenu(
    @Param('id') id: string,
    @Res() response,
  ): Promise<ResponseBodyDTO_Menu> {
    const data = await this.ucMenu.getMenu(id);

    return response.json({
      status: 200,
      message: 'Successfull get menu by id',
      data,
    });
  }

  @Post()
  async createMenu(@Res() response, @Body() body: RequestBodyDTO_CreateMenu) {
    const { name, price, stock, description } = body;

    const data = await this.ucMenu.createMenu(name, price, stock, description);

    return response.json({
      status: 201,
      message: 'Menu created successfully',
      data,
    });
  }

  @Put(':id')
  async updateMenu(
    @Param('id') id: string,
    @Res() response,
    @Body() body: RequestBodyDTO_UpdateMenu,
  ) {
    const { name, price, stock, description } = body;
    console.log(body, id);
    const data = await this.ucMenu.updateMenu(
      id,
      name,
      price,
      stock,
      description,
    );

    return response.json({
      status: 200,
      message: 'Menu updated successfully',
      data,
    });
  }
}
