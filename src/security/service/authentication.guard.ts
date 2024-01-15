import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Observable } from "rxjs";
import { JwtService } from '@nestjs/jwt';
import { AuthenticationRequest, UserPayload } from "../dto/authentication.dto";
import { Reflector } from "@nestjs/core";
import { Roles } from "../dto/roles.decorator";

@Injectable()
export class AuthenticationGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector) { }

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest<AuthenticationRequest>();
        const token = this.extractToken(request);
        if (!token) {
            throw new UnauthorizedException('Authentication Error');
        }

        try {
            const payload: UserPayload = this.jwtService.verify(token);
            const roles = this.reflector.get(Roles, context.getHandler());
            const located = payload.roles?.filter(item => {
                return roles?.find(role => role.toLowerCase() === item.toLowerCase())
            })
            if (roles && located.length == 0)
                throw new UnauthorizedException('Not Allowed');

            request.user = payload;
        } catch (error) {
            throw new UnauthorizedException('Invalid Token');
        }
        return true;
    }

    private extractToken(request: Request): string | undefined {
        const [tipo, token] = request.headers['authorization']?.split(' ') ?? [];
        return tipo === 'Bearer' ? token : undefined;
    }
}