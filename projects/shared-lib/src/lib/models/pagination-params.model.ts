import { Base } from './base.model';

export interface PaginationParams {
    page: number;
    pageSize: number;
    items: []
}

export class PaginationParams implements PaginationParams {
  public constructor(init?: Partial<PaginationParams>) {
    Object.assign(this, init);
  }
}
