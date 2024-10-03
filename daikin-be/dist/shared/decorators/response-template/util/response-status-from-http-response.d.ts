import { HttpStatus } from "@nestjs/common";
import { ResponseStatusDto } from "../dto";
export declare function getResponseStatusFromHttpResponse(httpResponseCode: HttpStatus): ResponseStatusDto;
