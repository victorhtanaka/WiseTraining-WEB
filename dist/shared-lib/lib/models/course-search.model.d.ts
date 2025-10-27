export interface CourseSearchParams {
    searchTerm?: string;
    categoryId?: number;
    language?: string;
    tagIds?: number[];
    minPrice?: number;
    maxPrice?: number;
    onlyPublished: boolean;
    page: number;
    pageSize: number;
}
export interface CourseSearchResult {
    courses: any[];
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
}
