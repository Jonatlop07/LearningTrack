import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { TypeOrmUser } from '@infrastructure/adapter/persistence/typeorm/entity/user/typeorm_user';
import { EntityRepository } from 'typeorm';

@EntityRepository(TypeOrmUser)
export class TypeOrmUserRepository extends  BaseRepository<TypeOrmUser> {}
