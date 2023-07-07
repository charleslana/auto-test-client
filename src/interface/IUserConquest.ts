import type IConquest from './IConquest';

export default interface IUserConquest {
  id: number;
  createdAt: Date;
  conquest: IConquest;
}
