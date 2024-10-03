export declare class PaginationRequest {
    page?: number;
    limit?: number;
}
export declare class PaginationMetaDto {
    totalItems: number;
    itemCount: number;
    itemsPerPage: number;
    totalPages: number;
    currentPage: number;
}
export declare class PaginationResponseDto<T> {
    items: T[];
    meta: PaginationMetaDto;
}
