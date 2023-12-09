import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	BeforeInsert,
	OneToMany,
} from "typeorm";
import * as bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { Watchlist } from "./Watchlist";

@Entity()
export class User {
	@PrimaryGeneratedColumn({ name: "user_id" })
	id: number;

	@Column({ unique: true })
	username: string;

	@Column({ unique: true })
	email: string;

	@Column()
	salt: string;

	@Column()
	hashedPassword: string;

	@OneToMany(() => Watchlist, (watchlist) => watchlist.user, {
		eager: true,
	})
	watchlist: Watchlist[];

	@BeforeInsert()
	async hashCredentials() {
		this.salt = await bcrypt.genSalt(16);
		this.hashedPassword = await bcrypt.hash(
			this.hashedPassword,
			this.salt
		);
	}

	async compareCredentials(
		usernameOrEmail: string,
		password: string
	): Promise<boolean> {
		if (!usernameOrEmail || !password) {
			return false;
		}

		const validUsername = this.username === usernameOrEmail;
		const validEmail = this.email === usernameOrEmail;

		if (!validUsername && !validEmail) {
			return false;
		}

		const validPassword = await bcrypt.compare(
			password,
			this.hashedPassword
		);
		return validPassword;
	}

	generateJWT() {
		const payload = { userId: this.id, username: this.username };
		const secret = process.env.JWT_SECRET || "your-secret-key";
		const token = sign(payload, secret, { expiresIn: "7h" });

		return token;
	}
}
