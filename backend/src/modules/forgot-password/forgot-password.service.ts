import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

import { UserService } from '../user/user.service';
import { UserProfileService } from './../user/user-profile.service';
import { ForgotPasswordRequest } from './interfaces/forgot-password.interface';
import { UserRole } from "../../entity/User";

@Injectable()
export class ForgotPasswordService {

  constructor(
    private readonly userService: UserService,
    private userProfileService: UserProfileService,
  ) { }

  public async forgot({ email }: ForgotPasswordRequest): Promise<HttpStatus> {
    try {
      const user = await this.userService.getOneByEmail(email);

      if (!user) {
        throw new NotFoundException('The user was not found');
      }

      return this.userProfileService.sendResetMessage(user);
    } catch (e) {
      throw new HttpException({error: 'User doesn\'t exists'}, HttpStatus.BAD_REQUEST);
    }
  }

  public async forgotUser({ email }: ForgotPasswordRequest): Promise<HttpStatus> {
    try {
      const user = await this.userService.getOneByEmail(email);

      if (!user || user.roles[0] !== UserRole.USER) {
        throw new NotFoundException('The user was not found');
      }

      return this.userProfileService.sendResetMessage(user);
    } catch (e) {
      throw new HttpException({error: 'User doesn\'t exists'}, HttpStatus.BAD_REQUEST);
    }
  }

}
