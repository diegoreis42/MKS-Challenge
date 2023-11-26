import { MovieEnum } from '../enums';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity()
@Unique(['name'])
export class Movie {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('varchar', { length: MovieEnum.MAX_NAME_LENGTH })
  name: string;

  @Column('varchar', { length: MovieEnum.MAX_DIRECTOR_NAME_LENGTH })
  director: string;

  @Column('varchar', { length: MovieEnum.MAX_CATEGORY_NAME_LENGTH })
  category: string[];

  @Column('varchar', { length: MovieEnum.MAX_ACTORS_NAME_LENGTH })
  actors: string[];

  @Column('varchar', {
    length: MovieEnum.MAX_DESCRIPTION_LENGTH,
    nullable: true,
  })
  description: string;

  @Column()
  year: number;
}
