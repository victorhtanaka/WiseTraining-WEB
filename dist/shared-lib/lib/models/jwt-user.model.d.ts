export interface JwtUser {
    sub: string;
    role: string;
    exp: number;
    username: string;
    companyId?: number;
}
export declare class JwtUser implements JwtUser {
    constructor(init?: Partial<JwtUser>);
}
