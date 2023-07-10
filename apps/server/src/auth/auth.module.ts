import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PasswdEntity, PasswdAuthEntity } from '@server/users/users.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PasswdEntity, PasswdAuthEntity])],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
