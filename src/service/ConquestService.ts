import api from '@/config/api';

export default class ConquestService {
  static async getAll() {
    const response = await api.get('/conquest');
    return response.data;
  }
}
