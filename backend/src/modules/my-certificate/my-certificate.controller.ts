import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import {
  Controller,
  Get,
  HttpStatus,
  Param,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ACGuard, UseRoles } from 'nest-access-control';
import { MyCertificateService } from './my-certificate.service';
import { MyCertificateDto } from './my-certificate.dto';

@ApiBearerAuth()
@ApiUseTags('my-certificate')
@Controller('my-certificate')
export class MyCertificateController {
  constructor(private certificates: MyCertificateService) {
  }

  @Get()
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'my-certificate',
  })
  @ApiOperation({ title: 'Get certificates' })
  @ApiResponse({
    description: 'Returns an list of user certificates.',
    status: HttpStatus.OK,
    type: [MyCertificateDto],
  })
  getMyCertificates(
    @Param('id') id: number,
    @Req() { user },
  ) {
    return this.certificates.getMyCertificates(user);
  }
}
