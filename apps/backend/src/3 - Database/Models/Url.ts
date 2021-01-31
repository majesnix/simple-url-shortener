import { Field, ObjectType } from "type-graphql";
import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
@ObjectType()
export class Url {
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
