import { Body, Controller, HttpStatus, Post, Req, SerializeOptions, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import * as joi from 'joi';
import * as uaParser from 'ua-parser';

import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe';
import { AuthService } from './auth.service';
import { SigninDto, SigninResponseDto } from './dto/signin.dto';

@Controller('admin/auth')
@ApiUseTags('admin auth')
export class AdminAuthController {

  constructor(private authService: AuthService) { }

  @Post('signin')
  @ApiOperation({ title: 'Admin signin' })
  @SerializeOptions({ groups: ['admin-profile']})
  @ApiResponse({
    description: 'The admin user was authenticated.',
    status: HttpStatus.OK,
    type: SigninResponseDto,
  })
  @ApiResponse({
    description: 'Validation error or user doesn\'t exist or password is invalid.',
    status: HttpStatus.BAD_REQUEST,
  })
  @UsePipes(new JoiValidationPipe({
    email: joi.string().email().required(),
    password: joi.string().required(),
  }))
  public async adminSignin(
    @Body() signinDto: SigninDto,
    @Req() request,
  ) {
    const userAgent = uaParser.parse(request.headers['user-agent']);
    const browser: string = userAgent.ua.toString();
    const operatingSystem: string = userAgent.os.toString();
    const userData = await this.authService.adminSignin(signinDto);
    await this.authService.updateAuthLog(userData.id, browser, operatingSystem);

    return userData;
  }

}
