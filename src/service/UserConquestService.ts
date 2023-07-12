import api from '@/config/api';

export default class UserConquestService {
  static async getAll() {
    const response = await api.get('/user/conquest');
    return response.data;
  }
}
