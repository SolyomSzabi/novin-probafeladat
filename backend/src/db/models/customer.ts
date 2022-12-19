import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm'
import { Item } from './item';

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  customerID?: number;

  @Column({ nullable: false, type: 'text' })
  name?: string;

  @Column({ nullable: false, type: 'date' })
  creationDate?: Date;

  @OneToMany(()=> Item, item => item.customer)
  items?: Item[];
}