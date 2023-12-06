import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Stock {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	symbol!: string;

	@Column()
	companyName!: string;
}
