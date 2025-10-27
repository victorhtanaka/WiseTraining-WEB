export interface PaginationParams {
    page: number;
    pageSize: number;
    items: [];
}
export declare class PaginationParams implements PaginationParams {
    constructor(init?: Partial<PaginationParams>);
}
