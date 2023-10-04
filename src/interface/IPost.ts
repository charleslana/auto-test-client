import type IUser from './IUser';

export default interface IPost {
  id: string;
  title: string;
  description: string;
  enable: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
}
