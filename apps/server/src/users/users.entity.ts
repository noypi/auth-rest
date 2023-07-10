import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('user_info')
export class UserInfoEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  familyname: string;
}

@Entity('passwdauth')
export class PasswdEntity {
  @PrimaryColumn()
  id: string;

  @Column()
  hash: string;

  @Column()
  salt: string;
}

@Entity('v_userauth')
export class PasswdAuthEntity {
  @PrimaryColumn()
  username: string;

  @Column()
  name: string;

  @Column()
  familyname: string;

  @Column()
  hash: string;

  @Column()
  salt: string;
}
