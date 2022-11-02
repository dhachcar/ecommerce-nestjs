import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { ProductEntity } from 'src/product/entities/product.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ProductService } from '../services/product.service';

@Controller('api/v1/product')
export class ProductController {
  constructor(private readonly productsService: ProductService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  public async GetAll(): Promise<ProductEntity[]> {
    return await this.productsService.getAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  public async create(
    @Req() req,
    @Body() product: ProductEntity,
  ): Promise<ProductEntity> {
    return await this.productsService.create(product, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  public async getOne(@Param() id: number): Promise<ProductEntity> {
    return await this.productsService.getOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  public async update(
    @Param() id: number,
    @Body() product: ProductEntity,
    @Req() req,
  ): Promise<UpdateResult> {
    return await this.productsService.update(id, product, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public async delete(@Param() id: number, @Req() req): Promise<DeleteResult> {
    return await this.productsService.delete(id, req.user);
  }
}
