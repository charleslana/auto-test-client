import type RankFilterEnum from '@/enum/rankFilterEnum';

export default interface IUserPaginated {
  page?: number;
  filterType?: RankFilterEnum;
}
