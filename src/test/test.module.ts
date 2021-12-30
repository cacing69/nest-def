import { Module } from '@nestjs/common';
import { TestService } from './test.service';
import { TestController } from './test.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Test } from './entities/test.entity';
import { TestDetail } from './entities/test-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Test, TestDetail])],
  controllers: [TestController],
  providers: [TestService],
})
export class TestModule {}
