import { Entity, PrimaryGeneratedColumn, Column, BeforeInsert } from "typeorm";
import * as bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";

@Entity()
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ unique: true })
	username: string;

	@Column({ unique: true })
	email: string;

	@Column()
	salt: string;

	@Column()
	hashedPassword: string;

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

		if (
			usernameOrEmail !== this.username &&
			usernameOrEmail !== this.email
		) {
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
		const token = sign(payload, secret, { expiresIn: "1h" });

		return token;
	}
}
