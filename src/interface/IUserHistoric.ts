import type TestTypeEnum from '@/enum/TestTypeEnum';

export default interface IUserHistoric {
  id: string;
  input: string;
  output: string;
  type: TestTypeEnum;
  createdAt: Date;
}
