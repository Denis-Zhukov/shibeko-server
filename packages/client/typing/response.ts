import {Status} from "./status";

export interface Response<T> {
    data: T
    status: Status
}