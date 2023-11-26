import { UserEnum } from '../enums';
import { Column, Entity, Index, PrimaryColumn, Unique } from 'typeorm';

@Entity()
@Unique(['email'])
export class User {
  @Index({ unique: true })
  @PrimaryColumn('varchar', { length: UserEnum.MAX_EMAIL_LENGTH })
  email: string;

  @Column('varchar', { length: UserEnum.MAX_NAME_LENGTH })
  name: string;

  @Column('varchar')
  password: string;
}
