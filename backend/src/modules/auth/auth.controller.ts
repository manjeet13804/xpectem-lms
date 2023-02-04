import { Body, Controller, Get, Headers, HttpStatus, Post, Req, Res, UseGuards, UsePipes } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import * as joi from 'joi';
import * as uaParser from 'ua-parser';
import { JoiValidationPipe } from './../../common/pipes/joi-validation.pipe';
import { AuthService } from './auth.service';
import { SigninDto, SigninResponseDto } from './dto/signin.dto';
import { SignupDto } from './dto/signup.dto';
import { AuthGuard } from '@nestjs/passport';
import { ACGuard, UseRoles } from 'nest-access-control';

@Controller('auth')
@ApiUseTags('auth')
export class AuthController {

  constructor(private authService: AuthService) { }

  @Post('signup')
  @ApiOperation({ title: 'Signup' })
  @ApiResponse({
    description: 'The user has been successfully created.',
    status: HttpStatus.OK,
    type: SigninResponseDto,
  })
  @ApiResponse({
    description: 'Validation error or user already exists.',
    status: HttpStatus.BAD_REQUEST,
  })
  @UsePipes(new JoiValidationPipe({
    email: joi.string().email().required(),
    firstName: joi.string().required(),
    lastName: joi.string().required(),
    password: joi.string().required(),
  }))
  public async signup(
    @Body() createUserDto: SignupDto,
    @Req() request,
  ) {
    return this.authService.signup(createUserDto);
  }

  @Post('signin')
  @ApiOperation({ title: 'Signin' })
  @ApiResponse({
    description: 'The user was authenticated.',
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
  public async signin(
    @Body() signinDto: SigninDto,
    @Req() request,
  ) {
    const userAgent = uaParser.parse(request.headers['user-agent']);
    const browser: string = userAgent.ua.toString();
    const operatingSystem: string = userAgent.os.toString();
    const userData = await this.authService.studentSignin(signinDto);
    await this.authService.updateAuthLog(userData.id, browser, operatingSystem);

    return userData;
  }

  @Post('check-user-access')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'any',
    resource: 'check_user_access',
  })
  @ApiOperation({ title: 'Checking access' })
  @ApiResponse({
    description: 'access granted',
    status: HttpStatus.OK,
    type: SigninResponseDto,
  })
  @ApiResponse({
    description: 'access denied',
    status: HttpStatus.BAD_REQUEST,
  })
  @UsePipes(new JoiValidationPipe({
    email: joi.string().email().required(),
    password: joi.string().required(),
  }))
  public async loggedOuter(
      @Body() signinDto: SigninDto,
  ): Promise<HttpStatus> {
    return this.authService.checkUserAccess(signinDto);
  }
}
