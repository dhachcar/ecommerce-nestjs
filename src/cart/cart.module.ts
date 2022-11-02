import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/entities/user.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { ProductModule } from 'src/product/product.module';
import { CartEntity } from './entities/cart.entity';
import { CartService } from './services/cart/cart.service';
import { CartController } from './controllers/cart/cart.controller';

@Module({
  imports: [
    ProductModule,
    TypeOrmModule.forFeature([CartEntity, ProductEntity, UserEntity]),
  ],
  providers: [CartService],
  exports: [CartService],
  controllers: [CartController],
})
export class CartModule {}
