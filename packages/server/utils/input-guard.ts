import {Input} from "../typing/input";

export const isInput = (input: unknown): input is Input => {
    return input !== null && typeof (input) === 'object' && 'handler' in input && typeof (input.handler) === 'string';
}