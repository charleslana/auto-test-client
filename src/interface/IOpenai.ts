import type TestTypeEnum from '@/enum/testTypeEnum';

export default interface IOpenai {
  input: string;
  context?: string;
  type: TestTypeEnum;
  output?: string;
}
