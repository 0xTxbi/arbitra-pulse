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
	marketCap: number;

	@Column()
	market: string;

	@Column()
	locale: string;

	@Column()
	primaryExchange: string;

	@Column()
	type: string;

	@Column()
	active: boolean;

	@Column()
	currencyName: string;

	@Column()
	cik: string;

	@Column()
	compositeFigi: string;

	@Column()
	shareClassFigi: string;

	@Column()
	phoneNumber: string;

	@Column()
	address: string;

	@Column()
	description: string;

	@Column()
	sicCode: string;

	@Column()
	sicDescription: string;

	@Column()
	tickerRoot: string;

	@Column()
	homepageUrl: string;

	@Column()
	totalEmployees: number;

	@Column()
	listDate: string;

	@Column()
	logoUrl: string;

	@Column()
	iconUrl: string;

	@Column()
	shareClassSharesOutstanding: number;

	@Column()
	weightedSharesOutstanding: number;

	@Column()
	roundLot: number;
}
