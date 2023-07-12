import type TestTypeEnum from '@/enum/TestTypeEnum';

export default interface IConquest {
  id: string;
  name: string;
  description: string;
  experience: number;
  type: TestTypeEnum;
}
