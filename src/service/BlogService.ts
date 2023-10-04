import api from '@/config/api';
import type IPage from '@/interface/IPage';

export default class BlogService {
  static async getPaginated(page: IPage) {
    const url = `/post?page=${page.page}`;
    const response = await api.get(url);
    return response.data;
  }
}
