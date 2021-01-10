import { Field, ID } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field((returns) => ID)
  id: string;

  @Column()
  @Field()
  email: string;

  @Column()
  @Field()
  username: string;

  @Column()
  @Field()
  password: string;

  @Column({ default: true })
  @Field()
  active: boolean;
}
