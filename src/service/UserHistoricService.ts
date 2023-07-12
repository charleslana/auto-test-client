import api from '@/config/api';
import type IHistoric from '@/interface/IHistoric';

export default class UserHistoricService {
  static async getPaginated(historic: IHistoric) {
    let url = '/user/historic';
    if (historic.page != undefined) {
      url = `${url}?page=${historic.page}`;
      if (historic.filterType != undefined) {
        url = `${url}&filterType=${historic.filterType}`;
      }
    } else {
      if (historic.filterType != undefined) {
        url = `${url}?filterType=${historic.filterType}`;
      }
    }
    const response = await api.get(url);
    return response.data;
  }

  static async exportXLSX() {
    const response = await api.get('/user/historic/export/xlsx', {
      responseType: 'blob',
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      }
    });
    return response.data;
  }

  static async delete(id: number) {
    const response = await api.delete(`/user/historic/${id}`);
    return response.data;
  }

  static async get(id: number) {
    const response = await api.get(`/user/historic/${id}`);
    return response.data;
  }
}
