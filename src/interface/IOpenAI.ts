import type TestTypeEnum from '@/enum/TestTypeEnum';

export default interface IOpenAI {
  input: string;
  context?: string;
  type: TestTypeEnum;
  output?: string;
}
