import { MailerService } from '@nest-modules/mailer';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiImplicitFile,
  ApiOperation,
  ApiResponse,
  ApiUseTags,
} from '@nestjs/swagger';
import * as toStream from 'buffer-to-stream';
import * as config from 'config';
import * as csv from 'fast-csv';
import * as joi from 'joi';
import {
  ACGuard,
  UseRoles,
  UserRoles,
} from 'nest-access-control';
import { generate as randomString } from 'randomstring';
import * as XLSX from 'xlsx';

import { JoiValidationPipe } from '../../common/pipes/joi-validation.pipe';
import { User, UserRole } from '../../entity/User';
import { AuthService } from '../auth/auth.service';
import {
  UserDto,
  UserFtsDto,
  UserUpdateDto,
} from './dto/user.dto';
import { IUser } from './interfaces/user.interface';
import { UserService } from './user.service';
import { UserProfileService } from './user-profile.service';
import { IRequest } from 'src/common/interfaces/globalInterfaces';
import { UserProfile } from './dto/admin.dto';
import { ROLES_WEIGHT } from '../../common/enums/constants';
import { REGEXP } from '../../common/regexp/regexp';

const FRONTEND_HOST: string = config.get('frontendHost');
const DEFAULT_PASSWORD_LENGTH: number = config.get('password.defaultPasswordLength');
const MAX_EMAIL_COUNT: number = config.get('user.account.maxEmailCount');
const MAX_PHONE_COUNT: number = config.get('user.account.maxPhoneCount');

