export interface JwtPayload {
  id: number;
  role: string[];
  organisationId?: number;
}
