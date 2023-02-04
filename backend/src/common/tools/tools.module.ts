import { MailerModule } from '@nest-modules/mailer';
import { Module, HttpModule } from '@nestjs/common';
import { Tools } from './tools'


@Module({
  controllers: [],
  exports: [
    Tools
  ],
  imports: [
    MailerModule,
    HttpModule,
  ],
  providers: [Tools],
})
export class ToolsModule {}
