import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/entities/user.entity';
import { CartEntity } from 'src/cart/entities/cart.entity';
import { ProductService } from 'src/product/services/product.service';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly productsService: ProductService,
  ) {}

  public async addToCart(
    productId: number,
    quantity: number,
    user: string,
  ): Promise<any> {
    const cartItems = await this.cartRepository.find({
      relations: ['item', 'user'],
    });
    const product = await this.productsService.getOne(productId);
    const authUser = await this.userRepository.findOneBy({ username: user });

    //Confirm the product exists.
    if (product) {
      //confirm if user has item in cart
      const cart = cartItems.filter(
        (item) => item.item.id === productId && item.user.username === user,
      );

      if (cart.length < 1) {
        const newItem = this.cartRepository.create({
          total: product.price * quantity,
          quantity,
        });
        newItem.user = authUser;
        newItem.item = product;
        this.cartRepository.save(newItem);

        return await this.cartRepository.save(newItem);
      } else {
        //Update the item quantity
        const quantity = (cart[0].quantity += 1);
        const total = cart[0].total * quantity;

        return await this.cartRepository.update(cart[0].id, {
          quantity,
          total,
        });
      }
    }

    return null;
  }

  public async getItemsInCard(user: string): Promise<CartEntity[]> {
    const userCart = await this.cartRepository.find({
      relations: ['item', 'user'],
    });

    return (await userCart).filter((item) => item.user.username === user);
  }
}
