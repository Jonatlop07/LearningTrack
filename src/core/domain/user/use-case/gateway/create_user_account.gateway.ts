import Create from '@core/common/persistence/create';
import CreateUserPersistenceDTO from '@core/domain/user/use-case/persistence-dto/create_user.persistence_dto';
import UserPersistenceDTO from '@core/domain/user/use-case/persistence-dto/user.persistence_dto';
import Exists from '@core/common/persistence/exists';
import UserFindPersistenceDTO from '@core/domain/user/use-case/find-persistence-dto/user.find_persistence_dto';

export default interface CreateUserAccountGateway
  extends Create<CreateUserPersistenceDTO, UserPersistenceDTO>, Exists<UserFindPersistenceDTO> {}
