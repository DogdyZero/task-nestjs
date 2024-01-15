import { Body, Controller, Post } from "@nestjs/common";
import { AuthenticationService } from "../service/authentication.service";
import { AuthDto } from "../dto/authentication.dto";

@Controller('auth')
export class AuthenticationController {
    constructor(private readonly service: AuthenticationService) { }

    @Post()
    login(@Body() { username, password }: AuthDto) {
        return this.service.login(username, password);
    }
}