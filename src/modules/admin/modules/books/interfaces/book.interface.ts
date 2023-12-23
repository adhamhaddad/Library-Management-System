export interface IBook {
  id: number;
  uuid: string;
  author: string;
  title: string;
  isbn: string;
  quantity: number;
  available_quantity: number;
  shelf_location: string;
  created_at: Date;
  updated_at: Date;
}
