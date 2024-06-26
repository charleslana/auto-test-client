import api from '@/config/api';
import type TestTypeEnum from '@/enum/TestTypeEnum';

export default class UserItemService {
  static async validateItem(type: TestTypeEnum) {
    const response = await api.get(`/user/item/validate/type?filterType=${type}`);
    return response.data;
  }

  static async getAll() {
    const response = await api.get('/user/item');
    return response.data;
  }
}
