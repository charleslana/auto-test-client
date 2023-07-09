import type IItem from './IItem';

export default interface IUserItem {
  id: string;
  expirationDate: Date | null;
  userId: string;
  itemId: string;
  item: IItem;
  createdAt: Date;
}
