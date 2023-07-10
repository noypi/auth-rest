import { Injectable, ConflictException, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository, EntityManager } from 'typeorm';
import { UserInfoEntity } from '@server/users/users.entity';
import { UserCreateDto } from '@server/users/dto';
import { AuthService } from '@server/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    private dataSource: DataSource,
    @InjectRepository(UserInfoEntity)
    private userRepo: Repository<UserInfoEntity>,
    private authSvc: AuthService,
  ) {}

  async createUser(user: UserCreateDto): Promise<any> {
    await this.dataSource
      .transaction(async (manager: EntityManager) => {
        await this.validateUsername(manager, user.username);

        const newUser = new UserInfoEntity();
        newUser.familyname = user.familyname;
        newUser.name = user.name;
        newUser.id = user.username;

        console.debug('createUser', { newUser });

        await manager.save(newUser);
        await this.authSvc.updatePasswd(manager, user.username, user.password);
      })
      .catch((e) => {
        throw e;
      });
  }

  async validateUsername(
    manager: EntityManager,
    username: string,
  ): Promise<any> {
    const user = await this.userRepo.findOne({
      where: { id: username },
    });
    if (user) {
      throw new ConflictException('User already exist');
    }
  }
}
