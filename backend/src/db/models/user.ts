import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userID?: number;

  @Column({ nullable: false, type: 'text' })
  name?: string;

  @Column({ nullable: false, type: 'text' })
  userName?: string;

  @Column({ nullable: false, type: 'text' })
  email?: string;

  @Column({ nullable: false, type: 'text' })
  password?: string;
}