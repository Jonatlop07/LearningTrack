import UserPersistenceDTO from '@core/domain/user/use-case/persistence-dto/user.persistence_dto';
import { Optional } from '@core/common/type/common_types';

export default interface GetUserAccountDetailsOutputModel {
  found_user: Optional<UserPersistenceDTO>;
}
