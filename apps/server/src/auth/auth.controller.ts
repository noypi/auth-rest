import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  Request,
  Get,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { UserLoginDto } from '@server/users/dto/user-login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInDto: UserLoginDto) {
    console.debug('auth/login', { signInDto });
    const result = await this.authService
      .signIn(signInDto.username, signInDto.password)
      .catch((e) => {
        throw e;
      });

    return result;
  }

  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  @Get('islogin')
  async isLogin(@Request() req: any) {
    return req.user;
  }
}
