import { Exclude, Expose } from 'class-transformer';
import { RoleType } from 'src/constants/role-type';

export class UserSerialization {
  @Expose({ name: 'uuid' })
  id: string;

  @Expose({ name: 'name' })
  name: string;

  @Expose({ name: 'email' })
  email: string;

  @Expose({ name: 'role' })
  role: RoleType;

  @Exclude()
  password: string;

  @Expose({ name: 'created_at' })
  createdAt: Date;

  @Expose({ name: 'updated_at' })
  updatedAt: Date;
}
