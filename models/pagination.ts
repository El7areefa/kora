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
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort?: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}
