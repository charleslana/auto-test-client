import api from '@/config/api';

export default class ShopService {
  static async getAll() {
    const response = await api.get('/shop');
    return response.data;
  }

  static async buy(id: number) {
    const response = await api.post(`/shop/buy/${id}`);
    return response.data;
  }
}
