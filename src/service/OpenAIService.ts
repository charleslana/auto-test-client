import api from '@/config/api';
import type IOpenAI from '@/interface/IOpenAI';

export default class OpenAIService {
  static async send(openAI: IOpenAI) {
    const response = await api.post('/openai', openAI);
    return response.data;
  }
}
