import api from '@/config/api';

export default class UserConquestService {
  static async getAll() {
    const response = await api.get('/user/conquest');
    return response.data;
  }

  static async getAllById(id: string) {
    const response = await api.get(`/user/conquest/by/${id}`);
    return response.data;
  }
}
