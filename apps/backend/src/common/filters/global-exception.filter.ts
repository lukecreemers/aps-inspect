import { ApiResponse } from '@aps/shared-types';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    // Default values
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    let error = 'Internal Server Error';
    let message = 'An unexpected error occurred';
    let details: any = null;

    // Handle Nest HttpExceptions (BadRequestException, ForbiddenException, etc.)
    if (exception instanceof HttpException) {
      statusCode = exception.getStatus();
      const responseData = exception.getResponse();

      // responseData can be a string OR an object
      if (typeof responseData === 'string') {
        message = responseData;
      } else if (typeof responseData === 'object') {
        const r = responseData as any;
        message = r.message || message;
        error = r.error || error;
        details = r.details || null;
      }
    }

    // Handle generic errors safely
    else if (exception instanceof Error) {
      message = exception.message;
      // Optional: log stack for debugging
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

    // Build clean JSON response
    response.status(statusCode).json(errorResponse);
  }
}
