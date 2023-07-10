import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository, EntityManager } from 'typeorm';
import { promisify } from 'util';
import * as crypto from 'crypto';
import { PasswdAuthEntity, PasswdEntity } from '@server/users/users.entity';

const pbkdf2 = promisify(crypto.pbkdf2);
const randomBytes = promisify(crypto.randomBytes);

const HASHLEN = 32;
const HASHDIGEST = 'sha256';
const SALTLEN = 16;
const HASH_ITERATIONS = 600000;

const passhash = (pass: string, salt: string) =>
  pbkdf2(pass, salt, HASH_ITERATIONS, HASHLEN, HASHDIGEST);

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(PasswdAuthEntity)
    private authRepo: Repository<PasswdAuthEntity>,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, passwd: string): Promise<any> {
    const passwdauth = await this.authRepo.findOne({
      where: { username },
    });
    if (!passwdauth) {
      throw new UnauthorizedException();
    }
    const derivedKey = (await passhash(passwd, passwdauth?.salt)).toString(
      'hex',
    );

    console.debug('AuthService', { derivedKey, passwdauth });

    if (passwdauth?.hash !== derivedKey) {
      throw new UnauthorizedException();
    }

    const payload = { sub: username, name: passwdauth.name };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async updatePasswd(
    manager: EntityManager,
    username: string,
    pass: string,
  ): Promise<any> {
    const salt: string = (await randomBytes(SALTLEN)).toString('hex');
    const hash: string = (await passhash(pass, salt)).toString('hex');

    const passwd = new PasswdEntity();
    passwd.id = username;
    passwd.hash = hash;
    passwd.salt = salt;

    console.debug('updatePasswd', { passwd });

    await manager.save(passwd);

    return;
  }
}
