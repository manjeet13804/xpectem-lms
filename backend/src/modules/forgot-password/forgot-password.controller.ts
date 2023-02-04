import { Body, Controller, HttpStatus, Post, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import * as joi from 'joi';

import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe';
import { ForgotPasswordDto } from './dto/forgot-password.dto';
import { ForgotPasswordService } from './forgot-password.service';

@Controller('forgot-password')
@ApiUseTags('forgot password')
export class ForgotPasswordController {

  constructor(private forgotPasswordService: ForgotPasswordService) { }

  @Post()
  @ApiOperation({ title: 'Request password reset' })
  @ApiResponse({
    description: 'Email has been successfully sent.',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Validation error or user doesn\'t exists',
    status: HttpStatus.BAD_REQUEST,
  })
  @UsePipes(new JoiValidationPipe({
    email: joi.string().email().required(),
  }))
  public async forgot(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ) {
    return this.forgotPasswordService.forgot(forgotPasswordDto);
  }

  @Post('/user')
  @ApiOperation({ title: 'Request password reset' })
  @ApiResponse({
    description: 'Email has been successfully sent.',
    status: HttpStatus.OK,
  })
  @ApiResponse({
    description: 'Validation error or user doesn\'t exists',
    status: HttpStatus.BAD_REQUEST,
  })
  @UsePipes(new JoiValidationPipe({
    email: joi.string().email().required(),
  }))
  public async forgoUser(
    @Body() forgotPasswordDto: ForgotPasswordDto,
  ) {
    return this.forgotPasswordService.forgotUser(forgotPasswordDto);
  }

}
