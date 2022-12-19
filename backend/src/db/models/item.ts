import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Customer } from './customer';

@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  itemID?: number;

  @Column({ nullable: false, type: 'text' })
  itemName?: string;

  @Column({ nullable: false, type: 'date' })
  creationDate?: Date;

  @Column({ nullable: false, type: 'text' })
  comment?: string;

  @Column({ nullable: false, type: 'int' })
  price?: number;

  @Column({ nullable: false, type: 'text' })
  status?: string;

  @ManyToOne(()=> Customer, customer => customer.items, {
    onDelete: 'CASCADE',
  })
  customer?: Customer;
}