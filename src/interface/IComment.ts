import type IUser from './IUser';

export default interface IComment {
  id: string;
  message: string;
  postId: string;
  createdAt: Date;
  updatedAt: Date;
  user: IUser;
}
