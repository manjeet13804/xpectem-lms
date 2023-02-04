import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';

import { User } from '../../entity/User';
import { Group } from '../../entity/Group';
import { Organisation } from '../../entity/Organisation';
import { SelectMyOrganisationDto } from './select-my-organisation.dto';
import { UserDoesntBelongToOrganisationException } from './user-doesnt-belong-to-organisation.exception';

@Injectable()
export class MyOrganisationService {
  constructor(
      @InjectRepository(User) private readonly users: Repository<User>,
      @InjectRepository(Group) private readonly groups: Repository<Group>,
      @InjectRepository(Organisation) private organisationsRepository: Repository<Organisation>,
      private readonly jwtService: JwtService,
  ) {}

  async getMyOrganisations(user: User): Promise<Organisation[]> {
    const groups = await this.users
        .createQueryBuilder()
        .relation(User, 'groups')
        .of(user)
        .loadMany();

    if (groups.length === 0) {
      return [];
    }

    return this.groups
        .createQueryBuilder()
        .relation(Group, 'organisation')
        .of(groups)
        .loadMany();
  }

  async selectMyOrganisation(user: User, organisationId: number): Promise<SelectMyOrganisationDto> {
    const organisations = await this.getMyOrganisations(user);

    if (organisations.length === 0) {
      throw UserDoesntBelongToOrganisationException.toAny();
    }

    const organisation = organisations.find(
        ({ id }: Organisation) => id === Number(organisationId),
    );

    if (organisation === undefined) {
      throw new UserDoesntBelongToOrganisationException();
    }

    const token = this.jwtService.sign({
      id: user.id,
      role: [user.roles],
      organisationId: organisation.id,
    });

    return Object.assign(user, {
      token,
      organisationId: organisation.id,
    }) as any;
  }

  public async getWelcome(id: number, userId: number): Promise<{
    id: number,
    logoImageUri: string,
    userWelcomeText: string,
  }> {
    try {
      const user = await this.users
        .createQueryBuilder('user')
        .leftJoinAndSelect('user.language', 'lang')
        .where({ id: userId })
        .getOne();
      const { language } = user;
      const organisation = await this.organisationsRepository
        .createQueryBuilder('organisation')
        .leftJoinAndSelect('organisation.translations', 'ot')
        .leftJoin('organisation.users', 'user')
        .where({ id })
        .getOne();
      const { logoImageUri } = organisation;

      if (!organisation.translations.length) {
        return {
          id,
          logoImageUri,
          userWelcomeText: '',
        }
      }
      const userWelcomeText = organisation.translations.find(item => item.language === language).studentWelcomeText;

      return {
        id,
        logoImageUri,
        userWelcomeText,
      };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
