import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class SentimentResult {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	stockSymbol: string;

	@Column()
	sentiment: string;

	@Column()
	confidence: number;

	@Column({ nullable: true })
	currentStockPrice: number;

	@Column({ nullable: true })
	priceChange: number;

	@Column({ nullable: true })
	percentageChange: number;
}
