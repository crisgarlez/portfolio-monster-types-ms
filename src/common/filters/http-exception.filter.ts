import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpExceptionFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    let message = exception.getResponse()['message'];
    let error = exception.getResponse()['error'];

    if (Array.isArray(message)) {
      message = message.join(', ');
    }

    this.logger.debug('HttpExceptionFilter...');
    this.logger.debug('Error:', error);
    this.logger.debug('Message:', message);

    response.status(status).json({
      message: message,
      error: error,
      statusCode: status,
    });
  }
}
