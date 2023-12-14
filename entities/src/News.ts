import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class News {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	link: string;

	@Column("simple-array")
	publisher: string[];

	@Column()
	description: string;

	@Column()
	imageUrl: string;

	@Column()
	content: string;

	@Column()
	timestamp: Date;
}
