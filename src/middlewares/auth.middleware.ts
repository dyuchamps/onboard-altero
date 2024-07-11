import {
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { NextFunction } from 'express';
import { RepAuth } from 'src/services/repositories/rep.auth';

function splitAtFirstDot(str) {
  const indexOfDot = str.indexOf('.');
  if (indexOfDot === -1) {
    throw new HttpException(
      {
        status: HttpStatus.FORBIDDEN,
        message: 'Invalid token',
      },
      HttpStatus.FORBIDDEN,
    );
  }
  const firtsPart = str.substring(0, indexOfDot);
  const secondPart = str.substring(indexOfDot + 1);
  return [firtsPart, secondPart];
}

@Injectable()
export class AuthenticationMiddleware implements NestMiddleware {
  constructor(private repAuth: RepAuth) {}

  async use(@Req() req, next: NextFunction) {
    try {
      const token = req.headers.Authorization?.split(' ')[1];

      if (!token) {
        throw new HttpException(
          {
            status: HttpStatus.FORBIDDEN,
            message: 'Invalid token',
          },
          HttpStatus.FORBIDDEN,
        );
      }

      // const decoded = verify(token, config.JWT_SECRET_KEY) as JWTPayload;

      // let userId: string;

      // switch (true) {
      //   case decoded.aud.includes('user-auth'):
      //     userId = decoded.sub.split('-')[1];

      //     req.user = await this.repAuth.findCashier(userId);

      //     if (!req.user) {
      //       throw new UnauthorizedException('token owner not found');
      //     }

      //     break;
      //   case decoded.aud.includes('cashier-auth'):
      //     userId = decoded.sub.split('-')[1];

      //     req.user = await this.repAuth.findCashier(userId);

      //     if (!req.user) {
      //       throw new UnauthorizedException('token owner not found');
      //     }

      //     break;
      //   default:
      //     throw new Error();
      // }
      // req.jwtPayload = decoded;
      const [_token] = splitAtFirstDot(token);

      const user = await this.repAuth.getUserByToken(_token);

      req.user = user;
      next();
    } catch (error) {
      if (error instanceof Error && error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token expired');
      } else if (error instanceof UnauthorizedException) {
        throw error;
      } else {
        throw new UnauthorizedException('Invalid token');
      }
    }
  }
}
