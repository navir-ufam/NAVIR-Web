import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  HttpException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Request, Response } from 'express';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger('HTTP');

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest<Request>();
    const { method, url } = req;
    const now = Date.now();

    return next.handle().pipe(
      tap({
        next: () => {
          const res = context.switchToHttp().getResponse<Response>();
          const delay = Date.now() - now;
          this.logger.log(`${method} ${url} ${res.statusCode} - ${delay}ms`);
        },
        error: (error: unknown) => {
          const delay = Date.now() - now;
          const status =
            error instanceof HttpException ? error.getStatus() : 500;
          const stack =
            error instanceof Error ? error.stack : 'No stack available';

          this.logger.error(`${method} ${url} ${status} - ${delay}ms`, stack);
        },
      }),
    );
  }
}
