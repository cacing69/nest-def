import { Exclude, Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user', { schema: 'public' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  uuid!: string;

  @Column({ unique: true })
  @Expose()
  email!: string;

  @Column()
  password!: string;

  @Exclude()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  //   @Expose({ name: 'createdAt' })
  created_at: Date;

  @Exclude()
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
    onUpdate: 'CURRENT_TIMESTAMP()',
  })
  updated_at: Date;

  @Exclude()
  @DeleteDateColumn({
    type: 'timestamp',
    default: () => null,
  })
  deleted_at: Date;
}
