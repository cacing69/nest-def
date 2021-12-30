import { Expose } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Test } from './test.entity';

@Entity('test_detail', { schema: 'dummy' })
export class TestDetail {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  uuid!: string;

  @Column()
  test_uuid!: string;

  @ManyToOne(() => Test, (e: Test) => e.detail)
  @JoinColumn({ name: 'test_uuid', referencedColumnName: 'uuid' })
  test: Test;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
  })
  //   @Expose({ name: 'createdAt' })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP()',
    onUpdate: 'CURRENT_TIMESTAMP()',
  })
  updated_at: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    default: () => null,
  })
  deleted_at: Date;

  @Column()
  created_by?: string;

  @Column()
  updated_by?: string;

  @Column()
  deleted_by?: string;
}
