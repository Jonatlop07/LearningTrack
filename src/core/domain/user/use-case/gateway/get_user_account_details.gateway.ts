import UserFindPersistenceDTO from '@core/domain/user/use-case/find-persistence-dto/user.find_persistence_dto';
import UserPersistenceDTO from '@core/domain/user/use-case/persistence-dto/user.persistence_dto';
import FindOne from '@core/common/persistence/find_one';

export default interface GetUserAccountDetailsGateway
  extends FindOne<UserFindPersistenceDTO, UserPersistenceDTO> {}
