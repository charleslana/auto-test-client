import type TestTypeEnum from '@/enum/testTypeEnum';

export default interface IConquest {
  id: number;
  name: string;
  description: string;
  experience: string;
  type: TestTypeEnum;
}
