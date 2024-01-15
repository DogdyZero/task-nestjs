import { IsNotEmpty } from "class-validator";

interface AuthenticationRequest extends Request {
    user: UserPayload;
}

interface UserPayload {
    sub: string;
    username: string;
    roles: string[];
}

class AuthDto {
    @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    password: string;
}

export { UserPayload, AuthenticationRequest, AuthDto }