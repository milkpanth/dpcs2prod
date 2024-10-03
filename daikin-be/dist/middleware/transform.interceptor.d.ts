import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
export interface Response<T> {
    status: boolean;
    data: T;
    message: string;
}
export declare class TransformationInterceptor<T> implements NestInterceptor<T, Response<T>> {
    intercept(_context: ExecutionContext, next: CallHandler): Observable<Response<T>>;
}
