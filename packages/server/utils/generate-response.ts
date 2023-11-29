import {Status} from "../typing/status";

export const generateResponse = (status: Status, data: object | string) => JSON.stringify({
    status,
    data
})