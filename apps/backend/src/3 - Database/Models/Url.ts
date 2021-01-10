import { Field, ID, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
@ObjectType()
export class Url {
  @PrimaryGeneratedColumn("uuid")
  @Field((returns) => ID)
  Id: number;

  @PrimaryColumn()
  @Field()
  Short: string;

  @Column()
  @Field()
  Long: string;

  constructor(Long: string, Short: string) {
    this.Long = Long;
    this.Short = Short;
  }
}
