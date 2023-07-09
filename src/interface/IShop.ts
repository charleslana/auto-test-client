import type IItem from './IItem';

export default interface IShop {
  id: string;
  score: number;
  itemId: string;
  item: IItem;
}
