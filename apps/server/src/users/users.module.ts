import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './users.controller';
import { UsersService } from './users.service';
import { UserInfoEntity } from './users.entity';
import { AuthModule } from '@server/auth/auth.module';

@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([UserInfoEntity])],
  controllers: [UserController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
