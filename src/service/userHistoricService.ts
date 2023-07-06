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
}
