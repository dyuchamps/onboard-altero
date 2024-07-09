import { ExecutionContext } from '@nestjs/common';
import { ErrorHandler } from '../error-handler';

export class AuthErrorHandler implements ErrorHandler {
  handle(context: ExecutionContext, error: Error) {}
}
