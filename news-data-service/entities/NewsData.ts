import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class NewsData {
	@PrimaryGeneratedColumn()
	id!: number;

	@Column()
	headline!: string;

	@Column()
	content!: string;

	@Column()
	publicationDate!: Date;
}
