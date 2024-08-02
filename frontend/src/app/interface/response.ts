interface Pagination {
  limit: number;
  page: number;
  total: number;
}

export interface ISuccessListResponse<T> {
  data: T[];
  pagination: Pagination;
}