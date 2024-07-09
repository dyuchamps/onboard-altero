import { Controller, Post, UseInterceptors } from '@nestjs/common';
import { ErrorInterceptor } from 'src/middlewares/errors.interceptors';
import { UCAuth } from 'src/usecases/auth/auth.uc.main';

@Controller('admin/auth')
@UseInterceptors(ErrorInterceptor)
export class AuthController {
  constructor(private ucAuth: UCAuth) {}

  @Post('login')
  async loginAdmin() {}
}
