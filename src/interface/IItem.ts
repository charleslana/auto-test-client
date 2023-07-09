import type TestTypeEnum from '@/enum/testTypeEnum';

export default interface IItem {
  id: string;
  name: string;
  description: string;
  expiryDay: number;
  type: TestTypeEnum;
}
