import { Field, ID } from 'type-graphql';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('urls')
export class Url {
  @PrimaryGeneratedColumn('uuid')
  @Field((returns) => ID)
  id: number;

  @PrimaryColumn()
  @Field()
  short: string;

  @Column()
  @Field()
  long: string;

  constructor(long: string, short: string) {
    this.long = long;
    this.short = short;
  }
}
