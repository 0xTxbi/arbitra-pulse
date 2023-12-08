import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	JoinColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Watchlist {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	symbol: string;

	@ManyToOne(() => User, (user) => user.watchlist)
	@JoinColumn({ name: "user_id" })
	user: User;
}
