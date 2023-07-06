import api from '@/config/api';
import type IOpenai from '@/interface/IOpenai';

export class OpenaiService {
  static async send(openai: IOpenai) {
    const response = await api.post('/openai', openai);
    return response.data;
  }
}
