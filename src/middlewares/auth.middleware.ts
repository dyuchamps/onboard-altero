// import { HttpException, HttpStatus, NestMiddleware, Req } from '@nestjs/common';
// import { NextFunction } from 'express';
// import { RepAuth } from 'src/services/repositories/rep.auth';

// function splitAtFirstDot(str) {
//   const indexOfDot = str.indexOf('.');
//   if (indexOfDot === -1) {
//     throw new HttpException(
//       {
//         status: HttpStatus.FORBIDDEN,
//         message: 'Invalid token',
//       },
//       HttpStatus.FORBIDDEN,
//     );
//   }
//   const firtsPart = str.substring(0, indexOfDot);
//   const secondPart = str.substring(indexOfDot + 1);
//   return [firtsPart, secondPart];
// }

// export class AuthenticationMiddleware implements NestMiddleware {
//   constructor(private repAuth: RepAuth) {}

//   async use(@Req() req, next: NextFunction) {
//     try {
//       const token = req.headers.authorization?.split(' ')[1];

//       if (!token) {
//         throw new HttpException(
//           {
//             status: HttpStatus.FORBIDDEN,
//             message: 'Invalid token',
//           },
//           HttpStatus.FORBIDDEN,
//         );
//       }

//       // const [_type, _token] = splitAtFirstDot(token);

//       // const user = await this.repAuth.getUserByToken(_type, _token);

//       // req.user = user;
//       next();
//     } catch (error) {
//       throw error;
//     }
//   }
// }
