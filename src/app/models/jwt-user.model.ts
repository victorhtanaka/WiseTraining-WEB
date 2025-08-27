

export interface JwtUser {
  sub: string;
  role: string;
  exp: number;
  username: string;
}

export class JwtUser implements JwtUser {
  public constructor(init?: Partial<JwtUser>) {
    Object.assign(this, init);
  }
}
