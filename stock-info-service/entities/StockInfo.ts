import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class StockInfo {
	@PrimaryColumn()
	symbol: string;

	@Column()
	companyName: string;

	@Column()
	currentPrice: number;

	@Column()
	industry: string;

	@Column()
	marketCap: string;

	@Column({ nullable: true })
	changePercent: number;

	@Column({ nullable: true })
	volume: number;

	@Column({ nullable: true })
	peRatio: number;
}
