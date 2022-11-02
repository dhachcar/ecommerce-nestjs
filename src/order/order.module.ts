import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/entities/user.entity';
import { CartModule } from 'src/cart/cart.module';
import { CartEntity } from 'src/cart/entities/cart.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { OrderController } from './controllers/order.controller';
import { OrderEntity } from './entities/order.entity';
import { OrderService } from './services/order.service';

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
  controllers: [OrderController],
})
export class OrderModule {}
