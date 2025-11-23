import { ApiResponse } from '@aps/shared-types';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class SuccessResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const statusCode = response.statusCode;

    return next.handle().pipe(
      map((data) => {
        const successResponse: ApiResponse<typeof data> = {
          success: true,
          statusCode,
          message: null,
          error: null,
          path: request.url,
          method: request.method,
          timestamp: new Date().toISOString(),
          data,
        };

        return successResponse;
      }),
    );
  }
}
