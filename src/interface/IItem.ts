import type TestTypeEnum from '@/enum/TestTypeEnum';

export default interface IItem {
  id: string;
  name: string;
  description: string;
  expiryDay: number;
  type: TestTypeEnum;
}
