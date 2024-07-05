import { Controller, Get, Param, Res, UseInterceptors } from '@nestjs/common';
import { ErrorInterceptor } from 'src/middlewares/errors.interceptors';
import { UCTopping } from 'src/usecases/topping/topping.uc.main';

@Controller('toppings')
@UseInterceptors(ErrorInterceptor)
export class ToppingController {
  constructor(private ucTopping: UCTopping) {}

  @Get(':id')
  async getTopping(@Param('id') id: string, @Res() response) {
    const data = await this.ucTopping.getTopping(id);

    return response.json({
      status: 201,
      data,
    });
  }
}
