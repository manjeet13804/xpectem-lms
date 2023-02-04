import { PassportModule } from '@nestjs/passport';
import { forwardRef, Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import { ToolsModule } from '../../common/tools/tools.module';

@Module({
  controllers: [UploadController],
  exports: [UploadService],
  imports: [PassportModule.register({ defaultStrategy: 'jwt' }), forwardRef(() => ToolsModule)],
  providers: [UploadService],
})
export class UploadModule {}
