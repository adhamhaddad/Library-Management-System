import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
  ManyToOne,
} from 'typeorm';
import { IBorrowing } from '../interfaces/borrowing.interface';
import { User } from 'src/modules/auth/entities/user.entity';
import { Book } from 'src/modules/book/entities/book.entity';

@Entity({ name: 'borrowings' })
export class Borrowing implements IBorrowing {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid', unique: true, nullable: false })
  @Generated('uuid')
  uuid: string;

  @ManyToOne(() => User, (user) => user.borrowings)
  user: User;

  @ManyToOne(() => Book, (book) => book.borrowings)
  book: Book;

  @Column({ type: 'date', nullable: false })
  check_out_date: Date;

  @Column({ type: 'date', nullable: false })
  due_date: Date;

  @Column({ type: 'date', nullable: true, default: null })
  return_date: Date | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updated_at: Date;
}
