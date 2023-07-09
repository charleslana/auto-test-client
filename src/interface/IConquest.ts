import type TestTypeEnum from '@/enum/testTypeEnum';

export default interface IConquest {
  id: string;
  name: string;
  description: string;
  experience: number;
  type: TestTypeEnum;
}
