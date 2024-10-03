export interface ObjectLiteralDto {
    [key: string]: any;
}
export declare class InsertResultResponseDto {
    identifiers: ObjectLiteralDto[];
    generatedMaps: ObjectLiteralDto[];
    raw: any;
}
