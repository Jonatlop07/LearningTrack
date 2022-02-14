import { Id, Optional } from '@core/common/type/common_types';

export type CreateUserEntityPayload = {
  id: Optional<Id>,
  email: string,
  password: string,
  username: string
};
