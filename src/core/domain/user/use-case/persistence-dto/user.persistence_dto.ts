import { Id } from '@core/common/type/common_types';

export default interface UserPersistenceDTO {
  id: Id;
  email: string;
  password: string;
  username: string;
  created_at: string;
}
