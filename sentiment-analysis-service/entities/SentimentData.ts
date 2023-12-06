import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class SentimentData {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	stockSymbol!: string;

	@Column()
	sentimentScore!: number;
}
