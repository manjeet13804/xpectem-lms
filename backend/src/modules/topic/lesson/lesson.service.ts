import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';

@Injectable()
export class LessonService {
  private entityManager = this.connection.createEntityManager();

  constructor(
    private readonly connection: Connection,
  ) {}

}
