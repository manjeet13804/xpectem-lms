import { HttpException, HttpStatus } from '@nestjs/common';

export class UserDoesntBelongToOrganisationException extends HttpException {
  static toAny = () => {
    return self.constructor('This user doesnt belong to any organization.');
  }

  constructor(message: string = 'This user doesnt belong to this organization.') {
    super(message, HttpStatus.FORBIDDEN);
  }
}
