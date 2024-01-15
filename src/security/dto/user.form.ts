import { IsNotEmpty, IsOptional } from "class-validator";

class UserForm {
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    password: string
}

class UpdateUserForm {
    @IsOptional()
    username: string;
    @IsOptional()
    oldPassword: string
    @IsOptional()
    password: string
}

export { UserForm, UpdateUserForm }