import type RankFilterEnum from '@/enum/RankFilterEnum';

export default interface IUserPaginated {
  page?: number;
  filterType?: RankFilterEnum;
}