@ApiBearerAuth()
@ApiUseTags('admin_user')
@Controller('admin/user')
export class AdminUserController {

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private mailerService: MailerService,
    private userProfileService: UserProfileService,
  ) { }


  @Get('/information')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'own',
    resource: 'user',
  })
  @ApiOperation({ title: 'Get admin information' })
  @ApiResponse({
    description: 'Get information about user',
    status: HttpStatus.OK,
    type: User,
  })
  public async getAdminInfo(
    @Req() { user }: IRequest
  ): Promise<User> { 
    return this.userService.getAdminInfo(user);
  }

  @Get()
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'own',
    resource: 'user',
  })
  @ApiOperation({ title: 'Get all users' })
  @ApiResponse({
    description: 'Returns all user\'s records.',
    status: HttpStatus.OK,
  })
  public async getAll() {
    return this.userService.getAll();
  }

  @Get('fts')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'read',
    possession: 'own',
    resource: 'user',
  })
  @ApiOperation({ title: 'Get all users by email or name' })
  @ApiResponse({
    description: 'Returns matching user\'s records.',
    status: HttpStatus.OK,
  })
  public async fts(
    @Query() query: UserFtsDto,
  ) {
    return this.userService.fts(query.query);
  }

  @Post()
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'user',
  })
  @ApiOperation({ title: 'Create user' })
  @ApiResponse({
    description: 'The record has been successfully created.',
    status: HttpStatus.OK,
  })
  @UsePipes(new JoiValidationPipe({
    email: joi.string().email().required(),
      firstName: joi.string().required(),
      lastName: joi.string().required(),
      phone: joi.string(),
      postalCode: joi.string(),
      postalAddress: joi.string(),
      streetAddress: joi.string(),
      roles: joi.string().valid(Object.keys(ROLES_WEIGHT)).required(),
      groups: joi.array().items(joi.number()),
    }))
  public async createUser(
    @Body() userDto: UserDto,
    @UserRoles() userRoles,
  ) {
    const lowerCasedEmail = userDto.email.toLowerCase();

    const userData = {
      ...userDto,
      email: lowerCasedEmail,
    };

    await this.importUser(userData);

    return HttpStatus.OK;
  }

  @Post('import')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'create',
    possession: 'any',
    resource: 'user',
  })
  @ApiOperation({
    title: 'Import users from file',
    description: 'Supported formats: .csv, .xls, .xlsx',
  })
  @ApiResponse({
    description: 'Records has been successfully created.',
    status: HttpStatus.OK,
  })
  @ApiConsumes('multipart/form-data')
  @ApiImplicitFile({ name: 'file', required: true, description: 'List of users' })
  @UseInterceptors(FileInterceptor('file'))
  import(@UploadedFile() file) {
    if (file.mimetype === 'text/csv') {
      const stream = toStream(file.buffer);

      return new Promise((resolve, reject) => {
        const csvStream = csv({
          headers: true,
          objectMode: true,
          ignoreEmpty: true,
          strictColumnHandling: true,
        })
          .on('end', (data) => {
            if (data === 0) {
              return reject();
            }

            return resolve();
          })
          .on('data', (user: IUser) => {
            const lowerCasedEmail = user.email.toLowerCase();
            const userData: IUser = {
              ...user,
              roles: [UserRole.USER],
              email: lowerCasedEmail,
            };

            this.importUser(userData);
          });

        stream.pipe(csvStream);
      })
        .then(() => {
          return HttpStatus.OK;
        })
        .catch(() => {
          throw new BadRequestException('Error while parsing file');
        });
    }

    const xlsxRegexp = /\.xlsx?/;

    if (xlsxRegexp.test(file.originalname)) {
      const wb = XLSX.read(file.buffer, { type:'buffer' });
      const { SheetNames } = wb;

      SheetNames.forEach((sheetName) => {
        try {
          const usersData = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
          usersData.forEach((user: IUser) => {
            const lowerCasedEmail = user.email.toLowerCase();
            const userData: IUser = {
              ...user,
              roles: [UserRole.USER],
              email: lowerCasedEmail,
            };

            this.importUser(userData);
          });
        } catch (err) {
          throw new BadRequestException(`Error while parsing sheet "${sheetName}"`);
        }
      });

      return HttpStatus.OK;
    }
  }

  getEncryptedPassword(length: number) {
    const password = randomString(length);

    return this.authService.encryptPassword(password);
  }

  async importUser(userData: IUser) {
    const password = this.getEncryptedPassword(DEFAULT_PASSWORD_LENGTH);

    try {
      await this.userService.create({
        ...userData,
        password,
      });
      const user = await this.userService.getOneByEmail(userData.email); // TODO: why?
      const token = randomString(64);
      await this.mailerService.sendMail({
        template: 'registration',
        subject: 'Registration - Xpectum',
        to: userData.email,
        context: {
          link: `${FRONTEND_HOST}/forgot-password?token=${token}`,
          login: userData.email,
        },
      });
    } catch (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        console.error({ error: 'User already exists', email: userData.email });

        return;
      }

      console.error({ error: err, email: userData.email });
    }
  }

  @Put(':id')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'any',
    resource: 'user',
  })
  @ApiOperation({ title: 'Update user' })
  @ApiResponse({
    description: 'The record has been successfully updated.',
    status: HttpStatus.OK,
  })
  @UsePipes(new JoiValidationPipe({
      firstName: joi.string(),
      lastName: joi.string(),
      phone: joi.string(),
      postalCode: joi.string(),
      postalAddress: joi.string(),
      streetAddress: joi.string(),
      roles: joi.string().valid(Object.keys(ROLES_WEIGHT)),
      groups: joi.array().items(joi.number()),
    }))
  async updateUser(
    @Param('id') id,
    @Body() userDto: UserUpdateDto,
    @UserRoles() userRoles,
  ) {   

     return this.userService.update(id, userDto as IUser);
  }

  @Post('reset-password/:id')
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'any',
    resource: 'admin-student',
  })
  @ApiOperation({ title: 'Reset student password' })
  @ApiResponse({
    description: 'Reset student password',
    status: HttpStatus.OK,
  })
  public async resetPassword(
    @Param('id') studentId,
  ) {    
    return this.userProfileService.resetUserPassword(studentId);
  }

  @Put()
  @UseGuards(AuthGuard(), ACGuard)
  @UseRoles({
    action: 'update',
    possession: 'own',
    resource: 'user',
  })
  @ApiOperation({ title: 'Update user profile' })
  @ApiResponse({
    description: 'User profile has updated',
    status: HttpStatus.OK,
    type: User,
  })
  @ApiResponse({
    description: 'Validation error',
    status: HttpStatus.BAD_REQUEST,
  })
  @ApiImplicitFile({ name: 'file', description: 'File to upload' })
  @UseInterceptors(FileInterceptor('file'))
  @UsePipes(new JoiValidationPipe({
      firstName: joi.string(),
      avatar: joi.string().allow(null),
      lastName: joi.string(),
      emails: joi
        .array()
        .items(joi.string().email())
        .min(0)
        .max(MAX_EMAIL_COUNT),
      phones: joi
        .array()
        .items(
          joi
            .string()
            .regex(REGEXP.PHONE_NUMBER)
        )
        .min(0)
        .max(MAX_PHONE_COUNT),
      language: joi
        .number()
        .positive()
        .integer(),
      notifyEmail: joi.boolean(),
      notifySms: joi.boolean(),
    }))
  async updateUserProfile(
    @Body() userDto: UserProfile,
    @UploadedFile() file,
    @Req() { user }: { user: User },
  ): Promise<User> {

    return this.userService.updateUserProfile(userDto, user, file);
  }
}
