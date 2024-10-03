import { User } from "../../../modules/users/entities/user.entity";
export declare class GraphUserDto {
    aud: string;
    iss: string;
    iat: number;
    nbf: number;
    exp: number;
    acct: number;
    aio: string;
    azp: string;
    azpacr: string;
    idp: string;
    name: string;
    oid: string;
    preferred_username: string;
    rh: string;
    scp: string;
    sub: string;
    tid: string;
    uti: string;
    ver: string;
    user?: User;
}
