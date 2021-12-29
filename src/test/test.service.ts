import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getManager, Repository } from 'typeorm';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { Test } from './entities/test.entity';

@Injectable()
export class TestService {
  constructor(
    @InjectRepository(Test)
    private testRepository: Repository<Test>,
  ) {}

  create(createTestDto: CreateTestDto) {
    return 'This action adds a new test';
  }

  rawTest() {
    const entityManager = getManager();
    const query = entityManager.query(
      `
      SELECT
        t1.function
      FROM crdb_internal.builtin_functions as t1 where 1 = $1
    `,
      [1],
    );

    console.log(query);
    return query;
  }

  findAll(): Promise<Test[]> {
    return this.testRepository.find();
  }

  findOne(id: string): Promise<Test> {
    return this.testRepository.findOne(id);
  }

  update(id: number, updateTestDto: UpdateTestDto) {
    return `This action updates a #${id} test`;
  }

  remove(id: number) {
    return `This action removes a #${id} test`;
  }
}
