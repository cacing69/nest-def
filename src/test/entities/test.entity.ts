import { Expose, Transform, Type } from 'class-transformer';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Meta } from './meta-test.entity';
import { TestDetail } from './test-detail.entity';

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

  @Expose()
  @OneToOne(() => User, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'created_by' })
  created_by: User;

  @Expose()
  @OneToMany(() => TestDetail, (e: TestDetail) => e.test, {
    eager: false,
  })
  detail: TestDetail[];

  @Column()
  updated_by?: string;

  @Column()
  deleted_by?: string;
}
