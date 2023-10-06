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

  static async getCommentsPaginated(postId: string, page = 1) {
    const response = await api.get(`/comment?postId=${postId}&page=${page}`);
    return response.data;
  }

  static async sendComment(postId: number, message: string) {
    const response = await api.post('/comment', {
      postId: postId,
      message: message
    });
    return response.data;
  }

  static async getAllComments() {
    const response = await api.get('/comment/all/me');
    return response.data;
  }

  static async update(id: number, message: string) {
    const response = await api.put('/comment', {
      id: id,
      message: message
    });
    return response.data;
  }

  static async delete(id: string) {
    const response = await api.delete(`/comment/${id}`);
    return response.data;
  }
}
