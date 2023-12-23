export interface IBorrowing {
  id: number;
  uuid: string;
  check_out_date: Date;
  due_date: Date;
  return_date: Date | null;
  created_at: Date;
  updated_at: Date;
}
