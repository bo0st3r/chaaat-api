import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    const expectedToken = process.env['AUTH_TOKEN'];
    return token === expectedToken;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const token = request.headers.authorization ?? '';
    return token;
  }
}
