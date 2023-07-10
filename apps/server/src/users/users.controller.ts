import {
  Body,
  Controller,
  Post,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserCreateDto } from '@server/users/dto';

@Controller('user')
export class UserController {
  constructor(private userSvc: UsersService) {}

  @HttpCode(HttpStatus.OK)
  @Post('create')
  async create(@Body() user: UserCreateDto): Promise<void> {
    console.debug('user/create', { user });
    if (!user.username || user.username.length == 0) {
      console.debug('user/create empty user');
      return;
    }

    const result: any = await this.userSvc.createUser(user);
    console.debug('create', { result });
    this.handleResult(result);

    return result;
  }

  handleResult(result: any) {
    if (result && result instanceof HttpException) {
      throw result;
    }
  }
}
