import { CallHandler, ConsoleLogger, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Request, Response } from 'express';
import { Observable, tap } from "rxjs";
import { AuthenticationRequest } from "../security/dto/authentication.dto";

@Injectable()
export class LoggerGlobalInterceptor implements NestInterceptor {
    constructor(private logger: ConsoleLogger) { }
    intercept(contexto: ExecutionContext, next: CallHandler): Observable<any> {
        const contextoHttp = contexto.switchToHttp();

        const request = contextoHttp.getRequest<Request | AuthenticationRequest>();
        const response = contextoHttp.getResponse<Response>();

        const { url, method } = request;
        const { statusCode } = response;
        this.logger.log(`${method} ${url}`);

        const startedTime = Date.now();
          return next.handle().pipe(
            tap(() => {
              if ('user' in request) {
                this.logger.log(
                  `User request: ${request['user'].sub}`,
                );
              }
              const time = Date.now() - startedTime;
              this.logger.log(
                `Response: status ${statusCode} - ${time}ms`,
              );
            }),
          );
    }
}