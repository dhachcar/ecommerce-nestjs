import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/auth/entities/user.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  public async getAll(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }

  public async getOne(id: number): Promise<ProductEntity> {
    return this.productRepository.findOneBy({
      id: id,
    });
  }

  public async create(
    product: ProductEntity,
    user: UserEntity,
  ): Promise<ProductEntity> {
    if (user.role == 'admin') {
      return await this.productRepository.save(product);
    }

    throw new UnauthorizedException();
  }

  public async update(
    id: number,
    product: ProductEntity,
    user: UserEntity,
  ): Promise<UpdateResult> {
    if (user.role == 'admin') {
      return await this.productRepository.update(id, product);
    }

    throw new UnauthorizedException();
  }

  public async delete(id: number, user: UserEntity): Promise<DeleteResult> {
    if (user.role == 'admin') {
      return await this.productRepository.delete(id);
    }

    throw new UnauthorizedException();
  }
}
