import api from '@/config/api';
import type IPage from '@/interface/IPage';

export default class BlogService {
  static async getPaginated(page: IPage) {
    const url = `/post?page=${page.page}`;
    const response = await api.get(url);
    return response.data;
  }

  static async searchByTitle(text: string) {
    const url = `/post/search/by?title=${text}`;
    const response = await api.get(url);
    return response.data;
  }

  static async get(id: string) {
    const response = await api.get(`/post/${id}`);
    return response.data;
  }
}
