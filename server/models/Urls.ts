import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

/* tslint:disable:member-access */

@Entity("urls")
export class Url {
	@PrimaryGeneratedColumn()
	id!: number;

	@PrimaryColumn()
	shortUrl!: string;

	@Column()
	longUrl!: string;
}
