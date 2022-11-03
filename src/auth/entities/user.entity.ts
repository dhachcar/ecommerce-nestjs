import { CartEntity } from 'src/cart/entities/cart.entity';
import { OrderEntity } from 'src/order/entities/order.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updtedAt: string;

  @OneToMany(() => CartEntity, (cart) => cart.id)
  @JoinColumn()
  cart: CartEntity[];

  @OneToOne(() => OrderEntity, (order) => order.id)
  @JoinColumn()
  order: OrderEntity;
}
