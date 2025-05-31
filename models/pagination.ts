interface Sort {
  empty: boolean;
  sorted: boolean;
  unsorted: boolean;
}

interface Pageable {
  sort?: Sort;
  offset?: number;
  pageSize?: number;
  pageNumber?: number;
  paged?: boolean;
  unpaged?: boolean;
}

export interface PaginationResponse<T> {
  content: T[];
  last: boolean;
  totalElements: number;
}
