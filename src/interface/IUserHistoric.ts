import type TestTypeEnum from '@/enum/testTypeEnum';

export default interface IUserHistoric {
  id: string;
  input: string;
  output: string;
  type: TestTypeEnum;
  createdAt: Date;
}
