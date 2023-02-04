import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as config from 'config';
import * as crypto from 'crypto';
import * as moment from 'moment';
import { isNil } from 'ramda';
import { Connection } from 'typeorm';

import { User, UserRole } from '../../entity/User';
import { UserEmail } from '../../entity/UserEmail';
import { MyOrganisationService } from '../my-organisation/my-organisation.service';
import { UserProfileService } from '../user/user-profile.service';
import { UserService } from '../user/user.service';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { SigninRequest, SigninResponse } from './interfaces/signin.interface';
import { SignupRequest } from './interfaces/signup.interface';

const PASSWORD_SALT: string = config.get('password.passwordSalt');
const { rolesForCheck } = config.get('outerApi');

@Injectable()
export class AuthService {
  private entityManager = this.connection.createEntityManager();

  constructor(
    private readonly connection: Connection,
    private readonly userService: UserService,
    private readonly userProfileService: UserProfileService,
    private readonly jwtService: JwtService,
    private readonly myOrganisations: MyOrganisationService,
  ) {}

  public async signup(userData: SignupRequest): Promise<HttpStatus> {
    const {
      email,
      firstName,
      lastName,
      password,
    } = userData;
    const lowerCasedEmail = email.toLowerCase();
    const isUserExists = await this.userService.isUserExists(lowerCasedEmail);

    if (isUserExists) {
      throw new HttpException({ error: 'User already exists' }, HttpStatus.BAD_REQUEST);
    }

    const encryptedPassword = await this.encryptPassword(password);
    const user = new User({ firstName, lastName, password: encryptedPassword });
    const userEmail = new UserEmail({
      user,
      email: lowerCasedEmail,
      welcomeEmailSent: moment().toDate(),
    });

    await this.entityManager.save([user, userEmail]);

    return HttpStatus.CREATED;
  }

  public async signin({
    email,
    password,
  }: SigninRequest): Promise<SigninResponse> {
    const lowerCasedEmail = email.toLowerCase();
    const encryptedPassword = await this.encryptPassword(password);
    const user = await this.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userEmail', 'userEmail')
      .leftJoinAndSelect('user.lmsGroups', 'lmsgroup')
      .where('userEmail.email = :lowerCasedEmail', { lowerCasedEmail })
      .andWhere('user.password = :encryptedPassword', { encryptedPassword })
      .getOne();

    if (!user) {
      throw new HttpException({ error: 'User doesn\'t exist or password is invalid' }, HttpStatus.BAD_REQUEST);
    }

    const organisations = await this.myOrganisations.getMyOrganisations(user);

    const organisationId =
      organisations.length === 1
          ? organisations.pop().id
          : null;

    const token = this.createToken(user.id, user.roles, organisationId);
    await this.userProfileService.cancelCloseAccount(user.id);

    return Object.assign(user, {
      token,
      organisationId,
    });
  }

  public async checkUserAccess({
    email,
    password,
  }: SigninRequest): Promise<HttpStatus> {
    const lowerCasedEmail = email.toLowerCase();
    const encryptedPassword = await this.encryptPassword(password);
    const user = await this.connection
      .getRepository(User)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.userEmail', 'userEmail')
      .leftJoinAndSelect('user.groups', 'groups')
      .where('userEmail.email = :lowerCasedEmail', { lowerCasedEmail })
      .andWhere('user.password = :encryptedPassword', { encryptedPassword })
      .getOne();

    const groupHasActiveStatus = user.groups.filter(group => group.isActive).length;
    const hasAccessRole = user.roles.some(role => rolesForCheck.includes(role));

    if (groupHasActiveStatus && hasAccessRole || user.roles.includes(UserRole.XPECTUM_ADMIN)) {
      return HttpStatus.OK;
    }

    return HttpStatus.FORBIDDEN;
  }

  public async adminSignin(authData: SigninRequest) {
    const user = await this.signin(authData);

    if (user.roles.includes(UserRole.USER)) {
      throw new BadRequestException('User is not admin');
    }

    return user;
  }

  public async studentSignin(authData: SigninRequest) {
    const user = await this.signin(authData);

    if (!user.roles.includes(UserRole.USER)) {
      throw new HttpException({ error: 'User doesn\'t exist or password is invalid' }, HttpStatus.BAD_REQUEST);
    }

    return user;
  }

  public encryptPassword(password: string): string {
    return crypto
      .createHmac('sha512', PASSWORD_SALT)
      .update(password)
      .digest('hex');
  }

  public createToken(
    id: number,
    role: string[],
    organisationId?: number,
  ): string {
    const user: JwtPayload = { id, role, organisationId };

    return this.jwtService.sign(user);
  }

  public async validateUser(payload: JwtPayload): Promise<User> {
    const { id } = payload;

    return this.userService.getOneById(id);
  }

  public async updateAuthLog(
    userId: number,
    browser: string,
    operatingSystem: string,
  ) {
    try {
      const userLog = await this.userService.getUserLogByUserId(userId);

      if (isNil(userLog)) {
        throw new BadRequestException('Signin error. Log was not found');
      }

      userLog.browser = browser || 'Other';
      userLog.operatingSystem = operatingSystem || 'Other';
      userLog.latestLogin = moment().toDate();

      return this.entityManager.save(userLog);
    } catch (e) {
      Logger.error(e);
      throw new BadRequestException(e.message);
    }
  }
}
