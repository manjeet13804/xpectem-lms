import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Connection } from 'typeorm';
import { Faq } from './faq.entity';
import { FaqTopic } from './faq-topic.entity';
import { FaqQuestion } from './faq-question.entity';
import { FaqService } from './faq.service';
import { FaqRepository } from './faq.repository';
import { FaqController } from './faq.controller';
import { AdminFaqController } from './admin-faq.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Faq,
      FaqTopic,
      FaqQuestion,
    ]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [
    FaqService,
    {
      provide: 'FaqRepository',
      useFactory: (connection: Connection) => connection.getCustomRepository(FaqRepository),
      inject: [Connection],
    },
  ],
  controllers: [
    FaqController,
    AdminFaqController,
  ],
  exports: [FaqService],
})
export class FaqModule {}
