import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OrderEntity } from '../entities/order.entity';
import { OrderService } from '../services/order.service';

@Controller('api/v1/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  public async order(@Req() req): Promise<any> {
    return this.orderService.order(req.user.username);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  public async getOrders(@Req() req): Promise<OrderEntity[]> {
    return await this.orderService.getOrders(req.user.username);
  }
}
