import { ExecutionContext, CallHandler, HttpException, HttpStatus } from '@nestjs/common';
import { of, throwError } from 'rxjs';
import { LoggingInterceptor } from './logging.interceptor';

describe('LoggingInterceptor', () => {
  let interceptor: LoggingInterceptor;

  beforeEach(() => {
    interceptor = new LoggingInterceptor();
  });

  const createMockContext = (method = 'GET', url = '/api/v1/test', statusCode = 200) => {
    const request = { method, url };
    const response = { statusCode };

    return {
      switchToHttp: () => ({
        getRequest: () => request,
        getResponse: () => response,
      }),
    } as unknown as ExecutionContext;
  };

  it('deve registrar log em requisições de sucesso', (done) => {
    const context = createMockContext('GET', '/api/v1/usuarios', 200);
    const next: CallHandler = {
      handle: () => of({ success: true }),
    };

    interceptor.intercept(context, next).subscribe({
      next: (result) => {
        expect(result).toEqual({ success: true });
        done();
      },
    });
  });

  it('deve registrar log em requisições que lançam HttpException', (done) => {
    const context = createMockContext('POST', '/api/v1/auth/login', 401);
    const error = new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    const next: CallHandler = {
      handle: () => throwError(() => error),
    };

    interceptor.intercept(context, next).subscribe({
      error: (err) => {
        expect(err).toBe(error);
        done();
      },
    });
  });

  it('deve registrar log em requisições com erro generico', (done) => {
    const context = createMockContext('GET', '/api/v1/error', 500);
    const error = new Error('Database fail');
    const next: CallHandler = {
      handle: () => throwError(() => error),
    };

    interceptor.intercept(context, next).subscribe({
      error: (err) => {
        expect(err).toBe(error);
        done();
      },
    });
  });
});
