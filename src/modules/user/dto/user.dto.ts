import { IsNotEmpty } from "class-validator";
import { RolType } from '../../role/utils/roltype.enum';
import { UserDetails } from "../entities/user.details.entity";


export class UserDto {

    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    roles: RolType[];

    @IsNotEmpty()
    detail: UserDetails

}