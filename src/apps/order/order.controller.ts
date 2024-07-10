import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { ErrorInterceptor } from 'src/middlewares/errors.interceptors';
import { UCOrder } from 'src/usecases/order/order.uc.main';
import {
  ResponseBodyDTO_CreateOrder,
  ResponseBodyDTO_Order,
} from './order.dto';
import { QueryParam_Order } from './order.query.params';

@Controller('orders')
@UseInterceptors(ErrorInterceptor)
export class OrderController {
  constructor(private ucOrder: UCOrder) {}

  @Get()
  async listOrder(
    @Query() query: QueryParam_Order,
    @Res() response,
  ): Promise<ResponseBodyDTO_Order[]> {
    const listOrder = await this.ucOrder.listOrder(query);

    return response.json({
      status: 201,
      data: listOrder,
    });
  }

  @Post()
  async createOrder(
    @Req() req,
    @Res() response,
    @Body() body: ResponseBodyDTO_CreateOrder,
  ): Promise<ResponseBodyDTO_CreateOrder> {
    // const user: User = req.user;
    // if (!user) {
    //   return response.json({
    //     status: 401,
    //     message: 'Unauthorized',
    //   });
    // }

    const { cashierId, menuId, toppingId, fillingId, customerName, quantity } =
      body;

    // const cashierId = await this.ucOrder.getCashierId(user.id);
    const data = await this.ucOrder.createOrder(
      cashierId,
      menuId,
      customerName,
      quantity,
      toppingId,
      fillingId,
    );

    return response.json({
      status: 201,
      message: 'Order created successfully',
      data,
    });
  }
}
