import { Controller, Get, HttpStatus, Query, UsePipes } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import * as joi from 'joi';
import { UseRoles } from 'nest-access-control';

import { JoiValidationPipe } from './../../common/pipes/joi-validation.pipe';
import { AddEmailDto } from './add-email.dto';
import { AddEmailService } from './add-email.service';

@ApiBearerAuth()
@ApiUseTags('email')
@Controller('email')
export class AddEmailController {

  constructor(
    private addEmailService: AddEmailService,
  ) { }

  @Get()
  @UseRoles({
    action: 'create',
    possession: 'own',
    resource: 'email',
  })
  @ApiOperation({ title: 'Add email to user profile' })
  @ApiResponse({
    description: 'Add email to user profile',
    status: HttpStatus.OK,
  })
  @UsePipes(new JoiValidationPipe({
    token: joi.string().length(64).required(),
  }))
  public async addEmailToUserProfile(
    @Query() data: AddEmailDto,
  ): Promise<HttpStatus> {
    return this.addEmailService.checkAddEmailToken(data.token);
  }

}
