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
import { Request } from 'express';
import { ErrorInterceptor } from 'src/middlewares/errors.interceptors';
import { UCOrder } from 'src/usecases/order/order.uc.main';
import { RequestBodyDTO_CreateOrder, ResponseBodyDTO_Order } from './order.dto';
import { QueryParam_Order } from './order.query.params';

@Controller('orders')
@UseInterceptors(ErrorInterceptor)
export class OrderController {
  constructor(private ucOrder: UCOrder) {}

  // @Get(':id')
  // async getTopping(
  //   @Param('id') id: string,
  //   @Res() response,
  // ): Promise<ResponseBodyDTO_Topping> {
  //   const data = await this.ucTopping.getTopping(id);

  //   return response.json({
  //     status: 201,
  //     data,
  //   });
  // }

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
    @Body() body: RequestBodyDTO_CreateOrder,
    @Req() req: Request,
    @Res() response,
  ): Promise<RequestBodyDTO_CreateOrder> {
    const {
      customerId,
      cashierId,
      menuId,
      toppingId,
      fillingId,
      quantity,
      totalAmount,
    } = body;

    // const user = req.user;

    const data = await this.ucOrder.createOrder(
      customerId,
      cashierId,
      menuId,
      toppingId,
      fillingId,
      quantity,
      totalAmount,
    );

    return response.json({
      status: 201,
      message: 'Order created successfully',
      data,
    });
  }
}
