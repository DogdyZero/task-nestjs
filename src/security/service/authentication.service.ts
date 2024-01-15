import { Injectable, NotFoundException } from "@nestjs/common";
import { UserRepository } from "../repository/user.repository";
import { UserPasswordService } from "./user.password.service";
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from "../dto/authentication.dto";

@Injectable()
export class AuthenticationService {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly service: UserPasswordService,
        private jwtService: JwtService
    ) { }

    async login(username: string, password: string) {
        const entity = await this.userRepository.findOne({ username })
        if (!entity) throw new NotFoundException('Username or Password not found');
        const located = this.service.checkPassword(password, entity.password)
        if (!located) throw new NotFoundException('Username or Password not found');

        const payload: UserPayload = {
            sub: entity.id,
            roles: ['admin'],
            username: entity.username
        };
        return {
            access_token: await this.jwtService.signAsync(payload),
        };
    }
}