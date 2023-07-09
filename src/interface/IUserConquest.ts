import type IConquest from './IConquest';

export default interface IUserConquest {
  id: string;
  createdAt: Date;
  conquest: IConquest;
}
