import { RoleType } from 'src/constants/role-type';

export interface IUser {
  id: number;
  uuid: string;
  name: string;
  email: string;
  password: string;
  role: RoleType;
  salt: string;
  created_at: Date | null;
  updated_at: Date | null;
}
