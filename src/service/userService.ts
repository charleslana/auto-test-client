import api from '@/config/api';
import type ILogin from '@/interface/ILogin';
import type IRegister from '@/interface/IRegister';

export default class UserService {
  static async register(register: IRegister) {
    const response = await api.post('/user', register);
    return response.data;
  }

  static async login(register: ILogin) {
    const response = await api.post('/user/auth', register);
    return response.data;
  }

  static async getDetails() {
    const response = await api.get('/user/details');
    return response.data;
  }

  static async updateName(name: string) {
    const response = await api.put('/user/change-name', {
      name
    });
    return response.data;
  }

  static async getTestCount() {
    const response = await api.get('/user/test/count');
    return response.data;
  }

  static async getUserExperience() {
    const response = await api.get('/user/test/experience');
    return response.data;
  }
}
