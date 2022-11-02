import { UserEntity } from 'src/auth/entities/user.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @OneToMany((type) => ProductEntity, (item) => item.id)
  items: ProductEntity[];

  @OneToOne((type) => UserEntity, (user) => user.username)
  @JoinColumn()
  user: UserEntity;

  @Column()
  subTotal: number;

  @Column({ default: false })
  pending: boolean;
}
