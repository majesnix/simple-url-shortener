import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

/* tslint:disable:member-access */

@Entity("users")
export class User {
	@PrimaryGeneratedColumn()
	id!: number;

	@PrimaryColumn()
	email!: string;

	@Column()
	username!: string;

	@Column()
	password!: string;

	@Column()
	active!: boolean;
}
