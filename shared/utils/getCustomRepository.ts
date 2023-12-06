import { EntityTarget, Repository } from "typeorm";
import AppDataSource from "../../data-source";

// obtain a repository based on the entity type
export function getCustomRepository<T>(entity: EntityTarget<T>): Repository<T> {
	return AppDataSource.getRepository(entity);
}
