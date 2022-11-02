import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/entities/user.entity';
import { CartModule } from 'src/cart/cart.module';
import { CartEntity } from 'src/cart/entities/cart.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { OrderEntity } from './entities/order.entity';
import { OrderService } from './services/order/order.service';

@Module({
  imports: [
    CartModule,
    TypeOrmModule.forFeature([
      OrderEntity,
      ProductEntity,
      CartEntity,
      UserEntity,
    ]),
  ],
  providers: [OrderService],
})
export class OrderModule {}
