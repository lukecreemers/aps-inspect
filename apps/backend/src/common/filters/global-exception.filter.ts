import { ApiResponse } from '@aps/shared-types';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let error = 'Internal Server Error';
    let message = 'An unexpected error occurred';
    let details: any = null;

    // 1. Handle Nest HttpExceptions
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const responseData = exception.getResponse();

      if (typeof responseData === 'string') {
        message = responseData;
      } else if (typeof responseData === 'object') {
        const r = responseData as any;
        message = r.message || message;
        error = r.error || error;
        details = r.details || r.issues || null;
      }
    }

    // 2. Handle Prisma Errors
    else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      // P2002: Unique constraint failed
      if (exception.code === 'P2002') {
        statusCode = HttpStatus.CONFLICT;
        error = 'Conflict';
        const target = (exception.meta?.target as string[])?.join(', ');
        message = `Unique constraint failed on: ${target || 'unknown field'}`;
      }
      // P2025: Record not found
      else if (exception.code === 'P2025') {
        statusCode = HttpStatus.NOT_FOUND;
        error = 'Not Found';
        message = 'Record not found';
      }
      // P2003: Foreign key constraint failed
      else if (exception.code === 'P2003') {
        statusCode = HttpStatus.BAD_REQUEST;
        error = 'Bad Request';
        message = 'Foreign key constraint failed';
      } else {
        this.logger.error(
          `Prisma Error ${exception.code}: ${exception.message}`,
        );
      }
    }

    // 3. Handle Generic Errors
    else if (exception instanceof Error) {
      this.logger.error(exception.message, exception.stack);
    }

    const errorResponse: ApiResponse<null> = {
      success: false,
      statusCode,
      error,
      data: null,
      message,
      path: request.url,
      method: request.method,
      timestamp: new Date().toISOString(),
      details,
    };

    response.status(statusCode).json(errorResponse);
  }
}
