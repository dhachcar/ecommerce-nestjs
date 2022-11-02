import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { CartEntity } from 'src/cart/entities/cart.entity';
import { CartService } from 'src/cart/services/cart/cart.service';

@Controller('api/v1/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  public async AddToCart(@Body() body, @Req() req): Promise<void> {
    const { productId, quantity } = body;
    return await this.cartService.addToCart(
      productId,
      quantity,
      req.user.username,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  public async getItemsInCart(@Req() req): Promise<CartEntity[]> {
    return await this.cartService.getItemsInCard(req.user.username);
  }
}
