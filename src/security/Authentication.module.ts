import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtModule } from '@nestjs/jwt';

import { TypeOrmModule } from "@nestjs/typeorm";
import { TaskEntity } from "src/task-usercase/models/task.entity";
import { AuthenticationController } from "./controller/authentication.controller";
import { UserControlller } from "./controller/user.controller";
import { UserEntity } from "./models/user.entity";
import { UserRepository } from "./repository/user.repository";
import { AuthenticationService } from "./service/authentication.service";
import { UserPasswordService } from "./service/user.password.service";
import { UserService } from "./service/user.service";

@Module({
    imports: [
        TypeOrmModule.forFeature(
            [
                UserEntity,
                TaskEntity
            ]
        ),
        JwtModule.registerAsync({
            useFactory: (configService: ConfigService) => {
                return {
                    secret: configService.get<string>('JWT_SECRET'),
                    signOptions: { expiresIn: '72h' },
                };
            },
            inject: [ConfigService],
            global: true,
        }),
    ],
    providers: [
        AuthenticationService,
        UserService,
        UserPasswordService,
        UserRepository
    ],
    controllers: [
        UserControlller,
        AuthenticationController
    ],
    exports:[
        UserRepository
    ]
})
export class AuthenticationModule { }