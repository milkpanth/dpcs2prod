export interface ObjectLiteralDto {
    [key: string]: any;
}
export declare class UpdateResultResponseDto {
    raw: any;
    affected?: number;
    generatedMaps: ObjectLiteralDto[];
}
