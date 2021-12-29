import { Expose, plainToClass, Transform, Type } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Meta } from './meta_test.entity';

@Entity('test', { schema: 'dummy' })
export class Test {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  uuid!: string;

  @Column()
  @Expose()
  key!: string;

  @Column()
  @Expose()
  @Transform((e) => {
    if (e.value == 'lorem_1') {
      return '******';
    } else {
      return e.value;
    }
  })
  value!: string;

  @Column({
    type: 'jsonb',
    array: false,
    default: () => "'{}'",
    nullable: false,
  })
  @Expose()
  @Type(() => Meta)
  meta: object;

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
