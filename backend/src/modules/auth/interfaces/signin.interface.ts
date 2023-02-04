export interface SigninRequest {
  readonly email: string;
  readonly password: string;
}

export interface SigninResponse {
  readonly id: number;
  readonly roles: string[];
  readonly organisationId?: number;
  readonly token: string;
}
